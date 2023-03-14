import React, { createContext, useState } from 'react';
import Axios from 'axios';
import API from '../api';
import { string } from 'yup';

const AdmProductContext = createContext(null)

const AdmProductProvider = props => {

  const [admProducts, setAdmProducts] = useState([])
  const [admProductSelected, setAdmProductSelected] = useState(null)

  const getAdmProducts = async () => {
    try {
      //Obtener todos los productos de la parte del cliente, sin todos los datos
      const res = await Axios.get('/api/productos/get-all');
      //const res = await axios.get('https://reqres.in/api/users');
      const data = res.data;
      setAdmProducts(data);
      console.log(data)
      //setAdmProducts(data);
      console.log("productos que llegan al contex", admProducts);
    } catch (error) {
      console.log("la consulta fallo, procedo a setear unos datos por defecto");
      //setAdmProducts(data);
      //console.error(error);
    }
  };

  const getAdmProduct = id => { //Trae un producto por medio del id
    try {
      const admProduct = admProducts.find((AdmProduct) => { return admProduct.pro_id == id })
      setAdmProductSelected(admProduct)
    } catch (error) { }
  };

  const addAdmProduct = async (values, actions) => {
    try {
      Axios.post('/api/productos/add', {
        pro_nombre: values.nombre, pro_valor_venta: values.valor_venta,
        pro_duracion: values.duracion, pro_valor_tiempo: values.valor_tiempo, pro_valor_unidad: values.valor_unidad,
        pro_cantidad: values.cantidad, pro_precio_mano_obra: values.precio_mano_obra, pro_descripcion: values.descripcion,
        pro_imagenUrl: values.imagen, pro_existencias: values.existencias, pro_valor_total_unidad: values.valor_total_unidad,
        pro_ingredientes: values.receta
      }, {
        withCredentials: true
      }).then((data => console.log(data)))
      actions.setSubmitting(false)
    } catch (error) { }
  };

  return (
    <AdmProductContext.Provider
      value={{
        admProductSelected,
        setAdmProducts,
        setAdmProductSelected,
        getAdmProducts,
        getAdmProduct,
        addAdmProduct
      }}
    >
      {props.children}
    </AdmProductContext.Provider>
  );
};

export { AdmProductProvider }
export default AdmProductContext;
