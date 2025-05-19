"use client"

import React, { useEffect, useState } from 'react'
// import DemoCodeBlock from '@/components/DemoCodeBlock'
import {codeBlockComponent,codeBlockView } from '@milkdown/components/code-block'
import {imageBlockComponent,imageBlockSchema} from '@milkdown/components/image-block'

const page = () => {

  useEffect(() => {
    const elements = document.getElementsByClassName('milkdown-code-block');
    Array.from(elements).forEach((el) => {
      const newDiv = document.createElement('div');
      newDiv.textContent = 'New Div';
      el.appendChild(newDiv);
    });
  }, []);

console.log(codeBlockComponent)

  return (
    <div>
      {/* <DemoCodeBlock/> */}
    </div>
  )
}

export default page

