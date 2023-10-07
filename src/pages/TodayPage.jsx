import { useDispatch, useSelector } from 'react-redux';
import classes from './styles/TodayPage.module.css'
import {AiOutlineStar} from 'react-icons/ai'
import { useEffect,useState } from 'react';
import { fetchTasks } from '../store/tasks-actions';
import { removeTask } from '../store/tasks-actions';
import { useLocation } from 'react-router-dom';
function Today()
{
    const dispatch = useDispatch()
    let tasks = useSelector(state=>state.tasks.tasks)
    const isNavOpened = useSelector(state=>state.resp.wasClicked)
    useEffect(()=>
    {
        dispatch(fetchTasks(localStorage.getItem('uid')))
        console.log(tasks)
    },[])
    

    const todayTasks = tasks.filter(task=>
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
     function handleRemoving(e) {
        e.preventDefault();
        console.log(e.target.id);
        dispatch(removeTask(e.target.id,localStorage.getItem('uid')));
    }
    return (
        <div className={classes.wrapper}>
        <h1>Today</h1>
        {todayTasks.length===0?<h2 className={classes.noTasks}>No tasks for today</h2>:
        <ul className={classes.list}>

            {todayTasks.map(day=>
                {
                    return <li key ={day.id} id={day.id}  className={classes.element}>
                        <button id={day.id} onClick={handleRemoving}>Done</button>
                        <h2>{day.name}</h2>
                        <p>Priority of task: {day.priority}</p>
                        </li>
                })}
        </ul>
        }
        </div>
    )
}

export default Today;