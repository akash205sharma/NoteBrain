import { TreeNode } from "@/types";
import { saveMarkdown } from "./indexdb";
function extractFileName(url: string): string {
  return url.split("/").filter(Boolean).pop() || "";           //  replacing "/yourLibrary/"
}
export async function uploadToGitHub({
  token,
  owner,
  repo,
  path,
  content,
  message,
}: {
  token: string;
  owner: string;
  repo: string;
  path: string;
  content: string;
  message: string;
}) {
  const fileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  // Step 1: Try to get the file SHA if it exists
  let sha: string | undefined = undefined;
  const getRes = await fetch(fileUrl, {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  

  if (getRes.ok) {
    const fileData = await getRes.json();  
    console.log("File data from GitHub:", fileData);
 
    sha = fileData.sha;
  }

  // Step 2: Create or Update the file
  const putRes = await fetch(fileUrl, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      content: btoa(unescape(encodeURIComponent(content))), // base64 encode
      ...(sha && { sha }), // only include `sha` if updating
    }),
  });
  const result = await putRes.json();

  if (!putRes.ok) {
    console.error("GitHub Upload Error: ", result);
    throw new Error("Failed to upload");
  }

  return result;
}



export async function deleteFileFromGitHub({
  owner,
  repo,
  path, // e.g., "yourLibrary/description.md"
  token,
  message = "Delete markdown file"
}: {
  owner: string;
  repo: string;
  path: string;
  token: string;
  message?: string;
}) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  // 1. Get the file SHA
  const getRes = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!getRes.ok) {
    const err = await getRes.json();
    throw new Error(`Failed to get file info for ${path}: ${err.message}`);
  }

  const fileInfo = await getRes.json();
  const sha = fileInfo.sha;

  // 2. Delete the file using its SHA
  const deleteRes = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message,
      sha
    })
  });

  if (!deleteRes.ok) {
    const err = await deleteRes.json();
    throw new Error(`Failed to delete ${path}: ${err.message}`);
  }

  return await deleteRes.json();
}


export async function getMarkdownFromGitHub({
  owner,
  repo,
  path,       // example: "yourLibrary/description.md"
  token,
}: {
  owner: string;
  repo: string;
  path: string;
  token: string;
}): Promise<string> {
  path=extractFileName(path);
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}.md`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3.raw", // this returns raw file content directly
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Failed to fetch ${path}: ${err.message || res.statusText}`);
  }

  const content = await res.text();
  return content;
}

export async function getFileTreeFromGitHubJSON({
  owner,
  repo,
  token,
}: {
  owner: string;
  repo: string;
  token: string;
}): Promise<TreeNode> {
  const metadataUrl = `https://api.github.com/repos/${owner}/${repo}/contents/filetree.json`;

  const metaRes = await fetch(metadataUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!metaRes.ok) {
    throw new Error("Could not fetch metadata for filetree.json");
  }

  const metadata = await metaRes.json();
  const rawUrl = metadata.download_url;

  const contentRes = await fetch(rawUrl);
  if (!contentRes.ok) {
    throw new Error("Failed to download raw filetree.json content");
  }

  const json = await contentRes.json();
  return json as TreeNode;
}


export async function fetchAndSaveFileContent(path: string, owner: string, repo: string, token: string) {
  const fileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const headers = {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3.raw',
  };

  const response = await fetch(fileUrl, { headers });
  if (!response.ok) {
    console.error(`Failed to fetch file ${path}:`, response.statusText);
    return;
  }

  const content = await response.text();
  await saveMarkdown(content, path.replace(/\.md$/, '')); // path is used as key
}


 export async function fetchAndSaveRootFiles(owner: string, repo: string, token: string) {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents`;
  const headers = {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3+json',
  };

  const response = await fetch(apiUrl, { headers });
  if (!response.ok) {
    console.error("Failed to list repo contents:", response.statusText);
    return;
  }

  const files = await response.json();

  for (const file of files) {
    if (file.type === 'file' && file.name.endsWith('.md')) {
      await fetchAndSaveFileContent(file.path, owner, repo, token);
    }
  }
}



export async function createRepoIfNotExists({
  token,
  owner,
  repo,
  isOrg = false,
  privateRepo = false,
  description = "Auto-created repo from NoteBrain",
}: {
  token: string;
  owner: string;
  repo: string;
  isOrg?: boolean; // true for organization repo
  privateRepo?: boolean;
  description?: string;
}) {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };

  // 1. Check if the repo already exists
  const repoUrl = `https://api.github.com/repos/${owner}/${repo}`;
  const checkRes = await fetch(repoUrl, { headers });

  if (checkRes.ok) {
    console.log("✅ Repository already exists:", `${owner}/${repo}`);
    return { created: false, repoUrl: `https://github.com/${owner}/${repo}` };
  }

  // 2. Create the repo (org vs user)
  const createUrl = isOrg
    ? `https://api.github.com/orgs/${owner}/repos`
    : `https://api.github.com/user/repos`;

  const createRes = await fetch(createUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: repo,
      private: privateRepo,
      description,
      auto_init: false, // optional: creates README by default
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.json().catch(() => ({}));
    throw new Error(
      `Failed to create repository: ${err.message || createRes.statusText}`
    );
  }

  console.log("Repository created:", `${owner}/${repo}`);
  return { created: true, repoUrl: `https://github.com/${owner}/${repo}` };
}
