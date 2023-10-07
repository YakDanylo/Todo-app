import NavBar from "../components/NavBar";
import { NavLink, redirect } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { uiActions } from "../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import AuthPage from '../pages/AuthPage'
import { isAuth } from "../components/auth";
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
  } from '@chakra-ui/react'
import { useEffect, useState } from "react";
function Root()
{
    const [isAuthorised, setIsAuthorised] = useState(null)
    const dispatch = useDispatch()
    const token = useSelector(state=>state.auth.token)
    function showModal()
    {
        dispatch(uiActions.showModal())
    }
    
    useEffect(()=>
    {
        setIsAuthorised(isAuth())
    },[token])
        
    return(
        <>
        {isAuthorised?<AuthPage/>:
        <div>
            <NavBar/>
            <div style={{position:"fixed", right:'15px', top:'20px'}}>
                <NavLink  to="/addTask" ><div onClick={showModal} style={{backgroundColor:"teal", color:"white", padding:'10px',borderRadius:'10px'}}>Add task</div></NavLink>
            </div>
        </div>
        }
        
       
        </>
    )
}

export default Root;