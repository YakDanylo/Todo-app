import {taskActions} from './tasks-slice'
export const addTask = (task, uid)=>
{
    return async (dispatch) =>
    {
        const addingTask = async()=>
        {
            const response = await fetch(`https://todoapp-870bc-default-rtdb.europe-west1.firebasedatabase.app/${uid}/tasks.json`,{
                method:"POST",
                body:JSON.stringify({name:task.name,date:task.date, priority:task.priority})
            })

        }
        try{
            console.log("in try, tasks-actions")
            addingTask()
        }
        catch(err){
            console.log("error")
        }
    }
}

export const fetchTasks = (uid)=>
{
    return async (dispatch)=>
    {
        const fetchData = async ()=>{

        const response = await fetch(`https://todoapp-870bc-default-rtdb.europe-west1.firebasedatabase.app/${uid}/tasks.json`)
        if(!response.ok)
        {
            throw new Error("Failed to fetch")
        }
        const data = await response.json()
        return data;
    }
    try{
        const tasksData =  await fetchData();
        let arrTasks = Object.entries(tasksData)
        console.log(arrTasks.length + " length in arr")

        arrTasks = arrTasks.map((task)=>
        {
            return {
                id:task[0],
                ...task[1]
            }
        })
        dispatch(taskActions.replaceTasks({
            tasks:arrTasks || [],
            totalTasks: arrTasks.length
        }))
    }
    catch(err)
    {
        console.log(err)
    }
    
    }  
}

export const removeTask = (taskId,uid) =>
{
    return async (dispatch) =>
    {
        const removingData =  async()=>
        {
            await fetch(`https://todoapp-870bc-default-rtdb.europe-west1.firebasedatabase.app/${uid}/tasks/${taskId}.json`,
            {
                method:"DELETE",
            })
            
        }
        const fetchData = async ()=>
        {
            const response = await fetch(`https://todoapp-870bc-default-rtdb.europe-west1.firebasedatabase.app/${uid}/tasks.json`)
            const data = await response.json()
            return data;
        }
        try{
            await removingData()
            // dispatch(taskActions.removeTask(taskId))
            const tasksData =  await fetchData();
            let arrTasks = Object.entries(tasksData)
            console.log(arrTasks.length + " length in arr remove data func")
            if(arrTasks.length===0)
            {
                console.log("No elements in remove func")
                dispatch(taskActions.replaceTasks({
                    tasks: [],
                    totalTasks: 0
                }))
            }
            else 
            {
                arrTasks = arrTasks.map((task)=>
                {
                    return {
                        id:task[0],
                        ...task[1]
                    }
                })
            }
            dispatch(taskActions.replaceTasks({
                tasks:arrTasks,
                totalTasks: arrTasks.length,
            }))
            
            
        }
        catch(error){
            console.log(error)
        }
        
    }
}