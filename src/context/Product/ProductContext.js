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
      pro_imagen: 'https://scontent.fsyq5-1.fna.fbcdn.net/v/t39.30808-6/287236672_650810643417417_7919520871958385693_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=730e14&_nc_ohc=nZBqkXAn-SYAX8RahaQ&_nc_ht=scontent.fsyq5-1.fna&oh=00_AfD3t4PZZ0oJ9M5_gDxIYXa7qXkXuTNaLF9nbuxehUVl6Q&oe=64078F10',
      pro_valor_venta: 8,
      pro_unidades: 1,
      pro_existencias: 10,
      pro_descripcion: 'Tarta de chocolate con crema y fresas'
    },
    {
      pro_id: 2,
      pro_nombre: 'Pastel de zanahoria',
      pro_imagen: 'https://scontent.fsyq5-1.fna.fbcdn.net/v/t39.30808-6/328478541_914914639681528_264814135815527126_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=730e14&_nc_ohc=f8CNdPCI1f0AX8VOqX-&_nc_ht=scontent.fsyq5-1.fna&oh=00_AfApwcrqSIfRbzJs8mKEMmfCWnov1U8yK2rQSeqrgS0jjA&oe=64072207',
      pro_valor_venta: 7,
      pro_unidades: 1,
      pro_existencias: 15,
      pro_descripcion: 'Pastel de zanahoria con glaseado de queso crema'
    },
    {
      pro_id: 3,
      pro_nombre: 'Panes con leche condensada',
      pro_imagen: 'https://scontent.fsyq5-1.fna.fbcdn.net/v/t39.30808-6/329187206_959030928416800_2074777743088327964_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_ohc=Z3UcaTDmsYEAX9dBVSu&_nc_ht=scontent.fsyq5-1.fna&oh=00_AfAHCMWMYYuLmenvnQ42mgVj_NruHRvm-rY7vhTjf2tSoA&oe=6408420F',
      pro_valor_venta: 5,
      pro_unidades: 6,
      pro_existencias: 0,
      pro_descripcion: 'Galletas de mantequilla con chips de chocolate'
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
