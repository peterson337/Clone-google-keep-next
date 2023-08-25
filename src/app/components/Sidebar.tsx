import React from 'react'
import { Body } from "../components/Body";
import { useAnotacoes } from '../Context/store';
import { BiArchiveOut } from 'react-icons/bi';
import { BsLightbulb } from 'react-icons/bs';


export const Sidebar = () => {
  const { desarquivar, arquivar, isArquivado } = useAnotacoes(); 


  return (
    <section>
      <div className=' bg-[#202124] md:w-96  flex flex-col
                         gap-4 fixed   shadow z-50 w-60 h-full
                          shadow-black '>

        <button onClick={desarquivar}
        className={`${isArquivado === 'notas'? 'bg-[#41331c] p-3 mt-3' : 'p-3 mt-3'}`}
        >
      <span
      className=' inline-flex gap-4 items-center'
      >

      <BsLightbulb/>

          Notas
      </span>
          </button>

        <button onClick={arquivar}
        className={`${isArquivado === 'arquivar'? 'bg-[#41331c] p-3' : 'p-3'}`}
        
        >
            <span
          className=' inline-flex gap-4 items-center'
            
            >
            <BiArchiveOut/>
             Arquivos
            </span>
          </button>
      </div>
    </section>
  );
}
