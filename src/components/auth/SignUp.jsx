import React, {useState} from 'react'
import { Form, useNavigate } from 'react-router-dom'
import classes from './SignUp.module.css'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../firebase'
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link
} from '@chakra-ui/react'
const SignUp = (props) => {
    const [userPassword, setUserPassword] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const dispatch = useDispatch()
    const navigate= useNavigate()
    function SignUp(e)
    {
        e.preventDefault()
        createUserWithEmailAndPassword(auth,userEmail,userPassword)
        .then((userCredentials)=>
        {
          localStorage.setItem('token', userCredentials.user.accessToken)
          localStorage.setItem('uid', userCredentials.user.uid)
          dispatch(authActions.setUser({
            token:userCredentials.user.accessToken
          }))
          navigate('/')
          
        })
        .catch(console.error)
        
    }
  return (
    <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>Sign up your new account</Heading>
      </Stack>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" onChange={e=>setUserEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password"  onChange={e=>setUserPassword(e.target.value)}/>
          </FormControl>
         
          <Stack spacing={10}>
            <Button 
              onClick={SignUp}
              bg={'teal.400'}
              color={'white'}
              _hover={{
                bg: 'teal.500',
              }}>
              Sign up
            </Button>
          </Stack>
          <Stack pt={6}>
              <Text align={'center'}>
               Already have an account? <Button color={'teal.400'} onClick={e=>props.mode('login')}>Sign up</Button>
              </Text>
            </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
  )
}

export default SignUp