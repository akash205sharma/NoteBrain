"use client"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@radix-ui/react-separator'
import { RefreshCcw } from 'lucide-react'
import { CircleCheckBig } from 'lucide-react';
import React from 'react'
import { useOpenFile } from '@/context/OpenFile'
import { SyncWithGit } from './SyncWithGit'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


export function AppHeader() {
  const { data: session } = useSession();
  const { file } = useOpenFile();
  
  const router=useRouter()

  const libraryIndex = file.url.indexOf("/yourLibrary/");
  let segments: string[] = [];

  // if (libraryIndex !== -1) {
  //   const subPath = file.url.slice(libraryIndex + "/yourLibrary/".length);
  //   const lastSegment = subPath.split("/")[0]; // "MyProjects-project1-readme.md-Description"
  //   segments = lastSegment.split("-"); // ["MyProjects", "project1", "readme.md", "Description"]
  // }

  if (libraryIndex !== -1) {
    const subPath = file.url.slice(libraryIndex + "/yourLibrary/".length);
    const lastSegment = subPath.split("/")[0]; // e.g. My%20Projects-project1-readme.md-Description
    segments = lastSegment.split("-").map((s) => decodeURIComponent(s));
  }


  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b justify-between">
        <div className="flex items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {segments.slice(0, -1).map((segment, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    <BreadcrumbLink className="truncate max-w-[150px]">{segment}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                </React.Fragment>
              ))}

              {segments.length > 0 && (
                <>
                  <BreadcrumbItem className="flex items-center gap-1">
                    <BreadcrumbPage className="truncate max-w-[150px]">
                      {segments[segments.length - 1]}
                    </BreadcrumbPage>
                    {file?.isSaving ? (
                      <RefreshCcw className="animate-spin w-5 h-5 ml-1.5 mt-1" />
                    ) : (
                      <CircleCheckBig className="w-5 h-5 ml-1.5 mt-1" />
                    )}
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <SyncWithGit />
        {!session ? (
          <button className="cursor-pointer" onClick={() => router.push("/login")}>Login</button>
        ) : (
          <div className='cursor-pointer pr-2' onClick={ () => {  router.push('/profile') }} >
            <p>{session.user?.name}</p>
          </div>
        )}
      </header>
    </div>
  )
}
