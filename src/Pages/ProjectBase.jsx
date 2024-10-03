import { useEffect, useRef, useState } from 'react';
import { Prism } from 'react-syntax-highlighter';
import { a11yDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { BiSolidUpArrow } from 'react-icons/bi'

import jsconfig from '../../jsconfig.json?raw'
import viteConfig from '../../vite.config.js?raw'
import css1 from '../index.css?raw'
import ErrorBoundary from '@/Components/ErrorBoundary?raw';
import SideBar from './Sidebar/Sidebar?raw';
import RecursiveMenu from './Sidebar/RecursiveMenu?raw';
import Table from './SimpleTable/Table?raw';
import Pagination from './SimpleTable/Pagination?raw';
import BackendTable from './BackendTable/BackendTable?raw';
import TableBp from './BackendTable/TableBp?raw';
import Pagination2 from './BackendTable/Pagination?raw';
import Navbar from './Navbar?raw';
import AxiosInterceptors from '@/Api/AxiosInterceptor?raw';
import fetchInterceptor from '@/Api/fetchInterceptor?raw';
import apiConstants from '@/Api/apiConstants?raw'
import baseApi from '@/Api/baseApi?raw'
import LoopForm from './LoopForm?raw';
import PowerUpFunctions from '@/Components/Common/PowerUpFunctions?raw'
import Stepper from '@/Components/Stepper?raw';
import FormIndex from './FormIndex?raw';
import main from '@/Translation/main?raw'
import TranslationIndex from '@/Translation/TranslationIndex?raw'
import TranslationProvider from '@/Translation/TranslationProvider?raw'
import ChangeLanguageComponent from '@/Translation/ChangeLanguageComponent?raw';
import Dialog from './Dialog?raw';
import NormalSlider from '@/Components/NormalSlider?raw';
import sliderCss from '@/Components/NormalSlider.css?raw'
import sliderSvg from '@/Components/slider.svg?raw'
import TwoThumbSlider from '@/Components/TwoThumbSlider?raw';
import contextVar from '@/Context/contextVar?raw';
import store from '@/store/index?raw'
import constantSlice from '@/store/slices/constantSlice?raw'

const ProjectBase = () => {

  let topics = [
    { id: 1, topic: "Import components via '@' ", fname: "jsconfig.json, vite.config.js", file: [jsconfig, viteConfig] },
    { id: 2, topic: "Base CSS ", fname: "App.css", file: [css1] },
    { id: 3, topic: "Handling white screen error boundary", fname: "ErrorBoundary.jsx", file: [ErrorBoundary] },
    { id: 4, topic: "Recursive Sidebar", fname: "SideBar.jsx, RecursiveMenu.jsx", file: [SideBar, RecursiveMenu] },
    { id: 5, topic: "Navbar", fname: "Navbar.jsx", file: [Navbar] },
    { id: 6, topic: "Basic Table", fname: "Table.jsx, Pagination.jsx", file: [Table, Pagination] },
    { id: 7, topic: "Backend Dependent Table", fname: "BackendTable.jsx, TableBp.jsx, Pagination.jsx", file: [BackendTable, TableBp, Pagination2] },
    { id: 8, topic: "Interceptors", fname: "AxiosInterceptor.jsx, fetchInterceptor.jsx", file: [AxiosInterceptors, fetchInterceptor] },
    { id: 9, topic: "API Constants and Collection", fname: "apiConstant.js, baseApi.jsx", file: [apiConstants, baseApi] },
    { id: 10, topic: "Loop Form", fname: "LoopForm.jsx", file: [LoopForm] },
    { id: 11, topic: "Power Up Functions", fname: "PowerUpFunctions.jsx", file: [PowerUpFunctions] },
    { id: 12, topic: "Stepper Form", fname: "Stepper.jsx, FormIndex.jsx", file: [Stepper, FormIndex] },
    { id: 13, topic: "Translation", fname: "main.jsx, TranslationIndex.jsx, TranslationProvider.jsx, ChangeLanguageComponent.jsx", file: [main, TranslationIndex, TranslationProvider, ChangeLanguageComponent] },
    { id: 14, topic: "Inbuilt Dialog", fname: "Dialog.jsx", file: [Dialog] },
    { id: 15, topic: "Range or Slider", fname: "NormalSlider.jsx, NormalSlider.css, slider.svg, TwoThumbSlider.jsx", file: [NormalSlider, sliderCss, sliderSvg, TwoThumbSlider] },
    { id: 16, topic: "useContext", fname: "contextVar.jsx", file: [contextVar] },
    { id: 17, topic: "Redux Toolkit (@reduxjs/toolkit)", fname: "index.js, constantSlice.js", file: [store, constantSlice] },
  ]

  const [copySuccess, setCopySuccess] = useState("");
  const [toggle, setToggle] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const topicRef = useRef([])

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const scrollToTopic = (id) => {
    if (topicRef.current[id]) {
      topicRef.current[id].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const toggleFun = (id) => {

    scrollToTopic(id)

    if (toggle == id) {
      setToggle('')
    }
    else {
      setToggle(id)
    }
  }

  const copyToClipboard = (file, id) => {
    navigator.clipboard.writeText(file)
      .then(() => {
        setCopySuccess(id);
        setTimeout(() => setCopySuccess(""), 2000); // Clear after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  const handleScroll = () => {
    console.log('scroll details: ', window.innerHeight, window.scrollY)
    if (window.scrollY > 152) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="flex justify-center *:text-zinc-50 overflow-x-clip">
        <div className="w-full px-2">

          <div className="w-full flex justify-center">
            <h1 className='text-2xl font-medium text-center py-2 mt-2 mb-4 border-b border-gray-400 w-max px-10'>Project Base Components</h1>
          </div>

          <div className="flex flex-wrap gap-2 gap-y-4 w-full p-2 md:p-4">
            {
              topics.map((item) =>
                <>
                  <div ref={(el) => (topicRef.current[item?.id] = el)} className={`w-full transition-all duration-200 ${toggle == item.id ? "md:w-full" : "md:w-[49%]"}`} key={item.id} resizable={true}>

                    <h2 className={`border cursor-pointer animate__animated animate__flipInX px-4 py-2 ${toggle == item.id ? 'border-green-700 bg-green-500/20 hover:shadow-[0px_0px_20px_rgba(0,255,0,0.5)]' : 'border-indigo-700 bg-indigo-500/20 hover:shadow-[0px_0px_20px_rgba(0,0,255,0.5)]'}`} onClick={() => toggleFun(item.id)} >
                      {item.topic} - <span className='font-semibold italic'>({item.fname})</span>
                    </h2>

                    {
                      toggle == item.id && item.file.map((fi, index) =>
                        <div className='animate__animated animate__fadeIn w-full bg-[#2b2b2b] border border-green-700 relative'>
                          <button className='absolute z-10 right-1 top-1 border border-amber-600 text-amber-50 text-xs font-medium hover:text-white px-3 py-1 hover:bg-amber-500' onClick={() => copyToClipboard(fi, String(fi))}>{copySuccess == String(fi) ? "Copied" : "Copy"} Code</button>
                          <Prism key={index} className="text-xs" language="javascript" style={theme}>
                            {fi}
                          </Prism>
                        </div>
                      )
                    }


                  </div>
                </>)
            }
          </div>

        </div>
      </div>

      {isVisible && <div onClick={scrollTop} className='animate__animated animate__fadeIn cursor-pointer text-sm border rounded-full w-max fixed bottom-2 right-2 hover:scale-105 transition-all duration-300 p-2 hover:bg-blue-500/50'>
        <a className='transform text-white '><BiSolidUpArrow /></a>
      </div>}

    </>
  )
}

export default ProjectBase