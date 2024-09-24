import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  const menuList = [
    { label: "Menu", path: '/', subMenu: [] },
    { label: "Submenu", path: '', subMenu: [
      { label: "Submenu1", path: '/submenu1' },
    ] },
  ]

  const [toggleMenu, setToggleMenu] = useState('')
  const [sideMenuOpen, setSideMenuOpen] = useState(false)

  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > 152) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleFun = (menu, status = false) => {

    if (!status)
      setToggleMenu(menu?.label)

    if (sideMenuOpen && status)
      setToggleMenu('')

  }

  const sideMenuCloseFun = (subMenu = []) => {
    if(subMenu?.length === 0){
      setToggleMenu('')
      setSideMenuOpen(false)
    }
  }

  return (
    <>
      <nav className={`${isVisible ? 'relative' : 'fixed top-0 w-full animate__animated animate__slideInDown shadow-md '} z-50 bg-white px-4 2xl:px-10 md:px-8 py-2 md:py-4 flex justify-between items-center `} onMouseLeave={() => setToggleMenu('')}>

        {/* Logo */}
        <div className='flex items-center gap-2' onClick={() => navigate('/')}>
          <img loading="lazy" src={icons?.logo} className='md:w-[5vw] w-[20vw]' alt="" />
          <span className='text-xl md:text-2xl font-bold'>{links?.logo}</span>
        </div>

        {/* Menus */}
        <div className='flex items-center gap-8'>

          {/* Desktop */}
          <ul className='hidden md:flex items-center text-sm font-semibold gap-4'>
            {
              menuList?.map((menu, index) =>
                <li key={index} className='flex items-center relative' onClick={() => toggleFun(menu, toggleMenu === menu?.label)} onMouseEnter={() => toggleFun(menu, toggleMenu === menu?.label)}>
                  <NavLink onClick={() => sideMenuCloseFun()} to={menu?.subMenu?.length === 0 ? menu?.path : null} className={({ isActive }) => (isActive && menu?.subMenu?.length === 0) ? `text-blue` : `text-black hover:text-hoverBlue`}>{menu?.label}</NavLink>
                  {menu?.subMenu?.length > 0 && <span className={`${(toggleMenu === menu?.label && menu?.subMenu?.length > 0) ? '' : '-rotate-90'}`}>{icons?.down}</span>}

                  {
                    (toggleMenu === menu?.label && menu?.subMenu?.length > 0) &&
                    <ul className='absolute z-10 shadow-md bg-white flex flex-col justify-center top-12 w-[170px] animate__animated animate__fadeIn animate__faster'>
                      {menu?.subMenu?.map((subNav, index) =>
                        <li key={index} className='px-4 py-2 cursor-pointer border-b hover:bg-slate-100'>
                          <NavLink onClick={() => sideMenuCloseFun()} to={subNav?.path} className={({ isActive }) => (isActive) ? `text-blue` : `text-black`}>{subNav?.label}</NavLink>
                        </li>
                      )}
                    </ul>
                  }

                </li>
              )
            }

            <li>
              <button onClick={() => (navigate('/jobApplication'), sideMenuCloseFun())} className={`${styles?.bigButton} py-[6px] px-6 text-[14px] uppercase`}>Apply &rarr;</button>
            </li>

          </ul>

          <a href={`tel:+91${links?.phone}`} className='hidden md:flex items-center gap-2 cursor-pointer'>
            <div className='relative w-12 h-12 flex items-center justify-center hover:rotate-[360deg]'>
              <div className='w-10 h-10 flex items-center justify-center rounded-full bg-black text-white text-xl'>{icons?.call}</div>
              <div className="absolute border border-black rounded-full w-12 h-12 top-0 left-0"></div>
            </div>
            <div className='flex flex-col'>
              <span className='font-semibold text-sm'>Call Us Now</span>
              <span className='font-semibold text-xl'>{links?.phone}</span>
            </div>
          </a>
          {/* Desktop End */}

          {/* Mobile */}
          <div className="md:hidden block text-2xl" onClick={() => setSideMenuOpen(!sideMenuOpen)}>{icons?.bars}</div>

          {sideMenuOpen && <div className="md:hidden absolute z-50 p-4 bg-zinc-900 top-0 right-0 w-screen h-screen animate__animated animate__slideInRight animate__faster">

            <div className="flex justify-between items-center">
              <div onClick={() => (navigate('/'), sideMenuCloseFun())} className='flex items-center gap-2'>
                <img loading="lazy" src={icons?.logo} className='md:w-[90vw] w-[20vw] rounded-md' alt="" />
                <span className='text-2xl text-white font-bold'>{links?.logo}</span>
              </div>
              <div className='w-max text-xl bg-dark p-2 rounded-full text-white' onClick={() => (setToggleMenu(''), setSideMenuOpen(false))}>{icons?.cross}</div>
            </div>

            <p className='text-white my-6'>Welcome to DigisoulTech Pvt. Ltd. Empower with business with all the latest technology.</p>

            <ul className=' flex flex-col justify-center text-base font-semibold gap-3'>
              {
                menuList?.map((menu, index) =>
                  <li key={index} className='relative' onClick={() => toggleFun(menu, toggleMenu === menu?.label)}>
                    <NavLink onClick={() => sideMenuCloseFun(menu?.subMenu)} to={menu?.subMenu?.length === 0 ? menu?.path : null} className={({ isActive }) => (isActive && menu?.subMenu?.length === 0) ? `text-blue` : `text-white hover:text-hoverBlue flex justify-between items-center border-b pb-2`}>
                      <span>{menu?.label}</span>
                      {menu?.subMenu?.length > 0 && <span className={`${(toggleMenu === menu?.label && menu?.subMenu?.length > 0) ? 'rotate-45' : ''} text-white text-lg transition-all duration-300`}>{icons?.plus}</span>}</NavLink>

                    {
                      (toggleMenu === menu?.label && menu?.subMenu?.length > 0) &&
                      <ul className='w-full flex flex-col justify-center animate__animated animate__fadeIn animate__faster'>
                        {menu?.subMenu?.map((subNav, index) =>
                          <li key={index} className='px-4 py-2 cursor-pointer border-b hover:bg-dark text-white'>
                            <NavLink onClick={() => sideMenuCloseFun()} to={subNav?.path} className={({ isActive }) => (isActive) ? `text-blue` : `text-white`}>{subNav?.label}</NavLink>
                          </li>
                        )}
                      </ul>
                    }

                  </li>
                )
              }

              <li>
                <button onClick={() => (navigate('/jobApplication'), sideMenuCloseFun())} className={`${styles?.bigButton} py-[6px] px-6 text-[14px] uppercase w-full text-start`}>Apply &rarr;</button>
              </li>

            </ul>
          </div>}
          {/* Mobile End */}

        </div>

      </nav>
    </>
  )
}

export default Navbar