import React from 'react'
import { Body } from "../components/Body";
import { useAnotacoes } from '../Context/store';



export const Sidebar = () => {
  const { desarquivar, arquivar } = useAnotacoes(); 
  
  return (
    <div>
      <div className=' bg-blue-950 w-96 h-[900px] flex flex-col  gap-4 mt-3'>
        <button onClick={desarquivar}>Notas</button>
        <button onClick={arquivar}>Arquivos</button>
      </div>
    </div>
  );
}
