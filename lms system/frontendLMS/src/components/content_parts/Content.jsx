import { useEffect, useState } from "react"
import axios from 'axios'
import Grade from "./Grade"
import styles from '../css_modules/Content.module.css';

export default function Content() {
    const [selectedGrade, setSelectedGrade] = useState("Grade_4");
    const [grade_data, setGradeData]=useState([]);
    const handleGradeChange = (event) => {
        setSelectedGrade(event.target.value);
    };

    useEffect(()=>{
        const getData= ()=>{
            axios.get(`http://localhost:3000/download/downloadInfo/${selectedGrade}`, {withCredentials: true}).then((response)=>setGradeData(response.data[0].weeks)).catch((err)=>{
                console.log(err);
            })
        }

        getData();
    }, [selectedGrade]);

    return (
        <>
            <div className={styles.main_cont}>
                <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand">{selectedGrade}</a>
                        <select className={styles.selection_list} value={selectedGrade} onChange={handleGradeChange}>
                            <option value="Grade_4">Grade 4</option>
                            <option value="Grade_5">Grade 5</option>
                            <option value="Grade_6">Grade 6</option>
                            <option value="Grade_7">Grade 7</option>
                            <option value="Grade_8">Grade 8</option>
                            <option value="Grade_9">Grade 9</option>
                            <option value="Grade_10">Grade 10</option>
                            <option value="Grade_11">Grade 11</option>
                            <option value="Grade_12">Grade 12</option>
                        </select>
                    </div>
                </nav>
                <div className={styles.content_cont}>
                    <Grade grade_data={grade_data} grade={selectedGrade}/>
                </div>
            </div>
        </>
    )
}