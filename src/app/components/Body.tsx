'use client'
import Image from 'next/image'
import React, {useState} from 'react';
import { useAnotacoes } from '../Context/store';
import { FaTrash } from 'react-icons/fa';
import { BiArchiveOut } from 'react-icons/bi';
import { BsLightbulb } from 'react-icons/bs';


type Porps = {
  closeSidebar: boolean;
  isFlexCol: boolean
  setIsFlexCol: (value: boolean) => void;
  
}

type Anotacao = {
  id: number;
  title: string;
  text: string;
};


export const Body = ({closeSidebar, isFlexCol} : Porps) => {
  const [input, setInput] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [isOpnModal, setIsOpnModal] = useState(false);
  const [anotacao, setAnotacao] = useState<Anotacao[]>([]);
  console.log(isOpnModal);



  const { anotacoes, 
          SearchInput,
          adicionarAnotacao,
          setAnotacoes,
          setAnotacoesArquivadas,
          anotacoesArquivadas,
          } = useAnotacoes();

  const salvarTarefa = () => {
    const novoId = Date.now();

    const novaAnotacao = {
      id: novoId,
      title: title,
      text: textInput,
    };

    adicionarAnotacao(novaAnotacao); // Adicione a nova anotação através do contexto
    setTitle('');
    setTextInput('');

  };

  const deletarAnotacao = (id: number) => {
    const novasAnotacoes = anotacoes.filter((val) => val.id !== id);
    setAnotacoes(novasAnotacoes);
    localStorage.setItem("tarefa", JSON.stringify(novasAnotacoes));

  }
  
  //TODO: RESOLVER O BUG DE ARQUIVAR TAREFAS


  const arquivarAnotacao = (id: number) => {
    const novasAnotacoes = anotacoes.map((val) => {
      if (val.id === id) {
        val.isArquivado = 'arquivar';
      }
      return val;
    });
    
    deletarAnotacao(id);
  
    // Aqui, supondo que anotacoesArquivadas é um array
    const novasAnotacoesArquivadas = [...anotacoesArquivadas, ...novasAnotacoes];
    setAnotacoesArquivadas(novasAnotacoesArquivadas);
    
    localStorage.setItem("tarefaArquivadas", JSON.stringify(novasAnotacoesArquivadas));
  }

    const editarAnotacao = (id: number) => {
      
    }
  

  const filteredAnotacoes = anotacoes.filter((val) => val.text === SearchInput || val.title === SearchInput);
  const filteredAnotacoesArchived = anotacoesArquivadas.filter((val) => val.text === SearchInput || val.title === SearchInput);

  

  if (filteredAnotacoes.length > 0 || filteredAnotacoesArchived.length > 0) {
    return (
      <div className="flex flex-row">
        {filteredAnotacoes.map((val) => (
          <div 
            key={val.id}
            className='flex border flex-wrap flex-col m-12 w-[200px] 
                       h-96 p-4 rounded-[20px] border-[#5f6368]'
          >
            <h1>{val.title}</h1>
            <p>{val.text}</p>
            <button
                  onClick={() => deletarAnotacao(val.id)}
                  >
                    <FaTrash></FaTrash>
                   </button>
          </div>
        ))}
      </div>
    );
  } else {
          // Renderização alternativa se não houver correspondência
          return (
            <div className="">
            <div className={closeSidebar ? '	' : ''}>
              
              <div className=' text-white'>
              {input ? (
                <div className="flex justify-center mt-5">
                  <input
                    type="text"
                    className={' p-2 w-[600px] border-2 bg-[#202124]'}
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder="Titulo"
                    onFocus={() => setInput(true)}
                    onBlur={() => setInput(false)}
                  />
                </div>
              ) : (
                <div></div>
              )}
      
              <div className="flex justify-center">
                <input
                  type="text"
                  className={' p-2 w-[600px] mb-5 border-2 bg-[#202124]'}
                  onChange={(e) => setTextInput(e.target.value)}
                  value={textInput}
                  placeholder="Criar uma nota..."
                  onFocus={() => setInput(true)}
       //           onBlur={() => setInput(false)}
                />
              </div>
      
              {input ? (
                <div className=' relative'>
                   <div className="flex bg-[#202124]
                                    mx-[410px] py-5 relative bottom-5
                                     border-2">
                  <button 
                  className='right-30'
                   onClick={salvarTarefa}
                   >
                    Fechar
                   </button>

               
    
                </div>
    
                <div>
                  
                </div>
                </div>
              ) : (
                <div></div>
              )}
              </div>
              
      
              <div
                   className={isFlexCol ? 
                    `flex  flex-wrap text-center justify-center`
                    :
                    `flex flex-col justify-center text-center items-center`
                   }
                    
                        
              >
             {
               anotacoes.length === 0?
               <div
               className={`flex flex-col justify-center items-center text-center h-96 
               ${closeSidebar? ' ml-40':' text-center'}`}
               >

                <BsLightbulb
                className=' text-[90px] text-[#37383a]'

                ></BsLightbulb>
                <p
                className={'text-[#9aa0a6]'}

                >As notas adicionadas são exibidas aqui</p>
               </div>
              :
              anotacoes.map((val) => {
            return (
              <div
              key={val.id}
              onClick={() => setIsOpnModal(true)} 
                className='flex border flex-wrap flex-col m-12 w-[200px] 
                           h-96 p-4 rounded-[20px] border-[#5f6368]'
              >

                <div>
                <h1>{val.title}</h1>
                <p>{val.text}</p>

                </div>
                <div className='grid grid-cols-2 gap-4 place-items-end h-96'>
                <button onClick={() => deletarAnotacao(val.id)}>
                  <FaTrash></FaTrash>
                </button>

                <button
                className=''
                onClick={() => arquivarAnotacao(val.id)}
                >
                  <BiArchiveOut/>
                </button>
              </div>

                  </div>
            );
          })
    }
    
              </div>
            </div>
          </div>
          );
        }
}
