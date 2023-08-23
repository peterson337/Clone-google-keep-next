'use client';
import React,{useState} from 'react'

export const SideBar = () => {
    const [closeSidebar, setCloseSidebar] = useState<boolean>(false);

  return {
    closeSidebar,
    fecharSidebar: () => setCloseSidebar(false),
    openSideBar: () => setCloseSidebar(true),
}
}
