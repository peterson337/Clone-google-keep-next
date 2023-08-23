import React, { useEffect } from 'react'
import {FiMenu } from 'react-icons/fi'
import {BsFillGearFill } from 'react-icons/bs'
import {SiWindows11 } from 'react-icons/si'
import { useAnotacoes } from '../Context/store'
import { parse } from 'node:path/win32'


type Porps = {
  closeSidebar: boolean;
  setCloseSidebar: (value: boolean) => void;
  isFlexCol: boolean
  setIsFlexCol: (value: boolean) => void;

}

export const Header = ({
  closeSidebar,
   setCloseSidebar,
    setIsFlexCol, 
    isFlexCol
  } : Porps) => {

    const { SearchInput, setSearchInput } = useAnotacoes(); 

      const mudar = () => {
        setIsFlexCol(!isFlexCol);

        localStorage.setItem('isFlexCol', JSON.stringify(!isFlexCol));
      }

      useEffect(() => {
        const isFlexCol =  localStorage.getItem('isFlexCol');
        if (isFlexCol !== null) {
          setIsFlexCol(JSON.parse(isFlexCol));
          
        }
      }, [])


      
  return (
    <div
    className='flex border-b pb-3 md:p-4 md:text-3xl md:space-x-40
                '   
    >
       
    
        <button
        onClick={() => setCloseSidebar(!closeSidebar)}
        className='text-xl'
        >
         <FiMenu/>
        </button>

      <div
      className='flex flex-row'
      >

      <img src={`https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png`}
         className='md:text-3xl w-7'
        />

        <p
        className='text-xl'
        >Keep</p>
      </div>

        <input type="text"
        className='md:mr-3 text-black'
        onChange={(e) => setSearchInput(e.target.value)}
         />

        <button onClick={mudar}>
         <SiWindows11/>
        </button>

        <button
        >
         <BsFillGearFill/>
        </button>

    </div>
  )
}
