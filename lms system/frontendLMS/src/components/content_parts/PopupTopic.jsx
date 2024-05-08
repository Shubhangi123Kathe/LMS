import styles from '../css_modules/Content.module.css';
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function PopupTopic({popup_topic, selectPopupTopic}){
    return (
        <>
            <div className={styles.popup_topic}>
                <div className={styles.closeIcon}>
                <IoMdCloseCircleOutline size={30} onClick={()=>selectPopupTopic({})}/>
                </div>

                <div className={styles.popup_cont}>
                    <h5 className={styles.popup_heading}>{popup_topic.subject} - {popup_topic.topic}</h5>
                    <p className={styles.popup_content}>
                        {popup_topic.info}
                    </p>
                </div>
            </div>
        </>
    )
}