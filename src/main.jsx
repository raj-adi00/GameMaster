import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import WelcomePage from './Components/WelcomePage.jsx'
import Home from './Components/Home.jsx'
import Services from './Components/Services.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import LeaderBoard from './Components/LeaderBoard.jsx'
import User from './Components/User.jsx'
// console.log(store)
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (<WelcomePage />),
      },
      {
        path: "/home",
        element: (<Home />),
      },
      {
        path: "/services",
        element: (<Services />),
      },{
        path:"/leaderboard",
        element:(<LeaderBoard />)
      },{
        path:"/user/:id",
        element:(<User/>)
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
