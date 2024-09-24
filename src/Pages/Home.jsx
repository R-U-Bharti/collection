import { useContext } from 'react'
import { contextVar } from '@/Context/contextVar'
import { GrReactjs } from "react-icons/gr";
import mapple from '@/assets/mapple.svg'
import entertaining from '@/assets/entertaining.png'

const Home = () => {

  const { route } = useContext(contextVar)

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

  return (
    <>
      <div className="flex flex-wrap gap-4 md:px-8 justify-center px-2 animate__animated animate__fadeIn">

        <div className="w-full flex justify-center">
          <h1 className='text-2xl font-medium text-center py-2 mt-2 mb-4 border-b border-gray-400 w-max px-10'>Collections By <span className="font-bold text-amber-400 hover:underline cursor-pointer" onClick={() => window.open('https://r-u-bharti.github.io/portfolio', '_blank')}>R U Bharti</span></h1>
        </div>

        {routes.map((card, index) => <>
          <div onClick={() => routeFun(card)} className="w-full md:w-[24%] transition-all duration-200 cursor-pointer border-2 flex flex-col items-center justify-between gap-2 p-4 rounded-md hover:border-blue-700 hover:shadow-[0px_0px_20px_rgba(0,0,255,0.5)] hover:bg-blue-800/10" key={index}>

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
    </>
  )
}

export default Home