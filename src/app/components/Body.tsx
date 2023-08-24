'use client'
import Image from 'next/image'
import React, {useState} from 'react';
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

  

  const filteredAnotacoes = anotacoes.filter((val) => val.text === SearchInput || val.title === SearchInput);
  const filteredAnotacoesArchived = anotacoesArquivadas.filter((val) => val.text === SearchInput || val.title === SearchInput);

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
          return (
            <div className="">
            <div className={closeSidebar ? '	' : ''}>
              
              <section className=' text-white pt-5'>
              {input ? (
                <div className="md:flex md:justify-center md:mt-5
                                grow shrink">
                  <input
                    type="text"
                    className={' p-2 md:w-[600px] border-2 bg-[#202124] shrink w-80'}
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
                  className={' p-2 md:w-[600px] mb-5 border-2 bg-[#202124] shrink w-80 mr-14 md:ml-14'}
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
                                     border-2 ">
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
              </section>
              
      
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
                      className='flex border flex-wrap flex-col m-12 w-[500px] 
                      h-[400px] p-28  rounded-[20px] border-[#5f6368] bg-[#202124]
                      content-start'
                      >

                 <div
                      className='flex flex-col items-center relative bottom-20 right-20'
                >  
                    <input
                      value={NewtextInput}
                      onChange={(e) => NewsetTextInput(e.target.value)}
                      className='text-white outline-0	 bg-[#202124] p-2 w-[429px]
                      text-2xl'
                      >
                      </input>

                      <br />

                    <textarea
                      value={Newtitle}
                      onChange={(e) => NewsetTitle(e.target.value)}
                      className='text-white outline-0	 bg-[#202124]  resize-none	p-2 
                                  w-[429px] h-[249px]'
                      >

                      </textarea>

             

                     <div
                      className='relative  left-36 top-2 grid content-end'
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
          </div>
          );
        }
}
