import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Login from './routes/login';
import { Routes, Route } from 'react-router-dom';
import Register from './routes/register';
import './css/styled.css';
import Home from './routes/home';
import RegisterMaterial from './routes/registerMaterial';
import BuscarMaterial from './routes/buscarMaterial';
import PaginaPrincipal from './routes/paginaPrincipal';
import ProductoVentaPedido from './routes/productoVentaPedido';
import PerfilUsuario from './routes/perfilUsuario';
import { CrearProducto } from './routes/CrearProducto';
import { ProductProvider } from './context/Product/ProductContext';
import CreacionProductos from './routes/CreacionProductos';
import AdministracionEmpleados from './routes/AdministracionEmpleados';
import { EmployeeProvider } from './context/Employee/EmployeeContext';
import { PromotionProvider } from './context/Promotion/PromotionContext';
import CreacionPromociones from './routes/CreacionPromociones';
import HistorialProduccion from './routes/HistorialProduccion';
import RegistrarEmpleados from './routes/RegistrarEmpleados';

function App() {
  return (
    <ChakraProvider theme={theme}>
        <ProductProvider>
          <EmployeeProvider>
            <PromotionProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="Register" element={<Register />} />
              <Route path="/Home" element={<Home />}>
                <Route path="RegisterMaterial" element={<RegisterMaterial />} />
                <Route path="BuscarMaterial" element={<BuscarMaterial />} />
                <Route path="HistorialProduccion" element={<HistorialProduccion />} />
                <Route
                  path="CreacionProductos"
                  element={<CreacionProductos />}
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
              </Route>
              <Route path="/PaginaPrincipal" element={<PaginaPrincipal />} />
              <Route
                path="ProductoVentaPedido"
                element={<ProductoVentaPedido />}
              />
              <Route path="PerfilUsuario" element={<PerfilUsuario />} />
            </Routes>
            </PromotionProvider>
          </EmployeeProvider>
        </ProductProvider>
    </ChakraProvider>
  );
}

export default App;
