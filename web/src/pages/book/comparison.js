import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import Diff from 'react-stylable-diff'

export default function Comparison() {
    const [pages, setPages] = useState([])
    const [pageIndex, setPageIndex] = useState(-1)

    const { id } = useParams()

    let audio = undefined

    useEffect(() => {
        async function getPages() {
            try {
                const res = await axios.get(`/api/books/${id}/pages`)
                const pages = res.data.data
                setPages(pages)
                setPageIndex(0)
            } catch (e) {
                console.error(e)
            }
        }
        getPages()
    }, [])

    function play() {}

    function prevPage() {
        setPageIndex(pageIndex - 1)
    }

    function nextPage() {
        console.log(pageIndex)
        setPageIndex(pageIndex + 1)
    }

    // replace with loader
    // if (pageIndex === -1) return <></>

    return (
        <div className="">
            <div className="row">
                <div className="mt-4 col-md-6">
                    <h3 className="text-center">Your child</h3>
                    <div className="comparison-card mt-4">
                        <p>
                            <Diff
                                inputA="Lorem Ipsum"
                                inputB="Lorem Ip failure"
                                type="words"
                            />
                        </p>
                        <button className="play accent-i-color" onClick={play}>
                            <i className="bi bi-play-fill" />
                        </button>
                    </div>
                </div>
                <div className="mt-4 col-md-6">
                    <h3 className="text-center">Source</h3>
                    <div className="comparison-card mt-4">
                        <p>Lorem Ipsum</p>
                        <button
                            className="btn play"
                            style={{ visibility: 'hidden' }}
                        >
                            <i className="bi bi-play-fill"></i>
                        </button>
                        <audio src="" ref={(a) => (audio = a)} />
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <div className="float-left">
                    <button
                        className="btn btn-link"
                        disabled={pageIndex === 0}
                        onClick={prevPage}
                    >
                        Previous Page
                    </button>
                </div>
                <div className="float-right">
                    <button
                        className={'btn btn-link'}
                        disabled={pageIndex === pages.length - 1}
                        onClick={nextPage}
                    >
                        Next Page
                    </button>
                </div>
            </div>
        </div>
    )
}
