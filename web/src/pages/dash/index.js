import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ImportContactsIcon from '@material-ui/icons/ImportContacts'
import ScheduleIcon from '@material-ui/icons/Schedule'
import StarIcon from '@material-ui/icons/Star'
import { Row, Col, Container, Card, Button, CardDeck } from 'react-bootstrap'
import { ResponsiveLine } from '@nivo/line'
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
                <div className="row">
                    <div className="col-md-3">
                        <Link to="/books" className="btn btn-new">
                            <i
                                className="bi bi-plus"
                                // style={{
                                //     fontSize: '64px',
                                // }}
                            />
                        </Link>
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

const LineGraph = ({ data }) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{
            type: 'time',
            format: 'native',
            precision: 'minute',
        }}
        yScale={{
            type: 'linear',
            min: '0',
            max: 'auto',
            stacked: true,
            reverse: false,
        }}
        xFormat="time:%Y-%m-%d"
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            format: '%b %d',
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Date',
            legendOffset: 36,
            legendPosition: 'middle',
            tickValues: 5,
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Weight (pounds)',
            legendOffset: -40,
            legendPosition: 'middle',
        }}
        pointSize={10}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1,
                        },
                    },
                ],
            },
        ]}
    />
)
export default Dash
