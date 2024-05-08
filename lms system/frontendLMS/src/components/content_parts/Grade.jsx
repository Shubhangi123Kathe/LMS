import { useEffect, useState } from "react";
import PopupTopic from "./PopupTopic";
import { ImBooks } from "react-icons/im";
import PopupContent from "./PopupContent";
import axios from "axios";

export default function Grade({ grade_data, grade}) {
    const [pop_topic, selectPopupTopic] = useState({});
    const [popup_content, selectPopupContent] = useState({});
    const [completionData, setCompletionData] = useState([]);
    const [singleWeekCompletion, setSingleWeekCompletion]=useState({});

    const statusParams = (week) => {
        const weekData = completionData[week];
        if (weekData && typeof weekData.status !== 'undefined') {
            
            if (weekData.status === -1) {
                return 'not-started';
            } else if (weekData.status === 0) {
                return 'ongoing';
            } else if (weekData.status === 1) {
                return 'complete';
            } else if (weekData.status === 2) {
                return 'problem';
            }
        }
        return 'unknown'; // Return a default value if status is undefined
    };
    
    const onMoreInfoClick = (week) => {
        selectPopupTopic(week);
    };

    const onDownloadableClick = (week) => {
        setSingleWeekCompletion(completionData[week.week-1])
        selectPopupContent(week);
    };

    let counter = 0;

    const refreshTable=()=>{
        axios.get("http://localhost:3000/user/userProfile", { withCredentials: true }).then((response) => {
            response.data.completionParams.forEach((dataObj) => {
                if (dataObj.grade === grade) {
                    setCompletionData(dataObj.weeks);
                }
            });
        });
    }

    useEffect(() => {
        axios.get("http://localhost:3000/user/userProfile", { withCredentials: true }).then((response) => {
            response.data.completionParams.forEach((dataObj) => {
                if (dataObj.grade === grade) {
                    setCompletionData(dataObj.weeks);
                }
            });
        });
    }, [grade]);

    return (
        <>
            {Object.keys(pop_topic).length !== 0 && <PopupTopic popup_topic={pop_topic} selectPopupTopic={selectPopupTopic} />}
            {Object.keys(popup_content).length !== 0 && <PopupContent grade={grade} popup_content={popup_content} selectPopupContent={selectPopupContent} singleWeekCompletion={singleWeekCompletion} refreshTable={refreshTable}/>}

            <div style={{ height: "90vh", overflow: "auto" }}>
                <table className="table align-middle mb-0 bg-white">
                    <thead className="bg-light" style={{ position: 'sticky', top: '0', padding: "10px" }}>
                        <tr>
                            <th>Week</th>
                            <th>Category</th>
                            <th>Topic</th>
                            <th>Status</th>
                            <th>Material/Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* ongoing, not-started, complete, problem */}
                        {completionData.length !== 0 && grade_data.map((week) => {
                            counter++;
                            return (
                                <tr key={week._id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="ms-3">
                                                <p className="fw-bold mb-1">{counter}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="fw-normal mb-1">{week.subject}</p>
                                    </td>
                                    <td onClick={() => onMoreInfoClick(week)}>{week.topic}</td>
                                    <td>
                                        <span className={`badge badge-success rounded-pill d-inline ${statusParams(counter-1)}`}>
                                            {statusParams(counter-1)}
                                        </span>
                                    </td>
                                    <td>
                                        <ImBooks style={{ marginLeft: 30 }} size={30} onClick={() => onDownloadableClick(week)} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
