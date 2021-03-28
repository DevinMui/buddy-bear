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

    function spawnBook(bookObj) {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={marble} />
                <Card.Body>
                    <Card.Title>{bookObj.title}</Card.Title>
                    <Link to="/books/:id" className="btn btn-new">
                        <i className="" />
                    </Link>
                </Card.Body>
            </Card>
        )
    }

    function spawnBookGroup(i) {
        return (
            <CardDeck>
                {spawnBook(bookList[i])}
                {spawnBook(bookList[i + 1])}
                {spawnBook(bookList[i + 2])}
            </CardDeck>
        )
    }

    function spawnBookList() {
        let returnBookList = []
        var i = 0
        for (i = 0; i < bookList.length; i++) {
            returnBookList.push(spawnBookGroup(i))
            i++
            i++
        }
        return returnBookList
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
            <div className="mini-hero" style={{position:"relative"}}>
                <div className="container">
                    <Container>
                        <Row style={{ height: 50 }}></Row>
                        <Row className="text-center">
                            <Col>
                                <ImportContactsIcon style={{ fontSize: 100 }} />
                                <div style={{height:10}}></div>
                                <h3>100/100 books</h3>
                                <h4>read</h4>
                            </Col>
                            <Col>
                                <ScheduleIcon style={{ fontSize: 100 }} />
                                <div style={{height:10}}></div>
                                <h3>133 hours</h3>
                                <h4>read</h4>
                            </Col>
                            <Col>
                                <StarIcon style={{ fontSize: 100 }} />
                                <div style={{height:10}}></div>
                                <h3>3412</h3>
                                <h4>points</h4>
                            </Col>
                        </Row>
                        <Row style={{ height: 120 }}></Row>
                    </Container>
                </div>
                <svg width="249" height="242" viewBox="0 0 249 242" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{bottom:0, position:"absolute", bottom:"-75px", right:50}}>
                <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="34" y="73" width="202" height="95">
                <rect x="34.4971" y="73.765" width="201" height="94" fill="#C4C4C4"/>
                </mask>
                <g mask="url(#mask0)">
                <ellipse rx="86.6965" ry="89.084" transform="matrix(0.760139 -0.64976 0.636342 0.771407 132.871 173.892)" fill="#AC5606"/>
                <ellipse rx="27.7871" ry="28.553" transform="matrix(0.760139 -0.64976 0.636342 0.771407 66.0432 113.835)" fill="#AC5606"/>
                <ellipse rx="27.7871" ry="28.553" transform="matrix(0.760139 -0.64976 0.636342 0.771407 202.245 115.487)" fill="#AC5606"/>
                </g>
                </svg>

            </div>

            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-3">
                        <Container>
                            <Row style={{height:80}}></Row>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Link to="/books" className="btn btn-new" style={{height:100, width:100}}>
                                        <i
                                            className="bi bi-plus"
                                            // style={{
                                            //     fontSize: '64px',
                                            // }}
                                        />
                                    </Link>
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row></Row>
                        </Container>
                    </div>
                    <div className="col-md-9">{spawnBookList()}</div>
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
            </div>
        </>
    )
}

export default Dash
