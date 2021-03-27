import Modal from 'react-modal'
import { useState } from 'react'
import { BookCard } from '../../components/card'
import { Link } from 'react-router-dom'

const DUMMY_BOOK_RESULTS = [
    {
        // author
        author: 'Eric Carle',
        // title
        title: 'Harry Potter and the Sorcerer of Fire',
        // description
        description:
            'Additionally, Bootstrap also includes an .mx-auto class for horizontally centering fixed-width block level content—that is, content that has display: block and a width set—by setting the horizontal margins to auto.',
        // src
        src:
            'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHw%3D&w=1000&q=80',
    },
    {
        // author
        author: 'Eric Carle',
        // title
        title: 'Harry Potter and the Sorcerer of Fire',
        // description
        description:
            'Additionally, Bootstrap also includes an .mx-auto class for horizontally centering fixed-width block level content—that is, content that has display: block and a width set—by setting the horizontal margins to auto.',
        // src
        src:
            'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHw%3D&w=1000&q=80',
    },
    {
        // author
        author: 'Eric Carle',
        // title
        title: 'Harry Potter and the Sorcerer of Fire',
        // description
        description:
            'Additionally, Bootstrap also includes an .mx-auto class for horizontally centering fixed-width block level content—that is, content that has display: block and a width set—by setting the horizontal margins to auto.',
        // src
        src:
            'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHw%3D&w=1000&q=80',
    },
]

const SearchBar = (props) => {
    const { search, setSearch, submit } = props
    return (
        <div className="col-12 col-md-6 card-i bg-color mt-4 d-flex">
            <input
                type="text"
                rows={1}
                required
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    borderColor: 'transparent',
                    background: 'inherit',
                    outline: 'none',
                }}
                onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                        submit()
                    }
                }}
                className="col-11"
                placeholder="Search for a book..."
            />
            <i
                onClick={submit}
                className="bi-search col-1"
                style={{
                    fontSize: 18,
                    color: 'inherit',
                    paddingTop: 2,
                    marginLeft: -18,
                    cursor: 'pointer',
                }}
            />
        </div>
    )
}

export default function CreateBook() {
    const [search, setSearch] = useState('')
    const [router, setRouter] = useState(0)
    const [books, setBooks] = useState([]) // Array for results, object for selection
    const [modalOpen, setModalOpen] = useState(false)

    const submit = () => {
        if (!search) return
        const data = DUMMY_BOOK_RESULTS
        // TODO: make gBooks API call here
        setBooks(data)
    }
    const synthesize = () => {
        // TOOD: make API call here
    }
    const record = () => {
        setModalOpen(true)
    }

    switch (router) {
        case 0:
            // Search page
            return (
                <>
                    <div className="mini-hero">
                        <div className="container">
                            <h3>Add a new book</h3>
                            <div className="row">
                                <SearchBar
                                    search={search}
                                    setSearch={setSearch}
                                    submit={submit}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="container pb-5">
                        {books.map((b) => (
                            <div className=" my-4">
                                <BookCard
                                    onClick={() => {
                                        setRouter(1)
                                        setBooks(b)
                                    }}
                                    style={{ cursor: 'pointer' }}
                                    {...b}
                                />
                            </div>
                        ))}
                    </div>
                </>
            )

        default:
            // Synth recording
            return (
                <>
                    <div className="mini-hero">
                        <div className="container">
                            <BookCard {...books} />
                        </div>
                    </div>
                    <div className="container">
                        <div className="row py-5 text-center d-flex align-items-center">
                            <div
                                className="col-xs-12 col-md-4 offset-md-1"
                                onClick={record}
                                style={{ cursor: 'pointer' }}
                            >
                                <i
                                    className="bi-people"
                                    style={{ fontSize: 72 }}
                                />
                                <h3 className="">Read along</h3>
                            </div>
                            <div className="col-xs-12 col-md-2 mt-4 mb-2">
                                <h3>OR</h3>
                            </div>
                            <div
                                className="col-xs-12 col-md-4"
                                onclick={synthesize}
                                style={{ cursor: 'pointer' }}
                            >
                                <i
                                    className="bi-soundwave"
                                    style={{ fontSize: 72 }}
                                />
                                <h3 className="">Synthesize</h3>
                            </div>
                        </div>
                    </div>
                    <Modal
                        isOpen={modalOpen}
                        className="card-i bg-color px-4 py-4"
                        onRequestClose={() => setModalOpen(false)}
                        style={{
                            overlay: { backgroundColor: 'rgba(33,33,33,0.4)' },
                            content: {
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                width: 600,
                                maxWidth: '95vw',
                                transform: 'translate(-50%,-50%)',
                            },
                        }}
                    >
                        <div className="text-center">
                            <h3>Record</h3>
                            <div>Grab the book and start reading.</div>
                            <div>We'll take care of everything else.</div>
                            <i
                                className="bi-soundwave"
                                style={{
                                    fontSize: 128,
                                    color: 'var(--primary-ii-color)',
                                }}
                            />
                            <div className="row px-3 d-flex justify-content-between ">
                                <Link to="#">Previous Page</Link>
                                <Link to="#">Next Page</Link>
                            </div>
                        </div>
                    </Modal>
                </>
            )
    }
}
