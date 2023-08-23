'use client';
import React, { createContext, useContext, useState, useEffect, } from 'react';
  import {State,AnotacoesArquivadas}  from "./types/arquivado";


type Anotacao = {
  id: number;
  title: string;
  text: string;
  isArquivado?: 'notas' | 'arquivar';
  desarquivar?: () => void;
  arquivar?: () => void;

};

type AnotacoesContextType = {
  anotacoes: Anotacao[];
  adicionarAnotacao: (novaAnotacao: Anotacao) => void;
  SearchInput: string;
  setSearchInput: (value: string) => void;
  setAnotacoes: (value: Anotacao[]) => void;
  isArquivado?: 'notas' | 'arquivar';
  desarquivar?: () => void;
  arquivar?: () => void;
  anotacoesArquivadas: AnotacoesArquivadas[], 
  setAnotacoesArquivadas: (value: AnotacoesArquivadas[]) => void;
  editarTarefas: string,
  setEditarTarefas: (value: string) => void;  
  id: number,
  setId: (value: number) => void;
  atualizarTarefaEditada : (tarefaEditada: Anotacao) => void;
};

const AnotacoesContext = createContext<AnotacoesContextType | undefined>(undefined);

export const useAnotacoes = () => {

  

  const context = useContext(AnotacoesContext);
  if (!context) {
    throw new Error('useAnotacoes deve ser usado dentro de AnotacoesProvider');
  }
  return context;
};

export const AnotacoesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [anotacoes, setAnotacoes] = useState<Anotacao[]>([]);
  const [anotacoesArquivadas, setAnotacoesArquivadas] = useState<AnotacoesArquivadas[]>([]);

  const [SearchInput, setSearchInput] = useState('');

  const [isArquivado, setIsArquivado] = useState<'notas' | 'arquivar'>('notas');

  const [editarTarefas, setEditarTarefas] = useState('');

  const [id, setId] = useState<number>(0);
  


  useEffect(() => {
    const savedAnotacao = localStorage.getItem('tarefa');
    if (savedAnotacao !== null) {
      const parsedAnotacoes = JSON.parse(savedAnotacao) as Anotacao[];
      setAnotacoes(parsedAnotacoes);
    }
  
    const data = localStorage.getItem('estado');
    if (data !== null) {
      setIsArquivado(data as 'notas' | 'arquivar');
    }

    const savedAnotacaoArchhived = localStorage.getItem('tarefaArquivadas');
    if (savedAnotacaoArchhived !== null) {
      const parsedAnotacoesRchived = JSON.parse(savedAnotacaoArchhived) as AnotacoesArquivadas[];
      setAnotacoesArquivadas(parsedAnotacoesRchived);
    }

    

  }, []);
  

  const desarquivar = () => {
    setIsArquivado('notas');
    localStorage.setItem('estado', 'notas');
  }
  
  const arquivar = () => {
    setIsArquivado('arquivar');
    localStorage.setItem('estado', 'arquivar');
  }
  
  const atualizarTarefaEditada = (tarefaEditada: Anotacao) => {
    const savedAnotacoes = anotacoes.map(tarefa => tarefa.id === tarefaEditada.id ? tarefaEditada : tarefa)
    setAnotacoes(savedAnotacoes);
     localStorage.setItem("tarefa", JSON.stringify(savedAnotacoes));
  }
  

  const adicionarAnotacao = (novaAnotacao: Anotacao) => {

    setAnotacoes([...anotacoes, novaAnotacao]);
   const localStoragNovaAnotacao = ([...anotacoes, novaAnotacao])
   localStorage.setItem("tarefa", JSON.stringify(localStoragNovaAnotacao));

  };



  return (
    <AnotacoesContext.Provider value={{ 
      anotacoes, 
      adicionarAnotacao,
       SearchInput,
        setSearchInput,
        setAnotacoes,
        isArquivado,
        desarquivar,
        arquivar,
        anotacoesArquivadas, 
        setAnotacoesArquivadas,
        editarTarefas, 
        setEditarTarefas,
        id,
        setId,
        atualizarTarefaEditada 
         }}>
      {children}
    </AnotacoesContext.Provider>
  );
};
