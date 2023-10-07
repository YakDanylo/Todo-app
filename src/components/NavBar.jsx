import { NavLink, Outlet, redirect } from "react-router-dom";
import classes from './NavBar.module.css'
import {BsListCheck} from 'react-icons/bs'
import {BiSolidRightArrowSquare} from 'react-icons/bi'
import {AiFillCalendar} from 'react-icons/ai'
import {AiOutlineSearch} from 'react-icons/ai'
import {useDispatch, useSelector} from 'react-redux'
import {removeTask} from '../store/tasks-actions'
import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import {FaBars} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'
import { respActions } from "../store/resp-slice";
function NavBar()
{
    const dispatch = useDispatch()
    let allTasks= useSelector(state=>state.tasks.tasks)
    const task = useSelector(state=>Object.entries(state.tasks.tasks)[0])
    const showHam = useSelector(state=>state.resp.wasClicked)
    const tasks = allTasks.filter(task=>
        {
            let today = new Date()
            let taskDate = new Date(task.date)
            today = today.getDay()+" "+today.getMonth()
            taskDate = taskDate.getDay()+" "+taskDate.getMonth()
            if(today==taskDate)
            {
                return task
            }
        })
        const todayTasksCounter = tasks.length;
        
        const upcoming = allTasks.filter(task=>
        {
            const temp = new Date();
            const nextThreeDays = new Date(temp.setDate(temp.getDate() + 3));  
            const taskDate = new Date(task.date)
            const today = new Date()
            console.log()
            if(taskDate.getTime()<nextThreeDays.getTime()&&taskDate.getTime()>today.getTime())   
            {
                return task
            }    
        })
        const upcomingTasksCounter = upcoming.length;
        function logOut()
        {
            localStorage.clear()
            window.location.reload();
        }
        function handleHamburger()
        {
            dispatch(respActions.wasClicked())
        }
    return(
        <>
        {showHam ? <div className={classes.burgerButton} onClick={handleHamburger}>{showHam?<div><FaBars/></div>:<div><AiOutlineClose/></div>}</div> :
         <aside className={classes.aside}>
         <div className={classes.search}>
             <AiOutlineSearch/>
             <input type="text" placeholder="Search" />
         </div>
         <div className={classes.burgerButton} onClick={handleHamburger}>{showHam?<div><FaBars/></div>:<div><AiOutlineClose/></div>}</div>
         <ul className={classes.list}>
             <li className={classes.li}><NavLink to="/upcoming" className={classes.nav} ><div className={classes.element}><BiSolidRightArrowSquare className={classes.icon}/><p>Upcoming </p><p>{upcomingTasksCounter}</p></div></NavLink> </li>
             <li className={classes.li}><NavLink  to="/today" className={classes.nav}><div className={classes.element}><BsListCheck className={classes.icon}/><p>Today</p><p>{todayTasksCounter}</p></div></NavLink> </li>
             <li className={classes.li}><NavLink  to="/calendar" className={classes.nav}><div className={classes.calendar}><AiFillCalendar className={classes.icon}/><p>Calendar</p></div></NavLink></li>
         </ul>
         <div className={classes.logout}><button onClick={logOut}>log out</button></div>
     </aside>
        }
       
        <Outlet/>
        </>

     

    )
}

export default NavBar;