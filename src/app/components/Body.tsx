'use client'
import Image from 'next/image'
import React, {useState, useEffect, useRef} from 'react';
import { useAnotacoes } from '../Context/store';
import { FaTrash } from 'react-icons/fa';
import { BiArchiveOut } from 'react-icons/bi';
import { BsLightbulb, BsFillPencilFill } from 'react-icons/bs';
import { Modal } from './Modal';
import { Teste } from '../hook/editarTarefas';


type Porps = {
  closeSidebar: boolean;
  isFlexCol: boolean
  setIsFlexCol: (value: boolean) => void;
  
}

type Anotacao = {
  id: number | undefined;
  title: string;
  text: string;
};


export const Body = ({closeSidebar, isFlexCol} : Porps) => {
  const [input, setInput] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [anotacao, setAnotacao] = useState<Anotacao[]>([]);
  const {
    isOpnModal,
    NewtextInput,
    Newtitle,
    openModal,
    closeModal,
    setfirst,
    NewsetTextInput,
    NewsetTitle,
  
  
   } = Teste()

  const { anotacoes, 
          SearchInput,
          adicionarAnotacao,
          setAnotacoes,
          setAnotacoesArquivadas,
          anotacoesArquivadas,
          editarTarefas, 
          setEditarTarefas,
          id,
          setId,
          atualizarTarefaEditada,
          
          } = useAnotacoes();
          
          
          

  const salvarTarefa = () => {
    const novoId = Date.now();

    const novaAnotacao = {
      id: novoId,
      title: title,
      text: textInput,
    };

    adicionarAnotacao(novaAnotacao); 
    setTitle('');
    setTextInput('');

  };

  const deletarAnotacao = (id: number) => {
    const novasAnotacoes = anotacoes.filter((val) => val.id !== id);
    setAnotacoes(novasAnotacoes);
    localStorage.setItem("tarefa", JSON.stringify(novasAnotacoes));

  }
  


  const arquivarAnotacao = (id: number) => {
    const novasAnotacoes = anotacoes.filter((val) => val.id === id)
      if (novasAnotacoes) {
     
        deletarAnotacao(id);
           // Aqui, supondo que anotacoesArquivadas é um array
    const novasAnotacoesArquivadas = [...anotacoesArquivadas, ...novasAnotacoes];
    setAnotacoesArquivadas(novasAnotacoesArquivadas);
    
    localStorage.setItem("tarefaArquivadas", JSON.stringify(novasAnotacoesArquivadas));
      }

    
  
 
  }

  

  const filteredAnotacoes = anotacoes.filter((val) => val.text === SearchInput || val.title === SearchInput);

  const editarAnotacao = (id:number) => {

    closeModal();
    anotacoes.filter((val) => {
        const tarefaEditada = { 
          id: id,
          text: NewtextInput,
         title: Newtitle, 
        }
        atualizarTarefaEditada (tarefaEditada);
       // localStorage.setItem("tarefa", JSON.stringify(tarefaEditada));

     
   })
    
  

}


    const fecharInput = () => {
      setInput(false);}

const controlUseEffect = (id:number) => {
  openModal();
  const anotacaoAtual = anotacoes.find(anotacao => anotacao.id === id);
  if (anotacaoAtual) {
      NewsetTitle(anotacaoAtual.title);
      NewsetTextInput(anotacaoAtual.text);
      setId(anotacaoAtual.id);
  }
}

  if (filteredAnotacoes.length > 0) {
    return (
      <div className="flex flex-row">
        {filteredAnotacoes.map((val) => (
    <section
    key={val.id}
      className='flex border flex-wrap flex-col m-12 w-[200px] 
                 h-96 p-4 rounded-[20px] border-[#5f6368]'
    >

      <div>
      <h1>{val.title}</h1>
      <p>{val.text}</p>

      </div>
      <div className='h-72 grid  content-end'>
     <div
      className='flex flex-row justify-between items-center place-items-end  '               >
     <button onClick={() => deletarAnotacao(val.id)}>
        <FaTrash></FaTrash>
      </button>

      <button
      className=''
      onClick={() => arquivarAnotacao(val.id)}
      >
        <BiArchiveOut/>
      </button>

      <button
        onClick={()=>controlUseEffect(val.id)} 
    >
        <BsFillPencilFill></BsFillPencilFill>
      </button>
     </div>
    </div>

        </section>
        ))}
      </div>
    );
  } else {
          return (
            <section className="">
            <div
            
            className={closeSidebar ? '	' : ''}>


                <div

                >
                {input?
                 <section
                 className={`md:justify-center md:align-center md:flex  z-[9999]`}
                 
                 >

                  <div
                  className={`flex flex-col  border border-[#5f6368]  rounded-lg 
                  mt-10 md:w-[700px] mx-7
                  `}
                  
                  
                  >
                    <div
                    className='flex flex-col mb-14'
                    >
                    <input type="text"
                    placeholder='Titulo'
                    className=' p-3 md:w-[600px] outline-0 pl-3  bg-[#202124]' 
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    />
                    <input type="text"
                    className={' p-3 md:w-[600px] outline-0 pl-3  bg-[#202124]'}
                    placeholder='Criar uma nota...'
                    onChange={(e) => setTextInput(e.target.value)}
                    value={textInput}
                    />

                    </div>

                    <div
                    className='flex flex-row justify-end mb-5 mr-3'
                    >
                    <button
                    onClick={salvarTarefa}
                    
                    >
                      Salvar
                    </button>

                    </div>


                  </div>
                    
                 </section>

                 :
                    <section
                    className='flex justify-center items-center'
                    >
                      <input 
                      className='mt-3  p-3 md:w-[600px] outline-0 w-80
                                 pl-5 rounded-lg  bg-[#202124] border border-[#5f6368]'
                                 placeholder='Criar uma nota...'
                                 onClick={() => setInput(true)}
                                 /> 
                    

                    </section>  
                }
              
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

              isOpnModal?
              <section
              className='fixed flex   bg-black bg-opacity-50 justify-center items-center
                         h-screen  w-screen left-0 top-0'
                         onClick={e => {
                          if (e.target === e.currentTarget) {
                            // Verifica se o clique ocorreu diretamente no elemento de fundo (section)
                            closeModal();
                          }
                        }}
              >
                
                    <div
                      className='md:flex border md:flex-wrap md:flex-col md:m-12 md:w-[500px] 
                      md:h-[400px] md:p-28  rounded-[20px] border-[#5f6368] bg-[#202124]
                      content-start
                      shrink '
                      >

                 <div
                      className='flex flex-col md:items-center relative md:bottom-20 md:right-20
                                 p-8 md:p-0'
                >  
                    <input
                      value={NewtextInput}
                      onChange={(e) => NewsetTextInput(e.target.value)}
                      className='text-white outline-0	 bg-[#202124] p-2 md:w-[429px]
                      md:text-2xl  w-72'
                      >
                      </input>

                      <br />

                    <textarea
                      value={Newtitle}
                      onChange={(e) => NewsetTitle(e.target.value)}
                      className='text-white outline-0	 bg-[#202124]  resize-none	md:p-2 
                                  md:w-[429px] md:h-[249px]  h-60'
                      >

                      </textarea>

             

                     <div
                      className='relative  md:left-36 md:top-0  md:bottom-0 grid content-end
                                  top-4 '
                     >

                      <div
                      className='flex flex-row justify-end items-end space-x-10'
                      >
                      <button
                      onClick={()=>editarAnotacao(id)}
                      >salvar</button>
                     <button
                     
                    onClick={closeModal}
              
                      >fechar
                    </button>
                      </div>

                     </div>
                </div>
                    </div>
                    </section>

              :

              anotacoes.map((val) => {
            return (
              <section
              key={val.id}
                className='flex border flex-wrap flex-col m-12 w-[200px] 
                           h-96 p-4 rounded-[20px] border-[#5f6368]'
              >

                <div>
                <h1>{val.title}</h1>
                <p>{val.text}</p>

                </div>
                <div className='h-72 grid  content-end'>
               <div
                className='flex flex-row justify-between items-center place-items-end  '               >
               <button onClick={() => deletarAnotacao(val.id)}>
                  <FaTrash></FaTrash>
                </button>

                <button
                className=''
                onClick={() => arquivarAnotacao(val.id)}
                >
                  <BiArchiveOut/>
                </button>

                <button
                  onClick={()=>controlUseEffect(val.id)} 
              >
                  <BsFillPencilFill></BsFillPencilFill>
                </button>
               </div>
              </div>

                  </section>

                  //!   () => editarAnotacao(val.id)
            );
          })
    }
    
              </div>
            </div>
          </section>
          );
        }
}
