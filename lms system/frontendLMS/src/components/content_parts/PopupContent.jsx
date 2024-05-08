import { IoMdCloseCircleOutline } from 'react-icons/io';
import { MdDownload } from "react-icons/md";
import styles from '../css_modules/Content.module.css';
import axios from 'axios';
import { useState } from 'react';
export default function PopupContent({grade, popup_content, selectPopupContent, singleWeekCompletion, refreshTable }) {
    const [isDownloading, setStatusDownload] = useState(false);
    const [selectedOption, setSelectedOption] = useState(""); // State to store the selected option
    

    const handleChange = (event) => {
        setSelectedOption(event.target.value); // Update the selected option state when an option is selected
    };

    const downloadMaterial = (link, name) => {
        axios.post("http://localhost:3000/download/content", { link }, { withCredentials: true }).then((response) => {
            setStatusDownload(true);
            const blob = new Blob([response.data], { type: 'application/pdf' });
            // Create a link element
            const downloadLink = document.createElement('a');
            // Set the href attribute of the link to the blob URL
            downloadLink.href = window.URL.createObjectURL(blob);
            // Set the download attribute to specify the filename
            downloadLink.download = name; // Specify the filename here
            // Append the link to the document body
            document.body.appendChild(downloadLink);
            // Click the link to trigger the download
            downloadLink.click();
            // Remove the link from the document body
            document.body.removeChild(downloadLink);
            setStatusDownload(false);

        }).catch((err) => {

            console.log(err);
        })
    }

    const handleCompletionChange = () => {
        axios.get(`http://localhost:3000/download/completion/${selectedOption}/${singleWeekCompletion._id}/${grade}`, {withCredentials: true})
        .then((response)=>{
            alert(response.data.message);
            refreshTable();

        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <>
            {isDownloading && <div style={{ position: "absolute", top: "25vh", left: "25vw", height: "150px", width: "150px", zIndex: "5" }} className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
            <div className={styles.download_popup}>
                <div className={styles.closeIcon}>
                    <IoMdCloseCircleOutline size={30} onClick={() => selectPopupContent({})} />
                </div>

                <div className={styles.popup_cont}>
                    <h5 className={styles.popup_heading}>{popup_content.subject}-{popup_content.topic}</h5>
                    <div className={styles.popup_content}>
                        <ul style={{ margin: "30px" }}>
                            <li style={{ margin: "10px" }} onClick={() => downloadMaterial(popup_content.download[0], popup_content.topic)}>
                                teaching content:
                                <MdDownload size={30} />
                            </li>
                            <li style={{ margin: "10px" }}>
                                test paper:
                                <MdDownload size={30} />
                            </li>
                        </ul>
                        <label htmlFor="project-status">Project Status:</label>
                        <select id="project-status" value={selectedOption} onChange={handleChange}>
                            <option value="">Select an option</option>
                            <option value='0'>Start Project</option>
                            <option value='1'>Mark Complete</option>
                            <option value='2'>Having Problems</option>
                        </select>
                        <button onClick={handleCompletionChange}>Submit change</button>
                    </div>
                </div>
            </div>
        </>
    )
}