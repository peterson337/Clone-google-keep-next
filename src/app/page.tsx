'use client'
import Image from 'next/image'
import React, {useState} from 'react';
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";



export default function Home() {
        const [sidebar, setSidebar] = useState(false);

  return (
    <main
    className=' h-screen bg-[#202124]'
    >

      <div
      className=''
      >
        
      <Header/>

      <Sidebar/>
      </div>

    </main>
  )
}
