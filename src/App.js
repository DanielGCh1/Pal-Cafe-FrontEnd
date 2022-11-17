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
import CrearReseta from './routes/CrearReseta';
import { ProductProvider } from './context/Product/ProductContext';
import CreacionProductos from './routes/CreacionProductos';
import CreacionEmpleados from './routes/CreacionEmpleados';
import IngredientContext, {
  IngredientProvider,
} from './context/Ingredients/IngredientContext';
import { EmployeeProvider } from './context/Empleados/EmployeeContext';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <IngredientProvider>
        <ProductProvider>
          <EmployeeProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="Register" element={<Register />} />
              <Route path="/Home" element={<Home />}>
                <Route path="RegisterMaterial" element={<RegisterMaterial />} />
                <Route path="BuscarMaterial" element={<BuscarMaterial />} />
                <Route path="CrearReseta" element={<CrearReseta />} />
                <Route
                  path="CreacionProductos"
                  element={<CreacionProductos />}
                />
                <Route
                  path="CreacionEmpleados"
                  element={<CreacionEmpleados />}
                />
              </Route>
              <Route path="/PaginaPrincipal" element={<PaginaPrincipal />} />
              <Route
                path="ProductoVentaPedido"
                element={<ProductoVentaPedido />}
              />
              <Route path="PerfilUsuario" element={<PerfilUsuario />} />
            </Routes>
          </EmployeeProvider>
        </ProductProvider>
      </IngredientProvider>
    </ChakraProvider>
  );
}

export default App;
