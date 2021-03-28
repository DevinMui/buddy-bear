import { ResponsiveLine } from "@nivo/line";

let data = [
    {
      "id": "child",
      "color": "hsl(196, 70%, 50%)",
      "data": [
        {
          "x": 2,
          "y": 131
        },
        {
          "x": 3,
          "y": 188
        },
        {
          "x": 4,
          "y": 253
        },
        {
          "x": 5,
          "y": 271
        },
        {
          "x": 6,
          "y": 27
        },
        {
          "x": 7,
          "y": 161
        },
        {
          "x": 8,
          "y": 275
        },
        {
          "x": 9,
          "y": 202
        },
        {
          "x": 10,
          "y": 278
        },
        {
          "x": 11,
          "y": 288
        },
        {
          "x": 12,
          "y": 231
        },
        {
          "x": 13,
          "y": 208
        }
      ]
    }
  ]

const LineGraph = ({ data /* see data tab */ }) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'time',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
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
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)

export default function Statistics() {
    return(
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
    );
}
