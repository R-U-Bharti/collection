import { useContext, useState } from 'react'
import { contextVar } from '@/Context/contextVar'
import { GrReactjs } from "react-icons/gr";
import mapple from '@/assets/mapple.svg'
import entertaining from '@/assets/entertaining.jpg'
import { decrypt, encrypt } from '@/Components/Common/PowerUpFunctions';
import toast from 'react-hot-toast';

const Home = () => {

  const { route } = useContext(contextVar)
  const [pwd, setPwd] = useState('')
  let localPwd = sessionStorage.getItem('pwd') ?? ''

  const routes = [
    { path: '/projectBase', title: 'Project Base Components', icon: <GrReactjs color="#58c4dc" /> },
    { link: 'https://r-u-bharti.github.io/mapple', title: 'Mapple Map Components', image: mapple },
    { link: 'https://r-u-bharti.github.io/demos', title: 'Entertaining Projects', image: entertaining },
  ]

  const routeFun = (card) => {
    if (card.link) {
      window.open(card.link, '_blank')
    }
    if (card.path) {
      route(card?.path ?? "/")
    }
  }

  const handleAuth = () => {
    if (pwd === import.meta.env.VITE_PWD) {
      sessionStorage.setItem('pwd', encrypt(pwd))
      toast.success('Authenticated',
        {
          icon: '👏',
          style: {
            borderRadius: '10px',
            background: 'rgba(0,0,0,0.9)',
            color: '#fff',
          },
        }
      )
      window.location.reload()
    } else {
      toast.error("Incorrect Password", {
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: 'rgba(0,0,0,0.9)',
          color: '#fff',
        },
      })
      setPwd('')
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-4 md:px-8 justify-center px-2 animate__animated animate__fadeIn">

        <div className="w-full flex justify-center">
          <h1 className='text-2xl font-medium text-center py-2 mt-2 mb-4 border-b border-gray-400 w-max px-10'>Collections By <span className="font-bold text-amber-400 hover:underline cursor-pointer" onClick={() => window.open('https://r-u-bharti.github.io/portfolio', '_blank')}>R U Bharti</span></h1>
        </div>

        {routes.map((card, index) => <>
          <div onClick={() => routeFun(card)} className="relative w-full md:w-[24%] transition-all duration-200 cursor-pointer border-2 flex flex-col items-center justify-between gap-2 p-4 rounded-md hover:border-blue-700 hover:shadow-[0px_0px_20px_rgba(0,0,255,0.5)] hover:bg-blue-800/10" key={index}>
            {card.path && decrypt(localPwd) !== import.meta.env.VITE_PWD && <div className='absolute top-0 right-0 bg-red-600 border border-red-400 px-3 py-1 text-xs rounded-bl'>Auth Required</div>}
            {card.icon && <>
              <span className='text-[150px] w-max h-max'>{card?.icon}</span>
            </>}

            {card.image && <>
              <img src={card.image} className='text-[150px]' />
            </>}

            <span>{card?.title}</span>

          </div>
        </>)}
      </div>

      <div className="md:absolute top-4 right-4 flex items-center gap-2">
        {decrypt(localPwd) === import.meta.env.VITE_PWD ?
          <div onClick={() => sessionStorage.clear()} className='cursor-pointer text-xs text-green-400 border border-green-400 px-3 py-1 rounded hover:bg-green-600 hover:text-white'>Authenticated</div>
          :
          <>
            <input type="password" onChange={e => setPwd(e.target.value)} value={pwd} name="" id="" className='border rounded px-3 text-sm py-1 bg-white/20 placeholder:text-white text-white focus:outline-none' placeholder='Enter password...' />
            <button onClick={() => handleAuth()} className='text-xs text-red-400 border border-red-400 px-3 py-1 rounded hover:bg-red-600 hover:text-white'>Authenticate</button>
          </>}
      </div>
    </>
  )
}

export default Home