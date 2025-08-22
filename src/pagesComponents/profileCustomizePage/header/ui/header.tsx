"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const route = useRouter()
  
  const handleClick = () => {
    fetch('/api/logOut', {
      method: 'GET',
      credentials: 'include',
    }).finally(() => {
      route.push('/')
    })
  }

  return (
    <header className="pt-[10px] px-[10px] container base">
      <div className="w-full p-6 bg-primary-800/40 rounded-xl border border-primary-700 flex justify-between">
        <Link href={'/profile'}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" /></svg>
        </Link>
        <button onClick={handleClick} className="border-2 border-accent-300 text-accent-300 px-6 py-2 rounded-full hover:bg-accent-300 hover:text-white transition-colors">
          Выйти из аккаунта
        </button>
      </div>
    </header>
  )
}

