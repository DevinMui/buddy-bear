import { useEffect, useState } from 'react'

import Statistics from './statistics'
import Trouble from './trouble'
import Comparison from './comparison'

function Book() {
    const [pageIndex, setPageIndex] = useState(0)

    // load
    useEffect(() => {})

    let page

    switch (pageIndex) {
        case 0:
            page = <Statistics />
            break
        case 1:
            page = <Trouble />
            break
        case 2:
            page = <Comparison />
            break
        default:
    }

    return (
        <>
            <div className="">
                <div className="container"></div>
            </div>
            <div className="container">{page}</div>
        </>
    )
}

export default Book
