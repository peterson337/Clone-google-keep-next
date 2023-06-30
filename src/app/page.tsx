'use client'
import Image from 'next/image'
import React, {useState} from 'react';
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Body } from "./components/Body";



export default function Home() {
        const [closeSidebar, setCloseSidebar] = useState<boolean>(false);

  return (
    <main
    className=' h-screen bg-[#202124]'
    >

      <div
      className=''
      >
        
      <Header
      closeSidebar={closeSidebar}
      setCloseSidebar={setCloseSidebar}
      />

      { closeSidebar?
        <Sidebar
        />

        :

        <div></div>
      }

          <Body
        closeSidebar={closeSidebar}

          />


      </div>

    </main>
  )
}
