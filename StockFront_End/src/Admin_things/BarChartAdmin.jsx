import { ResponsiveBar } from '@nivo/bar';

export const BarChartAdmin = ({ data = [
    {
        "country": "AD",
        "0-10": 120,
        "10-20": 200,
        "20-30": 350,
        "30-40": 280,
        "40-50": 180,
        "50-60": 120,
        "60+": 80
    },
    {
        "country": "AE",
        "0-10": 150,
        "10-20": 220,
        "20-30": 380,
        "30-40": 290,
        "40-50": 200,
        "50-60": 150,
        "60+": 100
    },
    // Add more countries with their age distribution
]
}) => (
    <ResponsiveBar
        data={data}
        keys={[
            '0-10',
            '10-20',
            '20-30',
            '30-40',
            '40-50',
            '50-60',
            '60+'
        ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'blues' }}
        borderColor={{
            from: 'color',
            modifiers: [['darker', 1.6]]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Country',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Age Group',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [['darker', 1.6]]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e => `${e.indexValue}: ${e.formattedValue} in age group ${e.id}`}
    />
);
