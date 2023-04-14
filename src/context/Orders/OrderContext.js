import React, { createContext, useState } from 'react';
import Axios from 'axios';
import API from '../api';
import { string } from 'yup';


const OrderContext = createContext(null)

const isUndefined = obj => {
  if (obj === "undefined" || typeof obj === "undefined") {
    return true;
  }
  return false;
};

const isNull = obj => {
  if (obj === null) {
    return true;
  }
  return false;
};

const isUndefinedOrNull = obj => {
  if (isUndefined(obj) || isNull(obj)) {
    return true;
  }
  return false;
};

const deliteItemList = (data, itemId) => {
  var list = [];
  if (!isUndefinedOrNull(data) && data.length > 0) {
    list = data.filter((element) => element._id != itemId);
  }
  return list;
};

const searchItemList = (data, itemId) => {
  var itemSearch = null;
  if (!isUndefinedOrNull(data) && data.length > 0) {
    itemSearch = data.find((element) => { return element._id == itemId })
  }
  return itemSearch;
};

const OrderProvider = props => {

  const [orders, setOrders] = useState([])
  const [ordersAux, setOrdersAux] = useState([])
  const [order, setOrder] = useState(null)
  const [listProductsOrder, setListProductsOrder] = useState([])

  const formatoOrdenRecibir = (data) => {
    const order = {
      _id: data._id,
      name_customer: data.ped_nombre_cliente,
      address: data.ped_direccion,
      dateHour: data.ped_fecha_pedido,
      reasonRejection: data.ped_motivo_rechazo,
      phoneNumber1: data.ped_numero_telefono1,
      phoneNumber2: data.ped_numero_telefono2,
      cost: data.ped_costo,
      customerNote: data.ped_nota_cliente,
      customer_id: data.ped_fk_usuario,
      specialOrder: data.ped_especial,
      listProductsOrder: data.ped_productos,
      state: data.ped_estado
    }
    console.log(order);
    return order;
  };
  const darFormatoLista = (data) => {
    const list = [];
    data.map((element) => {
      list.push(formatoOrdenRecibir(element));
    })
    return list;
  }
  const getOrders = async () => {
    try {
      const res = await Axios.get('/api/pedidos/get-all');
      const data = res.data;
      if (data.length > 0) {
        setOrders(darFormatoLista(data));
        setOrdersAux(darFormatoLista(data));
      }
      console.log(orders)
    } catch (error) {
      console.log(error);
    }
  };
  /*
  const addOrdersAux = async (data) => {//TODO:
    if (!isUndefinedOrNull(data) && data.length > 0) {
      const list = [];
      data.map((element) => {
        list.push(formatoOrdenRecibir(element));
      }
      )
      setOrdersAux(list);
    }
  };*/

  const deliteProductList = productId => {
    setListProductsOrder(deliteItemList(listProductsOrder, productId));
  };

  const editProductList = (prod, amount, actions) => {
    prod.amountProduct = amount; // edito la cantidad del producto, que voy a pedir
    window.alert("Se actualizo la cantidad del producto solicitada");
    actions.setSubmitting(false)
  };

  const addProductList = (product, amount, actions) => {
    var prodOrder = null;
    var list = [];
    var prod = null;
    if (!isUndefinedOrNull(product)) {
      prod = searchItemList(listProductsOrder, product._id);
      if (isUndefinedOrNull(prod)) {
        prodOrder = {
          _id: product._id,
          amountProduct: amount,
          name: product.name,
          image: product.image,
          stock: product.stock
        }
        list = listProductsOrder;
        list.push(prodOrder);
        setListProductsOrder(list);
        window.alert("Se agrego el producto al carrito de compra");
        actions.setSubmitting(false)
      }
      else {
        editProductList(prod, amount, actions);
      }
    }
    else {
      window.alert("El producto no existe")
    }
    console.log(listProductsOrder);
  };
  const productShippingListFormat = () => { //TODO: como se enviar la lista de productos
    const list = [];
    listProductsOrder.map((element) => {
      const prodOrder = {
        id_producto: element._id,
        producto_cantidad: element.amountProduct,
        producto_nombre: element.name
      }
      list.push(prodOrder);
    })
    return list;
  };
  const formatoOrdenEnviar = (values) => {
    const order = {
      ped_nombre_cliente: values.name,
      ped_direccion: values.address,
      ped_numero_telefono1: values.phoneNumber1,
      ped_numero_telefono2: values.phoneNumber2,
      ped_costo: values.cost,
      ped_fecha_pedido: values.dateHour,
      ped_nota_cliente: values.customerNote,
      ped_fk_usuario: values.customer_id,
      ped_especial: false,
      ped_productos: productShippingListFormat()
    }
    return order;
  };
  const addOrder = async (values, actions) => {
    try {
      const res = await Axios.post('/api/pedido/add',
        formatoOrdenEnviar(values)
        , {
          withCredentials: true
        }).then((data => console.log(data)))
      actions.setSubmitting(false)
    } catch (error) { }
  };

  const getOrder = async id => {
    try {
      const res = await Axios.get(`/api/pedido/${id}`);
      const data = res.data;
      setOrder(formatoOrdenRecibir(data[0]));
    } catch (error) {
      console.log("La consulta para obtener la orden fallo");
    }
  };
  const deliteOrder = async (id) => {
    console.log(id);
    try {
      Axios.delete(`/api/pedidos/delete/${id}`).then((data => console.log(data)));
      setOrdersAux((current) => current.filter((orderAux) => orderAux._id != id))
      setOrders((current) => current.filter((order) => order._id != id))
    } catch (error) { }
  };
  const formatoOrdenEditar = (values) => {
    const order = {
      ped_nombre_cliente: values.name,
      ped_direccion: values.address,
      ped_numero_telefono1: values.phoneNumber1,
      ped_numero_telefono2: values.phoneNumber2,
      ped_costo: values.cost,
      ped_fecha_pedido: values.dateHour,
      ped_nota_cliente: values.customerNote,
      ped_fk_usuario: values.customer_id,
      ped_especial: false,
      ped_productos: values.listProductsOrder,
      ped_estado: values.state,
      ped_motivo_rechazo: values.reasonRejection
    }
    return order;
  };
  const editOrder = async (values, actions) => {
    try {
      Axios.put(`/api/pedidos/edit/${values._id}`, formatoOrdenEditar(values)).then((data => console.log(data)))
    } catch (error) { }
    actions.setSubmitting(false);
  };
  const editOrderList = async (values, ordAux) => { //TODO:
    try {
      console.log(values);
      Axios.put(`/api/pedidos/edit/${values._id}`, formatoOrdenEditar(values)).then((data => console.log(data)))
      ordAux.state = values.state;
    } catch (error) { }
  };
  const editOrders = async () => {
    try {
      orders.map((order) => {
        const orderAux = searchItemList(ordersAux, order._id);
        if (order.state !== orderAux.state) {
          console.log("la orden cambio");
          console.log(order.state);
          console.log("cambio");
          editOrderList(order, orderAux);
        }
      })
    } catch (error) { }
  };
  const getListProductsOrder = (item) => {
    console.log(item);
    var list = "";
    try {
      item.listProductsOrder.map((product) => {
        list = list + product.producto_nombre + " " + product.producto_cantidad + ". ";
      })
    } catch (error) { }
    return list;
  };
  return (
    <OrderContext.Provider
      value={{
        addOrder,
        addProductList,
        editProductList,
        deliteProductList,
        getOrders,
        orders,
        order,
        listProductsOrder,
        deliteOrder,
        editOrders,
        setOrder,
        getOrders,
        editOrder,
        getListProductsOrder,
        getOrder
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export { OrderProvider }
export default OrderContext;
