import { RiAdminFill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi";
import { FaProjectDiagram, FaTachometerAlt } from "react-icons/fa";
import { IoMdContacts } from "react-icons/io";
import logoImage from '../assets/logoicon.png';
import Home from "./Home";
import Content from "./content_parts/Content";
import WorkStatus from "./WorkStatus";
import Suggest from './post_parts/Suggest'
import Admin_Panel from "./admin_parts/Admin_Panel";
import Contacts from "./Contacts";
import { useEffect, useState } from "react";
import Posts from "./post_parts/Posts";
import axios from "axios";

export default function Dashboard({ user }) {

    const [isAdmin, setAdmin]=useState(false);
    
    useEffect(()=>{
        const adminCheck=()=>{
            axios.get("http://localhost:3000/user/isAdmin", { withCredentials: true }).then((response) => {
            if(response.data.message==1){
                setAdmin(true);
            }
            else{
                setAdmin(false);
            }
        }).catch((err) => {
            setAdmin(false)
            console.log(err);
        })
        }

        adminCheck();
    }, [])

    const [tab, changeTab] = useState("Home");

    const signout = () => {
        axios.get("http://localhost:3000/user/logout", { withCredentials: true }).then((response) => {
            alert(response.data.message);
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <>
            <div className="main-cont effected-by-dark-mode">
                <div className="d-flex flex-column flex-shrink-0 bg-body-tertiary" style={{ width: '4.5rem', height: '100vh' }}>
                    <a onClick={() => changeTab('Home')} className="d-block p-3 link-body-emphasis text-decoration-none" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
                        <img src={logoImage} height={40} alt="logo" className="LOGO" />
                        <span className="visually-hidden">Icon-only</span>
                    </a>
                    <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                        <li className="nav-item" onClick={() => changeTab('Posts')}>
                            <a href="#" className={`nav-link py-3 border-bottom rounded-0 ${tab == 'Posts' && 'active'}`} aria-current="page" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Home" data-bs-original-title="Home">
                                <MdDashboard size={24} />
                            </a>
                        </li>
                        <li onClick={() => changeTab('syllabus')}>
                            <a href="#" className={`nav-link py-3 border-bottom rounded-0 ${tab == 'syllabus' && 'active'}`} data-bs-placement="right" aria-label="Dashboard" data-bs-original-title="Dashboard">
                                <GiBookshelf size={24} />
                            </a>
                        </li>
                        <li onClick={() => changeTab('TStatus')}>
                            <a href="#" className={`nav-link py-3 border-bottom rounded-0 ${tab == 'TStatus' && 'active'}`} data-bs-placement="right" aria-label="Products" data-bs-original-title="Products">
                                <FaTachometerAlt size={24} />
                            </a>
                        </li>
                        <li onClick={() => changeTab('contacts')}>
                            <a href="#" className={`nav-link py-3 border-bottom rounded-0 ${tab == 'contacts' && 'active'}`} data-bs-placement="right" aria-label="Customers" data-bs-original-title="Customers">
                                <IoMdContacts size={24} />
                            </a>
                        </li>
                    </ul>
                    <div className="dropdown border-top">
                        <a href="#" className="d-flex align-items-center justify-content-center p-3 link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <RiAdminFill size={60} />
                        </a>
                        <ul className="dropdown-menu text-small shadow">
                            {
                                isAdmin && <>
                                <li style={{ cursor: "pointer" }}><a className="dropdown-item" onClick={() => changeTab('admin_panel')}>Admin Controls</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                </>
                            }
                        
                            <li style={{ cursor: "pointer" }}><a className="dropdown-item" onClick={() => changeTab('suggest')}>Suggest</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li style={{ cursor: "pointer" }}><a className="dropdown-item" onClick={signout}>Sign out</a></li>
                        </ul>
                    </div>
                </div>
                <div className="sub-cont">
                    {tab == 'Home' && <Home user={user} />}
                    {tab == 'Posts' && <Posts />}
                    {tab == 'syllabus' && <Content />}
                    {tab == 'TStatus' && <WorkStatus />}
                    {tab == 'contacts' && <Contacts />}
                    {tab == 'suggest' && <Suggest />}
                    {tab=='admin_panel' && <Admin_Panel/>}
                </div>
            </div>
        </>
    )
}