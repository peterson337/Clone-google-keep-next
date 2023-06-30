'use client'
import Image from 'next/image'
import React, {useState} from 'react';

type Porps = {
  closeSidebar: boolean;
  
}
export const Body = ({closeSidebar} : Porps) => {
  const [input, setInput] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [anotacao, setAnotacao] = useState([
    { 
      id: 0,
      title: 'titulo',
      text: 'teste de testo'
    }
  ]);

    const salvarTarefa = () => {
          alert('Funcionou');
          const novoId = Date.now();

          
           /* const salvarAnotacao = [
              {
                id:  novoId,
                title: title,
                text: anotacao,
              }

          ] 

          const newAnotacao = [...salvarAnotacao]
          setAnotacao(salvarAnotacao); */
    }

  return (
    <div>

      <div
        className={closeSidebar? '' : ''}
      >
          <input type="text"
          className={' text-black'}
          onChange={(e) => setTextInput(e.target.value)}
          value={textInput}
         />

          <input type="text"
          className={' text-black'}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
         />

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
