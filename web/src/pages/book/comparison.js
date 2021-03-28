import { useEffect, useState } from 'react'
import Diff from 'react-stylable-diff'

export default function Comparison() {
    const [page, setPage] = useState({})

    useEffect(() => {})

    function play() {}

    function prevPage() {}

    function nextPage() {}

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
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <div className="float-left">
                    <button className="btn btn-link" onClick={prevPage}>
                        Previous Page
                    </button>
                </div>
                <div className="float-right">
                    <button className="btn btn-link" onClick={nextPage}>
                        Next Page
                    </button>
                </div>
            </div>
        </div>
    )
}
