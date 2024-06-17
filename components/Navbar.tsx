'use client'

import {UserButton} from '@clerk/nextjs'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import React from 'react'

const routes = [
  {
    name: 'Chat',
    path: '/',
  },
  {
    name: 'Perfil',
    path: '/perfil',
  },
]

function Navbar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-row items-center justify-between bg-black p-4 text-white ">
      <Link href="/">
        <h1 className="text-2xl font-bold">ArnoldAI</h1>
      </Link>
      <div className="flex items-center gap-x-6 text-lg">
        {routes.map((route, idx) => (
          <Link
            key={idx}
            href={route.path}
            className={
              pathname === route.path ? 'border-b-2 border-yellow-500' : ''
            }
          >
            {route.name}
          </Link>
        ))}

        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}

export default Navbar
