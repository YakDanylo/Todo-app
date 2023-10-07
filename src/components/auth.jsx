import { redirect } from "react-router-dom"

export function getAuthToken()
{
    const token = localStorage.getItem('token')
    return token
}

export function checkAuthLoader()
{
    const token = getAuthToken()
    if(!token)
    {
       return  redirect('/auth')
    }
    else 
    {
        return null
    }
}

export function isAuth()
{
    const token = getAuthToken()
    if(!token)
    {
       return  true;
    }
    else 
    {
        return false
    }
}