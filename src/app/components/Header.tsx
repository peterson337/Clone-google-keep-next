import React from 'react'
import {FiMenu } from 'react-icons/fi'
import {BsFillGearFill } from 'react-icons/bs'
import {SiWindows11 } from 'react-icons/si'

type Porps = {
  closeSidebar: boolean;
  setCloseSidebar: (value: boolean) => void;
}

export const Header = ({closeSidebar, setCloseSidebar } : Porps) => {
  return (
    <div
    className='flex border-b pb-3 p-4 text-3xl space-x-40'
    >
       
    
        <button
        onClick={() => setCloseSidebar(!closeSidebar)}
        className=''
        >
         <FiMenu/>
        </button>

      <div
      className='flex flex-row'
      >

      <img src={`https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png`}
         className='text-3xl'
        />

        <p>Keep</p>
      </div>

        <input type="text"
        className='mr-3'

         />

        <button>
         <SiWindows11/>
        </button>

        <button
        >
         <BsFillGearFill/>
        </button>

    </div>
  )
}
