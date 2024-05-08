import { useContext, useState } from "react"
import Post from "./Post"
import { PostStore } from '../../store/backend-store';
import styles from '../css_modules/Posts.module.css';

export default function Posts() {
    const { postData } = useContext(PostStore);

    const [selected, selectTab] = useState('mechatronics')
    return (
        <>
            <div style={{width: '100%'}}>
                <div className={styles.heading}>
                    <button className={`${selected === 'mechatronics' ? styles.active : ''}`} onClick={() => selectTab("mechatronics")}>Mechatronics</button>
                    <button className={`${selected === 'software' ? styles.active : ''}`} onClick={() => selectTab("software")}>Software</button>
                </div>
                <div className={styles.post_cont}>
                    {
                        postData.map((postObj) => {
                            if (postObj.post && postObj.post.topic === selected) {
                                return <Post key={postObj.post._id} postObj={postObj} />;
                            }
                            return null;
                        })
                    }
                </div>
            </div>
        </>
    )
}