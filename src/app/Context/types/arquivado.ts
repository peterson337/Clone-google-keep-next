
export type State = {
    useIsArquivado: () => void
}

export type AnotacoesArquivadas = {
    id: number;
    title: string;
    text: string;
    isArquivado?: 'notas' | 'arquivar';
    desarquivar?: () => void;
    arquivar?: () => void;
}
