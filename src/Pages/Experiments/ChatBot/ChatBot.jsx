// ==============================================
// || Author: R U Bharti
// || Date: 21-08-2023
// || Component: Chat Bot
// || Description: This is actually help bot with some specific question.
// ==============================================
/*
Readme
---------------------------------------------------------------------------------------------------
Note: Do not change key -> q, a, topic

 // Array for ChatBot
 const your_array = [
    { q: "Here will be your heading/topic/question",      a: "Here will be your answer" }
  ]

    <ChatBot topic={your_array}/> // Imported ChatBot Component
*/

import React, { useEffect, useRef, useState } from 'react'
import chatBot from './chatBot.png'
import 'animate.css'

const ChatBot = (props) => {

    const { topic } = props
    const chatContainerRef = useRef(null);

    const [open, setOpen] = useState(false)
    const [chatHistory, setChatHistory] = useState([])

    const chatDataFun = (question) => {
        console.log(question)
        let answer = topic?.filter((item) => item?.q == question)
        console.log(answer)
        if(answer?.length > 0){
            setChatHistory([...chatHistory, answer[0]?.a]);
        }
    }

    useEffect(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    },[chatHistory])

    return (
        <>
            {/* Main Section */}
            <div ref={chatContainerRef} style={{scrollBehavior: 'smooth'}} className={` text-gray-900 bg-none backdrop:blur-lg drop-shadow-lg fixed bottom-6 right-6 transition-all duration-300 ${open ? ' w-[30vw] h-[90vh] bg-gray-100 rounded-xl overflow-y-auto overflow-x-clip ' : ' w-[7vw] h-[0vw] '}`}>

                {open && <>

                    {/* Header */}
                    <header className='text-center flex items-center bg-gradient-to-r select-none from-indigo-400 to-indigo-300 rounded-t-xl p-4 font-semibold text-white'>
                        <span className='w-[13%]'><img src={chatBot} alt="" srcSet="" className='w-[3vw] transform -scale-x-100' /></span>
                        <span className='w-[40%] text-start text-lg'>Welcome To Help Bot</span>
                        <span className='w-[47%] flex justify-end cursor-pointer text-3xl font-semibold' onClick={() => setOpen(false)}>&times;</span>
                    </header>

                    {/* Chat Section */}
                    <main className='w-full flex-col p-4 relative'>

                        {/* Static Chat */}
                        <div className='flex items-end gap-2'>
                            <img src={chatBot} alt="Chatbot" className='w-[2.2vw] -scale-x-100 select-none' />
                            <div className='flex flex-col text-md gap-1'>
                                <span className='rounded-xl bg-gray-200 w-max flex flex-col px-4 p-2'>
                                    <span>Hi there 👋 </span>
                                    <span>Welcome to Help Bot - </span>
                                    <span>Seems like you stuck !!!</span>
                                </span>
                                <span className='rounded-xl bg-gray-200 w-max px-4 p-2'>
                                    How can I help you ?
                                </span>
                            </div>
                        </div>

                        <div className='w-full flex justify-end mt-4 select-none'>
                            <div className='w-[75%] flex flex-wrap items-end justify-end gap-2 '>
                                {topic?.map((elem) => <>
                                    <div onClick={() => chatDataFun(elem?.q)} className='w-max text-sm text-indigo-400 px-4 p-1 rounded-xl border border-indigo-400 hover:bg-indigo-400 hover:text-white cursor-pointer'>
                                        {elem?.q}
                                    </div>
                                </>)}
                            </div>
                        </div>

                        {/* Dynamic Chat */}
                        <div className='w-full mt-6'>

                            {
                                chatHistory?.map((elem) => <>
                                    <div className='flex items-end gap-2 mt-4 w-[80%] animate__animated animate__fadeInLeft animate__faster'>
                                        <img src={chatBot} alt="Chatbot" className='w-[2.2vw] -scale-x-100 select-none' />
                                        <div className='rounded-xl bg-gray-200 w-max flex flex-wrap px-4 p-2'>
                                                {elem}
                                        </div>
                                    </div>

                                    <div className='w-full flex justify-end mt-4 select-none'>
                                        <div className='w-[75%] flex flex-wrap items-end justify-end gap-2 animate__animated animate__fadeInRight '>
                                            {topic?.map((elem) => <>
                                                <div onClick={() => chatDataFun(elem?.q)} className='w-max text-sm text-indigo-400 px-4 p-1 rounded-xl border border-indigo-400 hover:bg-indigo-400 hover:text-white cursor-pointer'>
                                                    {elem?.q}
                                                </div>
                                            </>)}
                                        </div>
                                    </div>
                                </>)
                            }

                        </div>

                    </main>
                </>}


                {/* Logo for toggle */}
                {!open && <img src={chatBot} alt="" srcSet="" className='w-[3vw] absolute bottom-2 right-2 hover:animate-spin drop-shadow-md cursor-pointer' onClick={() => setOpen(!open)} />}

            </div>

        </>
    )
}

export default ChatBot