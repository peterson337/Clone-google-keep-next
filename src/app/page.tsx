'use client'
import Image from 'next/image'
import React, {useState, useEffect} from 'react';
import { Header } from "./components/Header";
import { Body } from "./components/Body";
import { useAnotacoes } from './Context/store';
import { Arquivadas } from './components/Arquivadas';
import { Sidebar } from "./components/Sidebar";
import { Documents } from "./types/document";

export default function Home() {
        const [closeSidebar, setCloseSidebar] = useState<boolean>(false);
        const [isFlexCol, setIsFlexCol] = useState<boolean>(false);
        const { isArquivado } = useAnotacoes(); 
        useEffect(() => { 
      }, [isArquivado]);

      useEffect(() => {
        if (typeof window !== 'undefined') {
          if (closeSidebar) {
            document.body.style.overflow = 'hidden';
          } else {
            document.body.style.overflow = 'auto';
          }
        }
      }, [closeSidebar]);

  return (
    <main
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

     <section>
     
      
     { closeSidebar?

      <section>
       <Sidebar
        />

        <div
        className=' bg-transparent p-1 h-screen z-50 fixed top-25 md:w-[900px] right-0 w-36'
        onClick={() => setCloseSidebar(!closeSidebar)}
        ></div>
      </section>

        :

        <div></div>
      }

  
          {isArquivado === 'notas' ? (
            <Body
              closeSidebar={closeSidebar}
              isFlexCol={isFlexCol}
              setIsFlexCol={setIsFlexCol}
            />
          ) : isArquivado === 'arquivar' ? (
       
             <Arquivadas
            closeSidebar={closeSidebar}
            isFlexCol={isFlexCol}
            setIsFlexCol={setIsFlexCol}

             />
          ) : (
            <div></div>
          )}

          
     </section>


      </div>

    </main>
  )
}
