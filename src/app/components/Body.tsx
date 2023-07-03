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
    <div>

      <div
        className={closeSidebar? '' : ''}
      >
        

          <div className='flex justify-center'>
              <input type="text"
          className={' text-black mt-10 p-2 w-[600px]'}
          onChange={(e) => setTextInput(e.target.value)}
          value={textInput}
          placeholder='Criar uma nota...'
         />
                  
         {input?

                <input type="text"
                className={' text-black'}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder='Titulo'
                />
                :

              <div></div>
          
         }

          </div>
        
         <button
         onClick={salvarTarefa}
         >
          Fechar
         </button>

         {
           anotacao.map((val) => {
                return(
                  <div
                  key={val.id}
                  >
                  <h1>{val.title}</h1>
    
                  <p>{val.text}</p>
                </div>
                )
           })
         }

      </div>
      
    </div>
  )
}
