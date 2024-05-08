import { MdOutlineConnectWithoutContact, MdOutlineWork } from "react-icons/md";
import styles from './css_modules/Contact.module.css'
import { useEffect, useState } from "react";
import axios from "axios";
export default function Contacts() {

    const [contacts, setContacts]=useState([]);

    useEffect(()=>{
        const getContacts=()=>{
            axios.get("http://localhost:3000/user/getMobileNumbers", {withCredentials: true}).then((response)=>{
                setContacts(response.data);
            }).catch((err)=>{
                console.log("found error")
            })
        }

        getContacts();
    }, [])
    let contactDetails = [
        {
            name: "Nitesh Sharma",
            work: "works as a qwing instructor",
            phone: +919975822798,
            email: 'nitesh@gmail.com'
        },
        {
            name: "Nitesh Sharma",
            work: "works as a qwing instructor",
            phone: +919975822798,
            email: 'nitesh@gmail.com'
        },
        {
            name: "Nitesh Sharma",
            work: "works as a qwing instructor",
            phone: +919975822798,
            email: 'nitesh@gmail.com'
        },
        {
            name: "Nitesh Sharma",
            work: "works as a qwing instructor",
            phone: +919975822798,
            email: 'nitesh@gmail.com'
        },
        {
            name: "Nitesh Sharma",
            work: "works as a qwing instructor",
            phone: +919975822798,
            email: 'nitesh@gmail.com'
        },
        {
            name: "Nitesh Sharma",
            work: "works as a qwing instructor",
            phone: +919975822798,
            email: 'nitesh@gmail.com'
        }
    ]
    return (
        <>
            <div className={styles.container}>
                <div className={styles.logo}>
                <MdOutlineConnectWithoutContact size={"10vh"} />
                </div>

                <div className={styles.contacts}>
                    {
                        contacts.map((contact) => {
                            return (
                                <div className={styles.card} key={contact.name}>
                                    <MdOutlineWork size={40} />
                                    <div className={styles.info}>
                                        <h3 className={styles.title}>{contact.name}</h3>
                                        <p className={styles.post_info}>{contact.role}</p>
                                    </div>
                                    <div className={styles.contact_link}>
                                        <a href={`tel:${contact.mobileNumber}`}><abbr title={contact.mobileNumber}>Call</abbr></a>
                                        <a href={`mailto:${contact.email}`}>
                                        <abbr title={contact.email}>Mail</abbr>
                                        </a>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}