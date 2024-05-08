import { useContext, useRef, useState } from "react"
import { PostStore } from "../../store/backend-store";
import styles from '../css_modules/Posts.module.css'
export default function Suggest() {

    let title = useRef("");
    let body = useRef("");
    let components = useRef("");
    const [option, changeOption] = useState("mechatronics");
    const { addPost } = useContext(PostStore);

    const submitPost = () => {
        let allComponents = components.current.value.split(", ");
        let data = {
            title: title.current.value,
            info: body.current.value,
            topic: option,
            components: allComponents,
        }
        addPost(data);
        alert("successfull")
        title.current.value = ''
        body.current.value = ""
        components.current.value = "";
    }
    return (
        <>
            {/* <img src={suggestImg} alt="s"/> */}
            <form onSubmit={submitPost} className={styles.formContainer}>
                <div>
                    <input
                        type="text"
                        ref={title}
                        className={styles.inputField}
                        placeholder="Enter title of the project"
                    />
                    <textarea
                        type="text"
                        ref={body}
                        className={styles.textareaField}
                        placeholder="Enter details of the project"
                    />
                    <div className={styles.optionsContainer}>
                        <span className={styles.radioLabel}>Mechatronics:</span>
                        <input
                            type="radio"
                            name="option"
                            onClick={() => changeOption('mechatronics')}
                            className={styles.radioInput}
                        />
                        <span className={styles.radioLabel}>Software:</span>
                        <input
                            type="radio"
                            name="option"
                            onClick={() => changeOption('software')}
                            className={styles.radioInput}
                        />
                    </div>
                    <input
                        type="text"
                        ref={components}
                        className={styles.inputField}
                        placeholder="Components separated by comma"
                    />
                    <input type="submit" className={styles.submitButton} />
                </div>
            </form>
        </>
    )
}