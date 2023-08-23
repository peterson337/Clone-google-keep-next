'use client';
import React,{useState} from 'react';
import { useAnotacoes } from '../Context/store'

export const Teste = () => {
    const [isOpnModal, setIsOpnModal] = useState(false);
    const [id, setId] = useState<number>();
    
    const [NewtextInput, NewsetTextInput] = useState<string>('');
    const [Newtitle, NewsetTitle] = useState<string>('');
    const [textInput, setTextInput] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [first, setfirst] = useState(false);


    const { anotacoes} = useAnotacoes();

  const controlUseEffect = () => {
    alert('Função executada')	
    setIsOpnModal(true);
    const anotacaoAtual = anotacoes.filter(anotacao =>   {
      setId(anotacao.id);
      setTextInput(anotacao.text);
      NewsetTitle(anotacao.title);
  })
}
    
    return {
      isOpnModal,
      openModal: () => setIsOpnModal(true),
      closeModal: () => setIsOpnModal(false),
      id,
      setId: setId,
      NewtextInput,
      NewsetTextInput,
      Newtitle,
      NewsetTitle,
      textInput,
      setTextInput,
      title,
      setTitle,
      first,
      true: () => setfirst(true),
      false: () => setfirst(false),
      setfirst,
      controlUseEffect
      

    }
}
