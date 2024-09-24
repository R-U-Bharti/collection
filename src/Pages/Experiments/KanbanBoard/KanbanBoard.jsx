import React, { useState } from 'react'
import './style.css'

/*
https://react-grid-layout.github.io/react-grid-layout/examples/0-showcase.html
https://www.npmjs.com/package/react-dnd-multi-backend
http://react-grid-layout.github.io/react-draggable/example/
https://react-beautiful-dnd.netlify.app/?path=/story/multiple-horizontal-lists--stress-test
*/

/* 
-----------------------
| 🔰 KANBAN BOARD 🔰 |
-----------------------
*/

const Cards = ({ card, deleteCard, onDragStart }) => {

    const handleDragStart = (e) => {
        onDragStart(e, card)
    }

    return (
        <>
            <div draggable onDragStart={handleDragStart} className="bg-white/10 p-4 rounded shadow select-none flex items-center justify-between">{card?.content} <span onClick={() => deleteCard(card?.id)} className='cursor-pointer z-10 text-2xl font-semibold text-red-500'>&times;</span></div>
        </>
    )
}

const Column = ({ column, addCard, deleteCard, onCardDrop, handleDragStart }) => {

    const [cardContent, setCardContent] = useState('')

    const handleAddCard = (e) => {
        e.preventDefault()
        if (cardContent) {
            addCard(column?.id, cardContent)
            setCardContent('')
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        onCardDrop(e, column?.id)
    }

    return (
        <>
            <div className="bg-slate-400/20 p-4 rounded shadow w-1/3" onDragOver={handleDragOver} onDrop={handleDrop}>
                <h2 className='text-xl font-bold mb-4'>{column?.title}</h2>

                <form className="mb-4 flex gap-2" onSubmit={handleAddCard}>
                    <input value={cardContent} onChange={e => setCardContent(e.target.value)} type="text" placeholder='Task name...' className='bg-slate-800/90 p-2 w-full rounded focus:outline-none' />
                    <button type='submit' className='bg-green-400/70 hover:bg-green-600/70 p-2 px-3 text-2xl rounded'>+</button>
                </form>

                <div className="space-y-4">
                    {
                        column?.cards?.map((elem) => <>
                            <Cards key={elem?.id} card={elem} deleteCard={(cardId) => deleteCard(cardId, column?.id)} onDragStart={(e, card) => handleDragStart(e, card)} />
                        </>)
                    }
                </div>
            </div>
        </>
    )
}

const Board = () => {

    const [columns, setColumns] = useState([
        {
            id: 1, title: "To Do", cards: [
                { id: 1, content: "Task 1" },
                { id: 2, content: "Task 2" },
                { id: 3, content: "Task 3" },
                { id: 4, content: "Task 4" },
                { id: 5, content: "Task 5" }
            ]
        },
        { id: 2, title: "In Progress", cards: [] },
        { id: 3, title: "Completed", cards: [] }
    ])

    const [draggedCard, setDraggedCard] = useState(null)

    const addCard = (colId, content) => {
        const newColumn = columns?.map((column) => {
            if (column?.id === colId) {
                return {
                    ...column,
                    cards: [...column?.cards, { id: Date.now(), content: content }]
                }
            }
            return column;
        })

        setColumns(newColumn);
    }

    const deleteCard = (cardId, colId) => {
        const newColumn = columns?.map((column) => {
            if (column?.id === colId) {
                return {
                    ...column,
                    cards: column?.cards?.filter((card) => card?.id !== cardId)
                }
            }
            return column;
        })
        setColumns(newColumn);
    }

    const handleDragStart = (e, card) => {
        setDraggedCard(card)
    }

    const onCardDrop = (e, colId) => {
        const sourceId = columns.find(col => col.cards.includes(draggedCard))?.id;

        if (sourceId === colId)
            return;

        const updatedColumn = columns?.map((elem) => {

            if (elem?.id === sourceId) {
                return { ...elem, cards: elem?.cards.filter(item => item?.id !== draggedCard?.id) }
            }

            if (elem?.id === colId) {
                return { ...elem, cards: [...elem?.cards, draggedCard] }
            }

            return elem;

        })

        setColumns(updatedColumn)
        setDraggedCard(null)

    }

    return (
        <>
            <div className="w-full h-full flex space-x-4 p-4">

                {
                    columns?.map((elem) =>
                        <Column key={elem?.id} column={elem} addCard={addCard} deleteCard={deleteCard} onCardDrop={onCardDrop} handleDragStart={handleDragStart} />
                    )
                }

            </div>
        </>
    )
}

// Main component
const KanbanBoard = () => {

    return (
        <>
            <div className="w-screen h-screen flex flex-col items-center p-10 gap-6 *:select-none">
                <details>
                    <summary className='font-sans w-full text-center text-3xl font-bold'>KANBAN BOARD</summary>
                    <p className='max-w-[500px]'>A kanban board is an agile project management tool designed to help visualize work, limit work-in-progress, and maximize efficiency (or flow). It can help both agile and DevOps teams establish order in their daily work.</p>
                </details>

                <Board />

            </div>
        </>
    )
}

export default KanbanBoard