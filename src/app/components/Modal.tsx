'use client'
import { Input } from 'postcss';
import React, {useState,useEffect} from 'react'
import { useAnotacoes } from '../Context/store'
import { Id } from "../types/modalTipagem";
import { Teste } from '../hook/editarTarefas';


export const Modal = () => {
    const { anotacoes, 
            setAnotacoes,
            editarTarefas, 
            setEditarTarefas,
            id,
            setId,
            adicionarAnotacao,
            atualizarTarefaEditada 

        } = useAnotacoes();

        const {
            NewtextInput,
            NewsetTextInput,
            Newtitle,
            NewsetTitle,
            textInput,
            setTextInput,
            title,
            closeModal,
            first,

           } = Teste()


 // Encontrar a anotação correspondente ao ID atual
         

 useEffect(() => {
  
  const anotacaoAtual = anotacoes.filter(anotacao =>   {
    const constId =  anotacao.id;
    const constTarefas =  anotacao.text;
    const constTitle =  anotacao.title;

    setId(constId)
    setTextInput(constTarefas)
    NewsetTitle(constTitle)
    // anotacao.id === id;
    

  });
 }, []);

        const editarAnotacao = () => {

            closeModal();
            anotacoes.map((val) => {
                const tarefaEditada = { 
                  id: val.id,
                  text: NewtextInput,
                 title: Newtitle, 
                }
                atualizarTarefaEditada (tarefaEditada);
               // localStorage.setItem("tarefa", JSON.stringify(tarefaEditada));

                console.log(tarefaEditada);
             
           })
            
          
  
}

  return (
    <section
 
    >  
        <input
         value={NewtextInput}
         onChange={(e) => NewsetTextInput(e.target.value)}
         className='text-black'
         >
         </input>

         <br />

        <input
         value={Newtitle}
         onChange={(e) => NewsetTitle(e.target.value)}
         className='text-black'
         >

         </input>

         <button
         onClick={()=>editarAnotacao()}
         >salvar</button>

    </section>
  )
}
