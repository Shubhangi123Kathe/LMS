import Authentication from './components/Authentication';
import axios from 'axios';
import './App.css';
import Dashboard from './components/Dashboard';
import PostProvider from './store/backend-store';
import { useEffect, useState } from 'react';

export default function App() {
  const [status, setStatus] = useState(false);
  const [user, setUser]=useState({});

  useEffect(() => {
    const checkLogin = () => {
      axios.get("http://localhost:3000/user/isLogged", { withCredentials: true }).then((response) => {
        if (response.data.status) {
          setStatus(true)
          axios.get("http://localhost:3000/user/userProfile", {withCredentials: true}).then((response)=>{
            setUser(response.data);
          }).catch((err)=>{
            console.log(err)
          })
        }
      }).catch((err) => {
        console.log(err);
      })
    }
    checkLogin();
  }, [])


  return (
    <>
      <PostProvider>
        {!status ? <Authentication /> : <Dashboard user={user}/>}
      </PostProvider>
    </>
  )
}