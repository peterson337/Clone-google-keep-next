import React from 'react'
import {FiMenu } from 'react-icons/fi'
import {BsFillGearFill } from 'react-icons/bs'
import {SiWindows11 } from 'react-icons/si'



export const Header = () => {
  return (
    <div
    className='flex border-b pb-3 space-x-3 p-4 text-3xl'
    >
       
    
        <button>
         <FiMenu/>
        </button>

        <img src={`https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png`}
         className='text-3xl'
        />

        <p>Keep</p>

        <input type="text"
        className=''

         />

        <button
        >
         <BsFillGearFill/>
        </button>

        <button>
         <SiWindows11/>
        </button>
    </div>
  )
}
