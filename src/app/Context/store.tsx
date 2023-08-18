'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
  import {State}  from "./types/arquivado";


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
  const [SearchInput, setSearchInput] = useState('');

  const [isArquivado, setIsArquivado] = useState<'notas' | 'arquivar'>('notas');



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
  }, []);
  

  const desarquivar = () => {
    setIsArquivado('notas');
    localStorage.setItem('estado', 'notas');
  }
  
  const arquivar = () => {
    setIsArquivado('arquivar');
    localStorage.setItem('estado', 'arquivar');
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
        arquivar
         }}>
      {children}
    </AnotacoesContext.Provider>
  );
};
