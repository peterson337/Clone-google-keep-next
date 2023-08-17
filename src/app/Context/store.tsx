'use client';
import React, { createContext, useContext, useState } from 'react';

type Anotacao = {
  id: number;
  title: string;
  text: string;
};

type AnotacoesContextType = {
  anotacoes: Anotacao[];
  adicionarAnotacao: (novaAnotacao: Anotacao) => void;
  SearchInput: string;
  setSearchInput: (value: string) => void;
  setAnotacoes: (value: Anotacao[]) => void;
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

  const adicionarAnotacao = (novaAnotacao: Anotacao) => {
    setAnotacoes([...anotacoes, novaAnotacao]);
  };

  return (
    <AnotacoesContext.Provider value={{ anotacoes, adicionarAnotacao, SearchInput, setSearchInput,setAnotacoes }}>
      {children}
    </AnotacoesContext.Provider>
  );
};
