'use client';
import React,{useState} from 'react'

export const Flex = () => {
    const [isFlexCol, setIsFlexCol] = useState<boolean>(false);

  return {
    isFlexCol,
    flexColRow: () => setIsFlexCol(!isFlexCol),
}
}