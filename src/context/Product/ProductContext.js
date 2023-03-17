import React, { createContext, useState } from 'react';
import axios from 'axios';
import API from '../api';
import { string } from 'yup';

const ProductContext = createContext(null)

const ProductProvider = props => {

  const [products, setProducts] = useState([])
  const [productSelected, setProductSelected] = useState(null)

// TODO: el id llega como _id, pro_imagenUrl , pro_unidades = pro_cantidad
  const PRODUCTOS_REPOSTERIA = [
    {
      pro_id: 1,
      pro_nombre: 'Tarta de chocolate',
      pro_imagen: 'https://scontent.fsyq5-1.fna.fbcdn.net/v/t39.30808-6/317355634_676639260834555_8494315991040144300_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_ohc=-i87Iz8MPpQAX9DC_Iy&_nc_ht=scontent.fsyq5-1.fna&oh=00_AfAIjxBp5shyHtLMK-cddg6UAM6oFfwoUFZeLYjTqFbkKQ&oe=641A477B',
      pro_valor_venta: 8,
      pro_unidades: 1,
      pro_existencias: 10,
      pro_descripcion: 'Tarta de chocolate con crema y fresas'
    },
    {
      pro_id: 2,
      pro_nombre: 'Pastel de zanahoria',
      pro_imagen: 'https://scontent.fsyq5-1.fna.fbcdn.net/v/t39.30808-6/328478541_914914639681528_264814135815527126_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=730e14&_nc_ohc=IoE-LqSuxdAAX9WPkcc&_nc_ht=scontent.fsyq5-1.fna&oh=00_AfBWWUi4BjBcuVceIff5jBkzTK05ZAfjH4wI52t5u7ZjdQ&oe=6418EE47',
      pro_valor_venta: 7,
      pro_unidades: 1,
      pro_existencias: 15,
      pro_descripcion: 'Pastel de zanahoria con glaseado de queso crema'
    },
    {
      pro_id: 3,
      pro_nombre: 'Panes con leche condensada',
      pro_imagen: 'https://scontent.fsyq5-1.fna.fbcdn.net/v/t39.30808-6/329187206_959030928416800_2074777743088327964_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_ohc=OZ9ta-IvdEYAX8B9j2p&_nc_ht=scontent.fsyq5-1.fna&oh=00_AfC4EKp7O0FbpGQEEgOCTAyYM9mNhQt4io3VRd1oaCcIlg&oe=641A0E4F',
      pro_valor_venta: 5,
      pro_unidades: 6,
      pro_existencias: 0,
      pro_descripcion: 'Galletas de mantequilla con chips de chocolate'
    }]

  const getProducts = async () => {
    try {
      //Obtener todos los productos de la parte del cliente, sin todos los datos
      const res = await axios.get('/api/productos/get-all-homepage');
      //const res = await axios.get('https://reqres.in/api/users');
      const data = res.data;
      setProducts(PRODUCTOS_REPOSTERIA);
      console.log(data)
      //setProducts(data);
      console.log("productos que llegan al contex",products);
    } catch (error) {
      console.log("la consulta fallo, procedo a setear unos datos por defecto");
      setProducts(PRODUCTOS_REPOSTERIA);
      //console.error(error);
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
