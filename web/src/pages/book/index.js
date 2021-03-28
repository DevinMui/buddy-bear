import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { BookCard } from '../../components/card'

import Statistics from './statistics'
import Trouble from './trouble'
import Comparison from './comparison'

function Book() {
    const [pageIndex, setPageIndex] = useState(0)
    const [book, setBook] = useState({})

    const { id } = useParams()

    // load
    useEffect(() => {
        if (book) return
        async function getBook() {
            try {
                const res = await axios.get(`/api/books/${id}`)
                const book = res.data.data
                setBook(book)
            } catch (e) {
                console.error(e)
            }
        }
        getBook()
    })

    let page

    switch (pageIndex) {
        case 0:
            page = <Statistics />
            break
        case 1:
            page = <Comparison />
            break
        case 2:
            page = <Trouble />
            break
        // case 2:
        //     page = <Comparison />
        //     break
        default:
            page = <></>
            break
    }

    useEffect(() => window.scrollTo(0, 0), [])

    return (
        <>
            <div className="mini-hero">
                <div className="container">
                    <div className="row">
                        <BookCard {...book} />
                    </div>
                </div>
            </div>
            <div className="container mt-4 pb-5">
                <ul className="nav">
                    <li className="nav-item">
                        <button
                            style={{
                                color:
                                    pageIndex === 0
                                        ? 'var(--accent-color)'
                                        : 'var(--text-color)',
                            }}
                            className="btn btn-link"
                            onClick={() => setPageIndex(0)}
                        >
                            Statistics
                        </button>
                    </li>
                    {/*
                    <li className="nav-item">
                        <button
                            className="btn btn-link"
                            onClick={() => setPageIndex(1)}
                        >
                            Trouble Spots
                        </button>
                    </li>
                    */}
                    <li className="nav-item">
                        <button
                            style={{
                                color:
                                    pageIndex === 1
                                        ? 'var(--accent-color)'
                                        : 'var(--text-color)',
                            }}
                            className="btn btn-link"
                            onClick={() => setPageIndex(1)}
                        >
                            Comparison
                        </button>
                    </li>
                </ul>
                {page}
            </div>
        </>
    )
}

export default Book
