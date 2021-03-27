import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import { ResponsiveLine } from '@nivo/line'

function Dash() {
    const [data, setData] = useState([])

    const user = useSelector((state) => state.user)

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
        <div className="container">
            <h2>Hi {user.name},</h2>
            <p>You've lowered your garbage bill by $25</p>
            <h2 className="text-center">$42</h2>
            <div
                style={{
                    height: '500px',
                    marginTop: '25px',
                    padding: '25px',
                    background: 'rgba(196, 196, 196, 0.1)',
                }}
            >
                <LineGraph data={data} />
            </div>
            <h2>Resources</h2>
            <p>Learn how to go zero-waste</p>
        </div>
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
