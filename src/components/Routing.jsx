import {createBrowserRouter} from 'react-router-dom'
import Root from '../pages/RootPage'
import Today from '../pages/TodayPage'
import AddTask from '../pages/AddTaskPage'
import Upcoming from '../pages/UpcomingPage'
import Calendar from '../pages/CalendarPage'
import AuthPage from '../pages/AuthPage'
import { checkAuthLoader } from './auth'
export const router = createBrowserRouter([
    {path:'/', element:<Root/>, children:[
        {path:'/today', element:<Today/>, loader:checkAuthLoader},
        {path:'/addTask', element:<AddTask/>},
        {path:'/upcoming', element:<Upcoming />,loader:checkAuthLoader},
        {path:'/calendar', element:<Calendar/>,loader:checkAuthLoader},
        {path:'/auth', element: <AuthPage/>}
    ]}
])