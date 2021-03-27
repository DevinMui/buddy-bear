import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { BookCard } from '../../components/card'

import Statistics from './statistics'
import Trouble from './trouble'
import Comparison from './comparison'

function Book() {
    const [pageIndex, setPageIndex] = useState(0)

    const { id } = useParams()

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
            <div className="mini-hero">
                <div className="container">
                    <div className="row">
                        <BookCard
                            title="The Very Hungry Caterpillar"
                            author="Mike Oxlong"
                            description="Lorem Ipsum"
                            src="https://target.scene7.com/is/image/Target/GUEST_ea6b5786-9f05-471b-8c0d-440e863a97fd?wid=488&hei=488&fmt=pjpeg"
                        />
                    </div>
                </div>
            </div>
            <div className="container">{page}</div>
        </>
    )
}

export default Book
