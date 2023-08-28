'use client'
import React from 'react'
import { useAnotacoes } from '../Context/store';
import { FaTrash } from 'react-icons/fa';
import { BiArchiveOut } from 'react-icons/bi';
import { Porps } from "../types/closeSideBar";


export const Arquivadas = ({closeSidebar, isFlexCol, setIsFlexCol}:Porps) => {

  const { anotacoesArquivadas,
         setAnotacoesArquivadas,
          anotacoes,
          setAnotacoes,
          adicionarAnotacaoArquivada,
          SearchInput,
          } = useAnotacoes();

  const deletarAnotacao = (id: number) => {
    const novasAnotacoes = anotacoesArquivadas.filter((val) => val.id !== id);
    setAnotacoesArquivadas(novasAnotacoes);
    localStorage.setItem("tarefaArquivadas", JSON.stringify(novasAnotacoes));

  }


  const desarquivarArquivarAnotacao = (id: number) => {
    const novasAnotacoes = anotacoesArquivadas.filter((val) => val.id === id);
    if (novasAnotacoes.length > 0) {
      const novaAnotacaoArquivada = novasAnotacoes[0];
      deletarAnotacao(id)
  
      adicionarAnotacaoArquivada(novaAnotacaoArquivada);

    } 
  }
  
  const filteredAnotacoesArchived = anotacoesArquivadas.filter((val) => val.text === SearchInput || val.title === SearchInput);

if (filteredAnotacoesArchived.length > 0) {


 return(
  <section
      className={`flex  justify-center ${isFlexCol? 'flex-row' : ' flex-col'} items-center gap-4 flex-wrap`}
  >
    
  {
    filteredAnotacoesArchived.map((val) => {
      return(
        <section
        className='flex border flex-wrap flex-col  w-[200px] 
        h-96 p-4 rounded-[20px] border-[#5f6368] mt-14
        '
        key={val.id}
        >
          <h1>{val.title}</h1>
          <p>{val.text}</p>

          <div className='h-72 grid  content-end'>
               <div
                className='flex flex-row justify-between items-center place-items-end  '               >
               <button onClick={() => deletarAnotacao(val.id)}>
                  <FaTrash></FaTrash>
                </button>

                <button
                className=''
                onClick={() => desarquivarArquivarAnotacao(val.id)}
                >
                  <BiArchiveOut/>
                </button>

               </div>
              </div>
        </section>
      )
    })}
</section>
  
 )

}else{
  return (

    <div
          className={`flex justify-center items-center gap-4 flex-wrap ${isFlexCol? 'flex-row' : ' flex-col'} `}
    >

            
      
      {
        anotacoesArquivadas.length === 0 ? (
          <div
          className={`flex flex-col justify-center items-center h-96 `}

          >
                <BiArchiveOut
                className=' text-[90px] text-[#37383a]'
                />

            <p
            className={'text-[#9aa0a6]'}
            >Nenhuma anotação arquivada enncontrada.</p>
          </div>
        )

        :

        anotacoesArquivadas.map((val) => {
            return(
              <div
              key={val.id}
              className='flex border flex-wrap flex-col  w-[200px] 
              h-96 p-4 rounded-[20px] border-[#5f6368] mt-14'
            >
              <h1>{val.title}</h1>
              <p>{val.text}</p>

              
           <div className='h-72 grid  content-end'>
               <div
                className='flex flex-row justify-between items-center place-items-end  '               >
               <button onClick={() => deletarAnotacao(val.id)}>
                  <FaTrash></FaTrash>
                </button>

                <button
                className=''
                onClick={() => desarquivarArquivarAnotacao(val.id)}
                >
                  <BiArchiveOut/>
                </button>

               </div>
              </div>

                </div>
            )
        })
      }
    </div>
  )
  
}
}
