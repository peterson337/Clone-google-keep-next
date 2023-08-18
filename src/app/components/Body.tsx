'use client'
import Image from 'next/image'
import React, {useState} from 'react';
import { useAnotacoes } from '../Context/store';
import { FaTrash } from 'react-icons/fa';


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



  const { anotacoes, adicionarAnotacao, SearchInput, setAnotacoes  } = useAnotacoes(); // Use o hook do contexto

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
    localStorage.clear();

  } 

  const filteredAnotacoes = anotacoes.filter((val) => val.text === SearchInput || val.title === SearchInput);

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
          // Renderização alternativa se não houver correspondência
          return (
            <div className="mx-auto">
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
                        'flex flex-col justify-center' 
                        :
                        'flex flex-row flex-wrap'}
    
                        
              >
             {
      anotacoes != [] && anotacoes.map((val) => {
            return (
              <div
                // onClick={() => setIsOpnModal(!isOpnModal)} 
                key={val.id}
                className='flex border flex-wrap flex-col m-12 w-[200px] 
                           h-96 p-4 rounded-[20px] border-[#5f6368]'
              >
                <h1>{val.title}</h1>
                <p>{val.text}</p>

                  <div
                    className='grid  gap-4 place-items-end h-96'>
                  <button
                  onClick={() => deletarAnotacao(val.id)}
                  >
                    <FaTrash></FaTrash>
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
