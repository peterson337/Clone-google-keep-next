'use client'
import Image from 'next/image'
import React, {useState} from 'react';
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Body } from "./components/Body";

export default function Home() {
        const [closeSidebar, setCloseSidebar] = useState<boolean>(false);
        const [isFlexCol, setIsFlexCol] = useState<boolean>(false);


  return (
    <main
    className=''
    >

      <div
      className=''
      >
        
      <Header
      closeSidebar={closeSidebar}
      setCloseSidebar={setCloseSidebar}
      isFlexCol={isFlexCol}
      setIsFlexCol={setIsFlexCol}
      />

     <div
     className={closeSidebar ? 'md:flex	' : ''}>
     

     { closeSidebar?
        <Sidebar
        />

        :

        <div></div>
      }

          <Body
        closeSidebar={closeSidebar}
        isFlexCol={isFlexCol}
        setIsFlexCol={setIsFlexCol}
          />
     </div>


      </div>

    </main>
  )
}
