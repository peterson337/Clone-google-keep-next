'use client'
import React from 'react'
import { useAnotacoes } from '../Context/store';
import { FaTrash } from 'react-icons/fa';
import { BiArchiveOut } from 'react-icons/bi';
import { Porps } from "../types/closeSideBar";

export const Arquivadas = ({closeSidebar}:Porps) => {

  const { anotacoesArquivadas, setAnotacoesArquivadas, anotacoes, setAnotacoes} = useAnotacoes();

  const deletarAnotacao = (id: number) => {
    const novasAnotacoes = anotacoesArquivadas.filter((val) => val.id !== id);
    setAnotacoesArquivadas(novasAnotacoes);
    localStorage.setItem("tarefaArquivadas", JSON.stringify(novasAnotacoes));

  }

  //TODO: RESOLVER O BUG DE ARQUIVAR TAREFAS

  const desarquivarArquivarAnotacao = (id: number) => {
    const novasAnotacoes = anotacoesArquivadas.map((val) => {
      if (val.id === id) {
        val.isArquivado = 'arquivar';
      }
      return val;
    });
    const novasAnotacoesArray = [...anotacoes, ...novasAnotacoes];
    setAnotacoes(novasAnotacoesArray);
    deletarAnotacao(id)
    localStorage.setItem("tarefa", JSON.stringify(novasAnotacoes));
 
  }

  return (
    <div>
      {
        anotacoesArquivadas.length === 0 ? (
          <div
          className={`flex flex-col justify-center items-center h-96 
                    ${closeSidebar? ' ml-40':''}`}
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
              // onClick={() => setIsOpnModal(!isOpnModal)} 
              key={val.id}
              className='flex border flex-wrap flex-col m-12 w-[200px] 
                         h-96 p-4 rounded-[20px] border-[#5f6368]'
            >
              <h1>{val.title}</h1>
              <p>{val.text}</p>

              
              <div className='grid grid-cols-2 gap-4 place-items-end h-96'>
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
            )
        })
      }
    </div>
  )
}
