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
import PaginaPrincipal from "./routes/paginaPrincipal";
import ProductoVentaPedido from "./routes/productoVentaPedido";
import PerfilUsuario from "./routes/perfilUsuario";
import LoginCliente from './routes/loginCliente';
import RegistrarCliente from "./routes/registrarCliente";
import Nosotros from "./routes/nosotros";
import Contacto from "./routes/contacto";
import BuscarCliente from './routes/buscarCliente';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/LoginCliente" element={<LoginCliente />} />
        <Route path="Register" element={<Register />} />
        <Route path="/Home" element={<Home />} >
          <Route path="RegisterMaterial" element={<RegisterMaterial />} />
          <Route path="BuscarMaterial" element={<BuscarMaterial />} />
          <Route path="BuscarCliente" element={<BuscarCliente />} />
        </Route>
        <Route path="/PaginaPrincipal" element={<PaginaPrincipal />} />
        <Route path="ProductoVentaPedido" element={<ProductoVentaPedido />} />
        <Route path="PerfilUsuario" element={<PerfilUsuario />} />
        <Route path="RegistrarCliente" element={<RegistrarCliente />} />
        <Route path="Nosotros" element={<Nosotros />} />
        <Route path="Contacto" element={<Contacto />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
