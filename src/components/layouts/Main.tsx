import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { FaBoxOpen } from "react-icons/fa6"
import { CiLogin } from "react-icons/ci"
import { LuUser2 } from "react-icons/lu"
import { GiHamburgerMenu } from "react-icons/gi"

type LayoutProps = {
  children: React.ReactNode
}

const menus = [
  {
    name: "Produk",
    href: "/product",
    icon: <FaBoxOpen />,
  },
  {
    name: "Profil",
    href: "/profile",
    icon: <LuUser2 />,
  },
]

export const MainLayout = ({ children }: LayoutProps) => {
  const [showNav, setShowNav] = useState(true)
  return (
    <div>
      <aside
        id='logo-sidebar'
        className={`fixed top-0 w-72 pt-10 z-40 h-screen transition-all duration-200 bg-oranye border-r border-zinc-300 sm:translate-x-0${
          showNav ? "-translate-x-full left-0" : "-translate-x-60 -left-60"
        }`}
        aria-label='Sidebar'>
        <div className='h-full px-3 pb-4 overflow-y-auto bg-oranye'>
          <div className='flex justify-between mb-10'>
            <h1 className='font-semibold text-white flex gap-2'>
              SIMS Web App
            </h1>
            <div
              className='w-fit cursor-pointer text-white'
              onClick={() => setShowNav(!showNav)}>
              <GiHamburgerMenu />
            </div>
          </div>
          {menus?.map((e, i) => (
            <ul
              key={i}
              className='space-y-2 font-medium'>
              <li>
                <Link
                  href={e.href}
                  className='flex items-center p-2 text-white rounded-lg group'>
                  <div>{e.icon}</div>
                  <span className='ms-3'>{e.name}</span>
                </Link>
              </li>
            </ul>
          ))}
          <ul className='space-y-2 font-medium'>
            <li>
              <Link
                href='/logout'
                className='flex items-center p-2 text-white rounded-lg group'>
                <div>
                  <CiLogin />
                </div>
                <span className='ms-3'>Login</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className={`${showNav ? "sm:ml-72" : "sm:ml-12"}`}>
        <div className='flex flex-col gap-3 p-10'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainLayout
