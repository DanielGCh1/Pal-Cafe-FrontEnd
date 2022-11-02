import React from 'react';
import {
  ChakraProvider,
  theme
} from '@chakra-ui/react';
import Login from './routes/login';
import { Routes, Route } from "react-router-dom";
import Register from "./routes/register";
import './css/styled.css'
import Home from './routes/home';
import RegisterMaterial from './routes/registerMaterial';
import BuscarMaterial from './routes/buscarMaterial';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="Register" element={<Register />} />
        <Route path="/Home" element={<Home />} >
          <Route path="RegisterMaterial" element={<RegisterMaterial />} />
          <Route path="BuscarMaterial" element={<BuscarMaterial />} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
