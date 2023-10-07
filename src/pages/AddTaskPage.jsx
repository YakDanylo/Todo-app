import { Form, redirect, useNavigate} from "react-router-dom";
import classes from './styles/AddTask.module.css'
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "../store/tasks-slice";
import { useRef, useState } from "react";
import { addTask as loadDataToFirebase } from "../store/tasks-actions";
import { uiActions } from "../store/ui-slice";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
    Radio, 
    RadioGroup,
    Select,
  } from '@chakra-ui/react'
function AddTask()
{
    const dispatch = useDispatch()
    const nameRef = useRef()
    const dateRef = useRef()
    const priorityRef = useRef()
    const [typeOfDay, setTypeOfDay] = useState('today')
    const show = useSelector(state=>state.UI.isModalOpen)
    const navigate = useNavigate()
    const TASK = {
        TODAY:'Today',
        FUTURE:'Future',
    }
    let validityNameStyle='';
    function hideModal()
    {
        dispatch(uiActions.hideModal())
    }
    function addTask()
    {
        if( nameRef.current.value!='')
        {
        if(typeOfDay==='today')
        {
            let date = new Date().toISOString()
            date = date.slice(0,10)
            const todayTask = {
                name:nameRef.current.value,
                date:date,
                priority:priorityRef.current.value
            }
            dispatch(loadDataToFirebase(todayTask,localStorage.getItem('uid')))
            dispatch(taskActions.addTask({task:todayTask}))
            navigate("/today")
        }
        else 
        {
            const otherDayTask = {
                name:nameRef.current.value,
                date:dateRef.current.value,
                priority:priorityRef.current.value
            }
            dispatch(loadDataToFirebase(otherDayTask,localStorage.getItem('uid')))
            dispatch(taskActions.addTask({task:otherDayTask}))
            navigate("/upcoming")
        }
        nameRef.current.value='';
        priorityRef.current.value='';
       
        hideModal()
        
    }
    else 
    {
        validityNameStyle = "validityFail"
    }
    }
    return (
    <Modal isOpen={show} onClose={hideModal}>
        <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add your task</ModalHeader>
                <ModalCloseButton  />
                    <ModalBody>
                        <FormControl>
                            <Input  placeholder='Task name' mb={5} ref={nameRef} />
                             <RadioGroup onChange={setTypeOfDay} mb={5}>
                                <Radio value='today' mr={2}>Today task</Radio>
                                <Radio value='otherDay'>Task for future</Radio>
                            </RadioGroup>
                            {typeOfDay == 'today' ? '': <Input  type="date" mb={5} ref={dateRef}></Input>}
                            <Select placeholder='Select priority' ref={priorityRef} >
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                            </Select>
                        </FormControl>
                    </ModalBody>

                <ModalFooter>
                    <Button colorScheme='teal' mr={3} onClick={addTask} >
                        Add task
                    </Button>
                 </ModalFooter>
            </ModalContent>
    </Modal>
    )
}

export default AddTask;