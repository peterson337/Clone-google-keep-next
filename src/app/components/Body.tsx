'use client'
import Image from 'next/image'
import React, {useState} from 'react';

type Porps = {
  closeSidebar: boolean;
  
}

type Anotacao = {
  id: number;
  title: string;
  text: string;
};


export const Body = ({closeSidebar} : Porps) => {
  const [input, setInput] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [anotacao, setAnotacao] = useState<Anotacao[]>([]);

    const salvarTarefa = () => {
          const novoId = Date.now();

          
          const salvarAnotacao: Anotacao[] = [
              ...anotacao,
            {
              id: novoId,
              title: title,
              text: textInput, 
            },
          ];
          
          setAnotacao(salvarAnotacao); 
          setTitle('');
          setTextInput('');
    }


    return (
      <div className="mx-auto">
        <div className={closeSidebar ? '' : ''}>
          
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
  
          {anotacao.map((val) => {
            return (
              <div key={val.id}>
                <h1>{val.title}</h1>
                <p>{val.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
}
