'use client'
import Image from 'next/image'
import React, {useState, useEffect} from 'react';
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Body } from "./components/Body";
import { useAnotacoes } from './Context/store';
import { Arquivadas } from './components/Arquivadas';

export default function Home() {
        const [closeSidebar, setCloseSidebar] = useState<boolean>(false);
        const [isFlexCol, setIsFlexCol] = useState<boolean>(false);
        const { isArquivado } = useAnotacoes(); 
        useEffect(() => { 
      }, [isArquivado]);

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

  
          {isArquivado === 'notas' ? (
            <Body
              closeSidebar={closeSidebar}
              isFlexCol={isFlexCol}
              setIsFlexCol={setIsFlexCol}
            />
          ) : isArquivado === 'arquivar' ? (
            <Arquivadas />
          ) : (
            <div></div>
          )}

          
     </div>


      </div>

    </main>
  )
}
