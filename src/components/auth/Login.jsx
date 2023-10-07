import React, {useState} from 'react'
import classes from './Login.module.css'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../firebase'
import { authActions } from '../../store/auth-slice';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
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

const Login = (props) => {
    const [userPassword, setUserPassword] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function logIn(e)
    {
        e.preventDefault(e);
        signInWithEmailAndPassword(auth, userEmail, userPassword)
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
        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
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
              onClick={logIn}
              bg={'teal.400'}
              color={'white'}
              _hover={{
                bg: 'teal.500',
              }}>
              Sign in
            </Button>
          </Stack>
          <Stack pt={6}>
              <Text align={'center'}>
               Don't have account yet? <Button color={'teal.400'} onClick={e=>props.mode('signup')}>Sign up</Button>
              </Text>
            </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
    )
}

export default Login