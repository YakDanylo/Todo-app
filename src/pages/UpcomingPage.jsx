import classes from './styles/UpcomingPage.module.css'
import { useDispatch,useSelector } from 'react-redux'
import { fetchTasks,removeTask } from '../store/tasks-actions'
import { useEffect } from 'react'
function Upcoming()
{

    const dispatch = useDispatch()
    const tasks = useSelector(state=>state.tasks.tasks)
    useEffect(()=>
    {
        dispatch(fetchTasks())
    },[])

    const upcoming = tasks.filter(task=>
    {
        const temp = new Date();
        const nextThreeDays = new Date(temp.setDate(temp.getDate() + 3));  
        const taskDate = new Date(task.date)
        const today = new Date()
        if(taskDate.getTime()<nextThreeDays.getTime()&&taskDate.getTime()>today.getTime())   
        {
            return task
        }    
    })
     function handleRemoving(e) {
        e.preventDefault();
        dispatch(removeTask(e.target.id,localStorage.getItem('uid')));
    }

    return (
        <div className={classes.wrapper}>
        <h1>Upcoming tasks</h1>
        {upcoming.length===0?<h2 style={{textAlign:"center"}}>There is no upcoming tasks</h2>
        :
        <ul className={classes.list}>
            {upcoming.map(day=>
                {
                    console.log(day)
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

export default Upcoming