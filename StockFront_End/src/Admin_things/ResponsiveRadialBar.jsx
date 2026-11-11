import { ResponsiveRadialBar } from '@nivo/radial-bar'





export const AdminResponsiveRadialBar = ( { data =[
    {
      "id": "Supermarket",
      "data": [
        {
          "x": "Vegetables",
          "y": 251
        },
        {
          "x": "Fruits",
          "y": 90
        },
        {
          "x": "Meat",
          "y": 9
        },
        {
          "x": "Fish",
          "y": 165
        }
      ]
    },
    {
      "id": "Combini",
      "data": [
        {
          "x": "Vegetables",
          "y": 66
        },
        {
          "x": "Fruits",
          "y": 289
        },
        {
          "x": "Meat",
          "y": 162
        },
        {
          "x": "Fish",
          "y": 187
        }
      ]
    },
    {
      "id": "Online",
      "data": [
        {
          "x": "Vegetables",
          "y": 27
        },
        {
          "x": "Fruits",
          "y": 202
        },
        {
          "x": "Meat",
          "y": 97
        },
        {
          "x": "Fish",
          "y": 242
        }
      ]
    },
    {
      "id": "Marché",
      "data": [
        {
          "x": "Vegetables",
          "y": 131
        },
        {
          "x": "Fruits",
          "y": 20
        },
        {
          "x": "Meat",
          "y": 198
        },
        {
          "x": "Fish",
          "y": 78
        }
      ]
    }
  ] }) => (
    <ResponsiveRadialBar
        data={data}
        valueFormat=">-.2f"
        padding={0.4}
        cornerRadius={2}
        margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
        colors={{ scheme: 'category10' }}
        borderWidth={2}
        borderColor="#adaecd"
        radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
        circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
        legends={[
            {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 80,
                translateY: 0,
                itemsSpacing: 6,
                itemDirection: 'left-to-right',
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                symbolSize: 18,
                symbolShape: 'square',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)
