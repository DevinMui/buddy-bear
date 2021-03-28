import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ImportContactsIcon from '@material-ui/icons/ImportContacts'
import ScheduleIcon from '@material-ui/icons/Schedule'
import StarIcon from '@material-ui/icons/Star'
import { Row, Col, Container, Card, Button, CardDeck } from 'react-bootstrap'
import marble from './marble.jpg'

class Book {
    constructor(title, author, progress) {
        this.title = title
        this.author = author
        this.progress = progress
    }
}

let bookListFirst = [
    new Book('The Very Hungry Caterpillar', 'Eric Carle', 87),
    new Book('Thomas the Tank Engine', 'Jenny Lee', 12),
    new Book('Matilda', 'Roald Dahl', 21),
]

function Dash() {
    const [data, setData] = useState([])
    const [bookList, setBookList] = useState(bookListFirst)
    const user = useSelector((state) => state.user)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    function spawnBook(bookObj) {
        return (
            <div className="px-2 col-md-3 col-12 my-3 align-self-start">
                <div className="card-i">
                    <Link to="/books/:id" style={{ color: 'inherit' }}>
                        <Card.Img variant="top" src={marble} style={{borderRadius: 20}}/>
                        <Card.Body>
                            <Card.Title>{bookObj.title}</Card.Title>
                        </Card.Body>
                    </Link>
                </div>
            </div>
        )
    }

    function spawnBookList() {
        return bookList.map((b) => spawnBook(b))
    }

    useEffect(() => {
        // get data
        const getData = async () => {
            const devicesRes = await axios.get('/api/devices')
            const devices = devicesRes.data.data
            // parse data
            const parsedData = devices.map((device) => {
                return {
                    id: device._id,
                    data: device.data.map((dataPoint) => {
                        return {
                            x: new Date(dataPoint.updatedAt),
                            y: dataPoint.point,
                        }
                    }),
                }
            })

            setData(parsedData)
        }
        getData()
    }, [])

    return (
        <>
            <div className="mini-hero">
                <div className="container">
                    <Container>
                        <Row style={{ height: 50 }}></Row>
                        <Row className="text-center">
                            <Col>
                                <ImportContactsIcon style={{ fontSize: 100 }} />
                            </Col>
                            <Col>
                                <ScheduleIcon style={{ fontSize: 100 }} />
                            </Col>
                            <Col>
                                <StarIcon style={{ fontSize: 100 }} />
                            </Col>
                        </Row>
                        <Row style={{ height: 150 }}></Row>
                    </Container>
                </div>
            </div>

            <div className="container mt-4">
                <div className="row d-flex align-items-center">
                    <div className="col-12 col-md-3 text-center">
                        <Link to="/books" className="btn btn-new">
                            <i
                                className="bi bi-plus"
                                style={{
                                    fontSize: '64px',
                                }}
                            />
                        </Link>
                    </div>
                    {spawnBookList()}
                </div>
            </div>

            {/* <div
                    style={{
                        height: '500px',
                        marginTop: '25px',
                        padding: '25px',
                        background: 'rgba(196, 196, 196, 0.1)',
                    }}
                >
                    <LineGraph data={data} />
                </div> */}
        </>
    )
}

export default Dash
