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
import { ProductProvider } from './context/Product/ProductContext';
import CreacionProductos from './routes/CreacionProductos';
import { EmployeeProvider } from './context/Employee/EmployeeContext';
import { PromotionProvider } from './context/Promotion/PromotionContext';
import LoginCustomer from './routes/loginCustomer';
import RegistrarCliente from "./routes/registrarCliente";
import Nosotros from "./routes/nosotros";
import Contacto from "./routes/contacto";
import { IngredientProvider } from './context/Ingredients/IngredientContext';
import { ClienteProvider } from './context/Cliente/ClienteContext';
import { ProductosValoresProvider } from './context/Product/ProductosValoresContext';
import PalCafe from './routes/PalCafe';
import PruebasChatGpt from './routes/PruebasChatGpt';
import AdministracionEmpleados from './routes/AdministracionEmpleados';
import RegistrarEmpleados from './routes/RegistrarEmpleados';
import CreacionPromociones from './routes/CreacionPromociones';
import { CustomerProvider } from './context/Customer/CustomerContext';
import CarritoDeCompra from './routes/CarritoDeCompra';
import HistorialProduccion from './routes/HistorialProduccion';
import PromotionsForm from './routes/promociones';
import LookPromotions from './routes/LookPromotions';
import EditPromocion from './routes/editPromotion';
import EditEmployee from './routes/editarEmpleado';
import LookClientes from './routes/LookClientes';
import EditClient from './routes/EditClient';
import VerEstadisticas from './routes/VerEstadisticas';

function App() {

  return (
    <ChakraProvider theme={theme}>
      <CustomerProvider>
        <ProductProvider>
          <ProductosValoresProvider>
            <ClienteProvider>
              <IngredientProvider>
                <EmployeeProvider>
                  <PromotionProvider>
                    <Routes>
                      <Route path="/" element={<Login />} />
                      <Route path="Register" element={<Register />} />
                      <Route path="/Home" element={<Home />}>
                        <Route path="RegisterMaterial" element={<RegisterMaterial />} />
                        <Route path="BuscarMaterial" element={<BuscarMaterial />} />
                        <Route
                          path="CreacionProductos"
                          element={<CreacionProductos />}
                        />
                        <Route
                          path="AdministracionEmpleados"
                          element={<AdministracionEmpleados />}
                        />
                        <Route
                          path="EditarEmpleados/:id"
                          element={<EditEmployee />}
                        />
                        <Route
                          path="RegistrarEmpleados"
                          element={<RegistrarEmpleados />}
                        />
                        <Route
                          path="CreacionPromociones"
                          element={<CreacionPromociones />}
                        />
                        <Route path="BuscarClientes" element={<LookClientes />} />
                        <Route path="EditarClientes/:id" element={<EditClient />} />
                        <Route path="HistorialProduccion" element={<HistorialProduccion />} />
                        <Route path="CrearPromociones" element={<PromotionsForm />} />
                        <Route path="VerEstadisticas" element={<VerEstadisticas />} />
                        <Route path="BuscarPromociones" element={<LookPromotions />} />
                        <Route path="EditarPromociones/:id" element={<EditPromocion />} />
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
          </ProductosValoresProvider>
        </ProductProvider>
      </CustomerProvider>
    </ChakraProvider>
  );
}

export default App;
