import { useEffect, useRef, useState } from 'react';
import { Prism } from 'react-syntax-highlighter';
import { a11yDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { BiSolidUpArrow } from 'react-icons/bi'

import useWebWorker from './Experiments/WebWorker/useWebWorker?raw';
import WebWorkerIndex from './Experiments/WebWorker/WebWorkerIndex?raw';
import DataVirtualization from './Experiments/DataVirtualization?raw';
import Virtualization from './Experiments/Virtualization?raw';
import SmartCam from './Experiments/SmartCam?raw';
import PerformanceAPI from './Experiments/PerformanceAPI?raw';
import HumanVerification from './Experiments/HumanVerification?raw';
import ChatBot from './Experiments/ChatBot/ChatBot?raw';
import Parallax from './Experiments/Parallax?raw';
import DivMagicCompiler from './Experiments/DivMagicCompiler?raw';
import KanbanBoard from './Experiments/KanbanBoard/KanbanBoard?raw';
import kanbanStyle from './Experiments/KanbanBoard/style.css?raw';
import FileCompressor from './Experiments/FileCompressor?raw';
import MouseMove from './Experiments/MouseMove?raw';
import Carousel from './Experiments/Carousel?raw';

const ExperimentalProject = () => {

  let topics = [
    { id: 1, topic: "Web Worker", fname: "useWebWorker.js, WebWorkerIndex.jsx", file: [useWebWorker, WebWorkerIndex] },
    { id: 2, topic: "Data Virtualization with and without library", fname: "DataVirtualization.jsx, Virtualization.jsx", file: [DataVirtualization, Virtualization] },
    { id: 3, topic: "Camera Feature", fname: "SmartCam.jsx", file: [SmartCam] },
    { id: 4, topic: "Performance API", fname: "PerformanceAPI.jsx", file: [PerformanceAPI] },
    { id: 5, topic: "Human Verification", fname: "HumanVerification.jsx", file: [HumanVerification] },
    { id: 6, topic: "Chat Bot", fname: "ChatBot.jsx", file: [ChatBot] },
    { id: 7, topic: "Parallax using 'Atropos'", fname: "Parallax.jsx", file: [Parallax] },
    { id: 8, topic: "Compiler using div tag only", fname: "DivMagicCompiler.jsx", file: [DivMagicCompiler] },
    { id: 9, topic: "Kanban Board with inbuild accodion", fname: "KanbanBoard.jsx, style.css", file: [KanbanBoard, kanbanStyle] },
    { id: 10, topic: "File Compressor", fname: "FileCompressor.jsx", file: [FileCompressor] },
    { id: 11, topic: "Mouse Movement", fname: "MouseMove.jsx", file: [MouseMove] },
    { id: 12, topic: "Carousel", fname: "Carousel.jsx", file: [Carousel] },
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
            <h1 className='text-2xl font-medium text-center py-2 mt-2 mb-4 border-b border-gray-400 w-max px-10'>Experimented Components</h1>
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

export default ExperimentalProject