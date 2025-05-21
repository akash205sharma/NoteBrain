import { TreeNode } from "@/types";

const DB_NAME = "NoteBrain";
const DB_VERSION = 3;
const DB_STORE = "notes";
const DB_TreeStore = 'FileTree'
let dbPromise: Promise<IDBDatabase> | null = null;

function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error("IndexedDB open error", event);
      reject("Error opening DB");
    };

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(DB_STORE)) {
        db.createObjectStore(DB_STORE);
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };
  });

  return dbPromise;
}

function extractFileName(url: string): string {
  return url.split("/").filter(Boolean).pop() || "";           //  replacing "/yourLibrary/"
}

function toFullUrl(fileName: string, folder = "/yourLibrary"): string {
  return `${folder}/${fileName}`;
}

export async function saveMarkdown(markdown: string, url:string) {
  const newUrl = extractFileName(url);
  const db = await openDB();
  const tx = db.transaction(DB_STORE, "readwrite");
  const store = tx.objectStore(DB_STORE);
  store.put(markdown, newUrl); // using key newUrl which is name of file in github
  
  return new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

export async function getMarkdown(url:string): Promise<string> {
    const db = await openDB();
    const tx = db.transaction(DB_STORE, "readonly");
    const store = tx.objectStore(DB_STORE);
    const newUrl = extractFileName(url);
    return new Promise((resolve, reject) => {
        const dataRequest = store.get(newUrl);
        dataRequest.onsuccess = () => {
            resolve(dataRequest.result || "");
        };
        dataRequest.onerror = () => {
            resolve("");
        };
    });
}

export async function getFileTree(){
  const db = await openDB();
    const tx = db.transaction(DB_STORE, "readonly");
    const store = tx.objectStore(DB_STORE);
    
    return new Promise((resolve, reject) => {
        const dataRequest = store.get("Filetree");
        dataRequest.onsuccess = () => {
            resolve(dataRequest.result);
        };
        dataRequest.onerror = () => {
            // resolve();
        };
    });
}
export async function saveFileTree(tree:TreeNode){
  const db = await openDB();
  const tx = db.transaction(DB_STORE, "readwrite");
  const store = tx.objectStore(DB_STORE);
  store.put(tree, "Filetree"); // using key Filetree
  
  return new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}


export async function getAllMarkdownFiles(): Promise<{ url: string, markdown: string }[]> {
  const db = await openDB();
  const tx = db.transaction(DB_STORE, "readonly");
  const store = tx.objectStore(DB_STORE);

  return new Promise((resolve, reject) => {
    const allEntries: { url: string; markdown: string }[] = [];
    const request = store.openCursor();

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        allEntries.push({ url: cursor.key as string, markdown: cursor.value });
        cursor.continue();
      } else {
        resolve(allEntries);
      }
    };

    request.onerror = () => reject(request.error);
  });
}

export async function deleteMarkdown(url: string): Promise<void> {
  const newUrl = extractFileName(url); // ensure key format matches stored format
  const db = await openDB();
  const tx = db.transaction(DB_STORE, "readwrite");
  const store = tx.objectStore(DB_STORE);
  store.delete(newUrl); // delete by key

  return new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}
