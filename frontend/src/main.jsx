import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Signin from './pages/Signin.jsx'
import Home from './pages/home.jsx'
import Practice from './pages/practice.jsx'
import Play from './pages/Play.jsx'
const router  = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/login",
        element:<LoginPage/>
      },
      {
        path:"/signin",
        element:<Signin/>
      },
        {
        path:"/practice",
        element:<Practice/>
      },{
        path:"/",
        element:<Home/>
      },{
        path:"/play",
        element:<Play/>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
