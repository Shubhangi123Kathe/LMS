import Banner from '../assets/homeBanner.jpg'
import styles from './css_modules/HomeStyle.module.css'
import DateAndTime from './DateAndTime';


export default function Home({user}) {
    return (
        <>
            <main role="main">
                    <div className={styles.body_cont}>
                        <img src={Banner} alt="banner" width={"100%"} style={{margin: 0, padding: 0}}/>
                        <div className={styles.component_cont}>
                            <DateAndTime/>
                            <h1>Welcome back {user.name}</h1>
                            <ul>
                                <li>Education: {user.education}</li>
                                <li>Projects: 5</li>
                                <li>Role: {user.role}</li>
                            </ul>
                        </div>
                    </div>
            </main>
        </>
    )
}