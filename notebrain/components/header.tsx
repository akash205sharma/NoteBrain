"use client"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@radix-ui/react-separator'
import { RefreshCcw } from 'lucide-react'
import { CircleCheckBig } from 'lucide-react';
import React from 'react'
import { useOpenFile } from '@/context/OpenFile'


export function AppHeader() {
  const { file } = useOpenFile();

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b">
        <div className="flex items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                {file.isSaving ?
                  (<RefreshCcw className="animate-spin animateDuration w-5 h-5 ml-1 mt-1 " />
                  ) : (<CircleCheckBig className="w-5 h-5 ml-1 mt-1 " />)}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
    </div>
  )
}

