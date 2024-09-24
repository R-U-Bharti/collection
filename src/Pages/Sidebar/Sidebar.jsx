import RecursiveMenu from './RecursiveMenu';
import { useNavigate } from 'react-router-dom';
import { IoIosDocument } from 'react-icons/io';
import { useState } from 'react';
// import { useContext } from 'react';
// import { contextVar } from '@/Context/contextVar';

const SideBar = () => {

    const navigate = useNavigate()

    // const { navToggle, setNavToggle } = useContext(contextVar)
    const { navToggle, setNavToggle } = useState(false)

    // Menu Format
    const menus = [
        {
            icon: <IoIosDocument />, name: "Menu1", path: "", subMenu: [
                { name: "Submenu1", path: "/submenu1", subMenu: [] },
                {
                    name: "Sub-Submenu", path: "", subMenu: [
                        { name: "Sub-Submenu1", path: "/submenu1/1", subMenu: [] },
                        { name: "Sub-Submenu2", path: "/submenu1/2", subMenu: [] },
                    ]
                }
            ]
        }
    ]

    let mcolor = '#e6f7ff'    // menu color
    let tcolor = '#1890ff'      // text color

    // 👉 CSS constants 👈
    const menuStyle = `block py-2 px-4 hover:bg-[${mcolor}] hover:text-[${tcolor}] rounded-md animate__animated animate__fadeIn animate__faster `
    const subMenuStyle = `block w-full py-2 clear-both whitespace-nowrap hover:text-[${tcolor}] rounded-md animate__animated animate__fadeIn animate__faster `

    return (
        <>
            <nav className='w-full *:select-none *:focus:outline-none'>

                <header className={`${navToggle ? 'px-4' : 'px-2 justify-center'} py-2 flex flex-col items-center gap-2 font-semibold mb-4 mt-2 cursor-pointer`} onClick={() => navigate('/dashboard')}>
                    <img src={navToggle ? '/logo.png' : '/icon.png'} className={`bg-slate-100/80 object-contain w-full ${navToggle ? 'px-4 py-1 rounded-sm 2xl:h-[60px] md:h-[50px]' : 'rounded-full p-1'}`} alt="" srcset="" />
                </header>

                <RecursiveMenu
                    mcolor={mcolor}
                    tcolor={tcolor}
                    navToggle={navToggle}
                    menus={menus}
                    menuStyle={menuStyle}
                    subMenuStyle={subMenuStyle}
                />

            </nav>
        </>
    )
}
export default SideBar