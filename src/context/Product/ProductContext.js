import React, { createContext, useState } from 'react';
import axios from 'axios';
import API from '../api';
import { string } from 'yup';

const ProductContext = createContext(null)

const ProductProvider = props => {

  const [products, setProducts] = useState([])
  const [productSelected, setProductSelected] = useState(null)


  const PRODUCTOS_REPOSTERIA = [
    {
      pro_id: 1,
      pro_nombre: 'Tarta de chocolate',
      pro_imagen: 'https://scontent.fsyq5-1.fna.fbcdn.net/v/t39.30808-6/287236672_650810643417417_7919520871958385693_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=730e14&_nc_ohc=h0m6uK1ddyUAX-jAo8U&_nc_ht=scontent.fsyq5-1.fna&oh=00_AfDqciuESpNiOZXGZoEm4jZMiXiHWaeyqZRsleoiWA23Zg&oe=63EDD9D0',
      valor_venta: 8,
      unidades: 1,
      existencias: 10,
      descripcion: 'Tarta de chocolate con crema y fresas'
    },
    {
      pro_id: 2,
      pro_nombre: 'Pastel de zanahoria',
      pro_imagen: 'https://scontent.fsyq5-1.fna.fbcdn.net/v/t39.30808-6/328478541_914914639681528_264814135815527126_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=730e14&_nc_ohc=eVqqDk1KzEgAX8GXR77&_nc_ht=scontent.fsyq5-1.fna&oh=00_AfDSdJ-kclypi3Lft2DyISMaoSXZL2nnTjQ2o5uaL6RN4g&oe=63ED6CC7',
      valor_venta: 7,
      unidades: 1,
      existencias: 15,
      descripcion: 'Pastel de zanahoria con glaseado de queso crema'
    },
    {
      pro_id: 3,
      pro_nombre: 'Panes con leche condensada',
      pro_imagen: 'https://scontent.fsyq5-1.fna.fbcdn.net/v/t39.30808-6/329187206_959030928416800_2074777743088327964_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_ohc=z6puZw-Sg0QAX89DcXq&_nc_ht=scontent.fsyq5-1.fna&oh=00_AfAGF_kh6ROAXKoyZU30X_DX5ebJpCtVVdeLXdlvNE0jvg&oe=63EE8CCF',
      valor_venta: 5,
      unidades: 6,
      existencias: 20,
      descripcion: 'Galletas de mantequilla con chips de chocolate'
    }]

  const getProducts = async () => {
    try {
      const res = await axios.get('/productos/get-all');
      //const res = await axios.get('https://reqres.in/api/users');
      const data = res.data.data;
      setProducts(data);
      console.log("productos que llegan al contex",products);
    } catch (error) {
      console.log("la consulta fallo, procedo a setear unos datos por defecto");
      setProducts(PRODUCTOS_REPOSTERIA);
      console.error(error);
    }
  };

  const getProduct = id => {
    try {
      const product = products.find((product) => {return product.pro_id == id})   
      setProductSelected(product)
    } catch (error) {}
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        productSelected,
        setProducts,
        setProductSelected,
        getProducts,
        getProduct,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export { ProductProvider }
export default ProductContext;
