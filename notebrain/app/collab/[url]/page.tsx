// "use client"
// import React, { use, useEffect, useState } from 'react'
// import ReactDOM from 'react-dom/client';
// import { Play } from 'lucide-react';
// import { usePathname, useSearchParams } from 'next/navigation'
// import CrepeEditor from '@/components/CrepeEditor'
// import { useOpenFile } from '@/context/OpenFile'
// import { isValidPath } from '@/lib/validatePath'
// import { useFileTree } from "@/context/FileTree"
// import { codeBlockComponent, codeBlockView } from '@milkdown/components/code-block'
// import { runCode } from '@/actions/runCode'
// import { useRunningCode } from '@/context/RunningCode';
// import { codeChange, joinCollab } from '@/lib/socket';
// import {io} from "socket.io-client"
// // let userId = "";
// const socket = io('http://localhost:4000', {
//     // query: { userId }  // send userId to the server
// });
// const page = () => {
//   const { tree, setTree } = useFileTree()
//   const { file, setUrl } = useOpenFile();
//   const pathname = usePathname()
//   const [isValid, setIsValid] = useState<boolean>(false);
//   const {
//     isRunning,
//     isSidebarOpen,
//     code,
//     language,
//     output,
//     setIsRunning,
//     setIsSidebarOpen,
//     setCode,
//     setLang,
//     setInput,
//     setOutput,
//   } = useRunningCode();

//   useEffect(() => {
//     //   if (!isValid && pathname) {
//     //     console.log("validity");
//     //     const valid = isValidPath(tree, pathname);
//     //     console.log("validity",valid);
//     //     setIsValid(valid);

//     //     if (valid) {
//     //       console.log("Valid hai")
//     setUrl(pathname);
//     //     }
//     //     else{
//     //       console.log("Nahi hai valid")
//     //     }
//     //   }

//     joinCollab({link:pathname})
//   }, []);

//   const [markdown, setMarkdown] = useState('')


//   useEffect(() => {
//     codeChange({markdown})
//   }, [markdown])

//   useEffect(() => {
//    socket.on('code_change_read', ({markdown}) => {
// 			console.log(markdown, "Data Changed");
// 			setMarkdown(markdown)
// 		});

//     socket.on('user_joined',(id)=>{
//       console.log(id);
//     })

// 		return () => {
// 			socket.off('code_change_read');
// 			socket.off('user_joined');
// 		};


//   }, [socket])







//   useEffect(() => {
//     setIsSidebarOpen(false)
//     const codeBlocks = document.getElementsByClassName('milkdown-code-block');

//     Array.from(codeBlocks).forEach((block) => {
//       const toolsDiv = block.querySelector('.tools');

//       if (toolsDiv && !toolsDiv.querySelector('.react-run-button')) {
//         // Create a container div for React component
//         const reactRootDiv = document.createElement('div');
//         reactRootDiv.className = 'react-run-button';
//         reactRootDiv.style.marginLeft = '8px';
//         toolsDiv.appendChild(reactRootDiv);

//         // Mount your React RunButton inside the container
//         const cmContent = block.querySelector('div.cm-content');

//         const handleRun = async () => {
//           if (!cmContent) return;
//           const language = cmContent.getAttribute('data-language') || 'cpp';
//           const codeText = (cmContent as HTMLElement).innerText;
//           setCode(codeText);
//           setLang(language);
//           setIsSidebarOpen(false);
//           setOutput("")
//           setTimeout(() => {
//             setIsSidebarOpen(true);
//           }, 100);
//         };

//         const root = ReactDOM.createRoot(reactRootDiv); // React 18+
//         root.render(<Play onClick={handleRun} className='active:fill-white transition duration-150 hover:text-blue-400 cursor-pointer' />);
//       }
//     });
//   }, [markdown]);

//   const run = async () => {
//     if (code) {
//       try {
//         const result = await runCode(code, language);
//         if (result) {
//           setOutput(result.output)
//         }
//       } catch (error) {
//     setOutput("Error: Some Problem Occured")
//       }
//       setIsRunning(false);
//     }
//   };

//   useEffect(() => {
//     if(isRunning) run();
//   }, [isRunning])




//   return (
//     <main className="w-full text-white">
//       <CrepeEditor initial={""} onChange={(value) => setMarkdown(value)} />
//     </main>
//   )
// }

// export default page





'use client'
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Play } from 'lucide-react';
import { usePathname } from 'next/navigation';
import CrepeEditor from '@/components/CrepeEditor';
import { useOpenFile } from '@/context/OpenFile';
import { useFileTree } from "@/context/FileTree";
import { runCode } from '@/actions/runCode';
import { useRunningCode } from '@/context/RunningCode';
// import { io, Socket } from 'socket.io-client'; 
import { useCallback } from 'react';
import debounce from 'lodash.debounce';
import LiveEditor from '@/components/LiveEditor';


// let socket: Socket | null = null;

const Page = () => {
  const { setUrl } = useOpenFile();
  const pathname = usePathname();
  const { setIsRunning, setIsSidebarOpen, setLang, setCode, setOutput, isRunning, code, language } = useRunningCode();
  const [markdown, setMarkdown] = useState('');
  const isRemoteUpdate = useRef(false);


  // ✅ Setup Socket Connection Once
  // useEffect(() => {
  //   if (!socket) {
  //     socket = io('http://localhost:4000');
  //   }
 
  //   socket.emit('join_collab', { link: pathname });
 
 
  //   const handleCodeChangeRead = ({ markdown: newMarkdown, id }: any) => {
  //     console.log('Received code_change_read:', newMarkdown, 'Send By:', id);
  //     isRemoteUpdate.current = true;
  //     setMarkdown(newMarkdown);
  //   };

  //   socket.on('code_change_read', handleCodeChangeRead);

  //   socket.on('user_joined', (id) => {
  //     console.log('User joined:', id);
  //   });
  //   console.log(markdown);

  //   return () => {
  //     socket?.off('code_change_read', handleCodeChangeRead);
  //     socket?.off('code_change_read');
  //     socket?.off('user_joined');
  //   };

  // }, [pathname]);

  // const emitCodeChange = useCallback(
  //   debounce((markdown: string) => {
  //     socket?.emit('code_change_write', { markdown });
  //   }, 300),
  //   []
  // );

  // useEffect(() => {
  //   if (isRemoteUpdate.current) {
  //     isRemoteUpdate.current = false;
  //     return;
  //   }

  //   if (socket) {
  //     emitCodeChange(markdown);
  //   }

  // }, [markdown]);





  // Run button logic

  // useEffect(() => {
  //   setIsSidebarOpen(false);
  //   const codeBlocks = document.getElementsByClassName('milkdown-code-block');

  //   Array.from(codeBlocks).forEach((block) => {
  //     const toolsDiv = block.querySelector('.tools');
  //     if (toolsDiv && !toolsDiv.querySelector('.react-run-button')) {
  //       const reactRootDiv = document.createElement('div');
  //       reactRootDiv.className = 'react-run-button';
  //       reactRootDiv.style.marginLeft = '8px';
  //       toolsDiv.appendChild(reactRootDiv);

  //       const cmContent = block.querySelector('div.cm-content');

  //       const handleRun = async () => {
  //         if (!cmContent) return;
  //         const language = cmContent.getAttribute('data-language') || 'text';
  //         const codeText = (cmContent as HTMLElement).innerText;
  //         setCode(codeText);
  //         setLang(language);
  //         setIsSidebarOpen(false);
  //         setOutput('');
  //         setTimeout(() => setIsSidebarOpen(true), 100);
  //       };

  //       const root = ReactDOM.createRoot(reactRootDiv);
  //       root.render(
  //         <Play
  //           onClick={handleRun}
  //           className='active:fill-white transition duration-150 hover:text-blue-400 cursor-pointer'
  //         />
  //       );
  //     }
  //   });
  // }, [markdown]);

  // const run = async () => {
  //   if (code) {
  //     try {
  //       const result = await runCode(code, language);
  //       if (result) {
  //         setOutput(result.output);
  //       }
  //     } catch (error) {
  //       setOutput("Error: Some Problem Occurred");
  //     }
  //     setIsRunning(false);
  //   }
  // };

  // useEffect(() => {
  //   if (isRunning) run();
  // }, [isRunning]);


  useEffect(() => {
    setUrl(pathname);
  }, [pathname]);

  return (
    <main className="w-full text-white">
      <LiveEditor
        initial=""
        markdown={markdown}
        onChange={(value :any) => {
          if (!isRemoteUpdate.current) {
            setMarkdown(value);
          }
        }} />
    </main>
  );
};

export default Page;
