import {createSlice} from '@reduxjs/toolkit'
const tasksSlice = createSlice({
    name:'tasks',
    initialState:{tasks:[],totalTasks:0},
    reducers:{
        addTask(state,action)
        {   
            const arr = Object.entries(state.tasks).map(item=>
                {
                    return item[1]
                })
            state.tasks=[...arr,action.payload.task];
            state.totalTasks = +state.totalTasks+1
        },
        replaceTasks(state,action)
        {
            state.totalTasks = +action.payload.totalTasks;
            state.tasks = action.payload.tasks
        },
        removeTask(state,action)
        {
            const id = action.payload
            const arr = Object.entries(state.tasks)
            state.tasks = arr.filter(task=>
                {
                    if(task[0]!==id)
                    {
                        return task
                    }
                })
            state.totalTasks = state.totalTasks-1
        }
        

    }
})

export default tasksSlice
export const taskActions = tasksSlice.actions