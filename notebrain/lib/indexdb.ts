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

export async function saveMarkdown(markdown: string, url:string) {

  const db = await openDB();
  const tx = db.transaction(DB_STORE, "readwrite");
  const store = tx.objectStore(DB_STORE);
  store.put(markdown, url); // using key 'latest'
  
  return new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}


export async function getMarkdown2(){
    const db = await openDB();
    const tx = db.transaction(DB_STORE,"readonly");
    const store = tx.objectStore(DB_STORE);
    const dataRequest = store.get("latest");
    dataRequest.onsuccess= (event)=>{
        return dataRequest.result;
    }
    dataRequest.onerror=(event)=>{
        return "";
    }
}

export async function getMarkdown(url:string): Promise<string> {
    const db = await openDB();
    const tx = db.transaction(DB_STORE, "readonly");
    const store = tx.objectStore(DB_STORE);
    
    return new Promise((resolve, reject) => {
        const dataRequest = store.get(url);
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
  store.put(tree, "Filetree"); // using key 'latest'
  
  return new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}