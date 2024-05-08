import { Chart } from "react-google-charts";
import styles from './css_modules/Status.module.css'
import { useState } from "react";

export default function WorkStatus() {

    const [chartLoaded, setChartLoaded] = useState(false);

    const setColor = (value) => {
        if (value <= 25) {
            return 'darkred'
        }
        else if (value <= 50) {
            return 'orangered'
        }
        else if (value <= 75) {
            return 'darkblue'
        }
        else {
            return 'limegreen'
        }
    }

    const data = [
        [
            "Class",
            "Completion",
            { role: "style" },
            {
                sourceColumn: 0,
                role: "annotation",
                type: "string",
                calc: "stringify",
            },
        ],

        ["#4", 51.45, setColor(51), null],
        ["#5", 80.94, setColor(80), null],
        ["#6", 60, setColor(60), null],
        ["#7", 100, setColor(100), null],
        ["#8", 78, setColor(78), null],
        ["#9", 45.45, setColor(45), null],
        ["#10", 0, setColor(0), null],
        ["#11", 10.45, setColor(10), null],
        ["#12", 25.45, setColor(25), null]
    ];
    const options = {
        title: "Rate of Completion in Percentage",
        width: 1200,
        height: 650,
        bar: { groupWidth: "90%" },
        legend: { position: "none" },
    };
    return (
        <>
            <div className={styles.status_cont}>
                <h1 className={styles.heading}>
                    Work Status
                </h1>

                <div className={styles.work_cont}>
                    <div className={styles.charts}>
                        {
                            !chartLoaded && <div style={{ position: "absolute", top: "25vh", left: "25vw", height: "150px", width: "150px", zIndex: "5" }} className="spinner-grow" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        }
                        <Chart
                            chartType="BarChart"
                            width="100%"
                            height="40%"
                            data={data}
                            options={options}
                            onLoad={()=>setChartLoaded(true)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}