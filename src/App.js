import { RouterProvider } from "react-router-dom";
import {router} from './components/Routing'
import { ChakraProvider } from '@chakra-ui/react'
import './App.css'
function App() {
  return (
    <ChakraProvider>
    <RouterProvider  router={router}/>
    </ChakraProvider>
  );
}

export default App;
