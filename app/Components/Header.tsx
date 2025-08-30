"use client"
import { Session } from 'next-auth';
import React, { useState } from 'react'
import { signIn, signOut, useSession } from "next-auth/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import 'remixicon/fonts/remixicon.css'

interface Props {
  session : Session | null;
  isAuthenticated ?: boolean;
  isloading ?: boolean;
}

function Header({ session , isAuthenticated , isloading } : Props) {

  const [open , setOpen] = useState<Boolean>(false);

  return (
    <div className='flex items-center justify-between w-full'>
        <h1 className='text-xl font-semibold text-white'>Movie Collection</h1>
        <div className="">
          {
            isloading ? (
              <span>Loading..</span>
            ) : (
              (
            isAuthenticated ? (
              <>
              <div className="flex items-center justify-center">
                <span className="text-white">{session?.user?.name}</span>
                <div className="relative">
                  <span onClick={() => setOpen(!open)} className='hover:cursor-pointer text-white'><BsThreeDotsVertical /></span>
                  <div className={`absolute top-full mt-1 text-white rounded-full bg-black p-2 right-0 ${open ? "block" : "hidden"}`}>
                    <span onClick={() => signOut()}>Logout</span>
                  </div>
                </div>
              </div>
              </>
            ) : (
              <span className='hover:cursor-pointer' onClick={() => signIn("google")}>login</span>
            )
              )
            )
          }
        </div>
    </div>
  )
}

export default Header
