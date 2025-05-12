'use client'

import CrepeEditor from '@/components/CrepeEditor'
import { useEffect, useState } from 'react'


export default function HomePage() {



  const [markdown, setMarkdown] = useState('')




  return (

    <main className="text-white">
      <CrepeEditor onChange={(value) => setMarkdown(value)} />

    </main>
  )
}


// useEffect(() => {

//   const dbName = "the_name";
//   // This is what our customer data looks like.
//   const customerData = [
//     { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
//     { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" },
//   ];


//   const request = indexedDB.open(dbName, 2);

//   request.onerror = (event) => {
//     // Handle errors.
//     console.log("problem in indexedDb");
//   };
//   request.onupgradeneeded = (event) => {
//     const db = (event.target as IDBOpenDBRequest).result;
//     const objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

//     objectStore.createIndex("name", "name", { unique: false });
//     objectStore.createIndex("email", "email", { unique: true });

//     objectStore.transaction.oncomplete = (event) => {
//       // Store values in the newly created objectStore.
//       const customerObjectStore = db
//         .transaction("customers", "readwrite")
//         .objectStore("customers");
//       customerData.forEach((customer) => {
//         customerObjectStore.add(customer);
//       });
//     };
//   };
  

// }, [])
