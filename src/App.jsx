import { useEffect, useState } from 'react'
import './App.css'
import WelcomePage from './Components/WelcomePage'
import { Outlet } from 'react-router'
import Footer from './Components/Footer'
import authentication from './Appwrite/auth'
import service from './Appwrite/service'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import Loader from './Components/Loader'
import { userenter } from './store/authslice'
function App() {
  const [loading, setloading] = useState(true)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    authentication.getCurrentUser()
      .then((res) => {
        service.getCurrentUserData(res.email)
          .then((val) => {
            dispatch(userenter(val));
            navigate('/home');
            setloading(false);
          })
          .catch((err) => {
            console.log(err);
            setloading(false);
          })
      }).catch((err) => {
        console.log(err);
        setloading(false);
      })
  }, [])
  if (loading)
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
      <Loader />
    </div>)
  else
    return (
      <div>
        <Outlet />
        <Footer />
      </div>
    )
}

export default App
