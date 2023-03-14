import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Login from './routes/login';
import { Routes, Route } from 'react-router-dom';
import Register from './routes/register';
import './css/styled.css';
import Home from './routes/home';
import CreateIngredient from './routes/CreateIngredient';
import ManageIngredient from './routes/manageIngredient';
import PaginaPrincipal from './routes/paginaPrincipal';
import ProductoVentaPedido from './routes/productoVentaPedido';
import PerfilUsuario from './routes/perfilUsuario';
import { CrearProducto } from './routes/CrearProducto';
import { ProductProvider } from './context/Product/ProductContext';
import { AdmProductProvider } from './context/AdministrativeProduct/AdmProductContext';
import RegistrarProductos from './routes/RegistrarProductos';
import { EmployeeProvider } from './context/Employee/EmployeeContext';
import { PromotionProvider } from './context/Promotion/PromotionContext';
import LoginCustomer from './routes/loginCustomer';
import RegistrarCliente from "./routes/registrarCliente";
import Nosotros from "./routes/nosotros";
import Contacto from "./routes/contacto";
import BuscarCliente from './routes/buscarCliente';
import { IngredientProvider } from './context/Ingredient/IngredientContext';
import { ClienteProvider } from './context/Cliente/ClienteContext';
//import { ProductosValoresProvider } from './context/Product/ProductosValoresContext';


import { useState, useMemo, useEffect } from "react";


import PalCafe from './routes/PalCafe';

import PruebasChatGpt from './routes/PruebasChatGpt';

import AdministracionEmpleados from './routes/AdministracionEmpleados';

import RegistrarEmpleados from './routes/RegistrarEmpleados';
import CreacionPromociones from './routes/CreacionPromociones';

import { CustomerProvider } from './context/Customer/CustomerContext';
import CarritoDeCompra from './routes/CarritoDeCompra';
import HistorialProduccion from './routes/HistorialProduccion';

function App() {

  return (
    <ChakraProvider theme={theme}>
      <CustomerProvider>
        <ProductProvider>
          <AdmProductProvider>
            <ClienteProvider>
              <IngredientProvider>
                <EmployeeProvider>
                  <PromotionProvider>
                    <Routes>
                      <Route path="/" element={<Login />} />
                      <Route path="Register" element={<Register />} />
                      <Route path="/Home" element={<Home />}>
                        <Route path="CrearIngrediente" element={<CreateIngredient />} />
                        <Route path="EditarIngrediente/:id" element={<CreateIngredient />} />

                        <Route path="BuscarIngrediente" element={<ManageIngredient />} />
                        <Route
                          path="RegistrarProductos"
                          element={<RegistrarProductos />}
                        />
                        <Route
                          path="AdministracionEmpleados"
                          element={<AdministracionEmpleados />}
                        />
                        <Route
                          path="RegistrarEmpleados"
                          element={<RegistrarEmpleados />}
                        />
                        <Route
                          path="CreacionPromociones"
                          element={<CreacionPromociones />}
                        />
                        <Route path="BuscarCliente" element={<BuscarCliente />} />

                        <Route path="BuscarCliente" element={<BuscarCliente />} />
                        <Route path="HistorialProduccion" element={<HistorialProduccion />} />

                      </Route>

                      <Route path="/PalCafe" element={<PalCafe />} >
                        <Route path="PaginaPrincipal" element={<PaginaPrincipal />} />
                        <Route
                          path="ProductoVentaPedido/:id"
                          element={<ProductoVentaPedido />}
                        />
                        <Route path="LoginCustomer" element={<LoginCustomer />} />
                        <Route path="PerfilUsuario" element={<PerfilUsuario />} />
                        <Route path="RegistrarCliente" element={<RegistrarCliente />} />
                        <Route path="Nosotros" element={<Nosotros />} />
                        <Route path="Contacto" element={<Contacto />} />
                        <Route path="CarritoDeCompra" element={<CarritoDeCompra />} />
                      </Route>

                      <Route path="PruebasChatGpt" element={<PruebasChatGpt />} />
                    </Routes>
                  </PromotionProvider>
                </EmployeeProvider>
              </IngredientProvider>
            </ClienteProvider>
          </AdmProductProvider>
        </ProductProvider>
      </CustomerProvider>
    </ChakraProvider>
  );
}

export default App;
