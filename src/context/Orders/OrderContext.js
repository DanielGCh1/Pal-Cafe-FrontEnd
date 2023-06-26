import React, { createContext, useState } from 'react';
import Axios from "../api";



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
const calculateOrderCost = (data) => { //TODO: como se enviar la lista de productos
  var cost = 0;
  if (!isUndefinedOrNull(data)) {
    data.map((element) => {
      cost = cost + (element.amountProduct * element.price);
    })
  }
  return cost;
};
const deliteItemList = (data, itemId) => {
  var list = [];
  if (!isUndefinedOrNull(data) && data.length > 0) {
    list = data.filter((element) => element._id != itemId);
  }
  return list;
};
const getMinorDayMonth = (val) => {
  if (val == 0) {
    val++;
  }
  if (val < 10) {
    var value = '0';
    value = value + `${val}`
    return value;
  }
  return val;
}
const getMinor = (val) => {
  if (val < 10) {
    var value = '0';
    value = value + `${val}`
    return value;
  }
  return val;
}

const getDate = (date) => {
  console.log(date);
  let fechaObj = new Date(date);
  let dia = fechaObj.getDate();
  console.log(dia);
  let mes = fechaObj.getMonth() + 1;
  console.log(mes);
  let anio = fechaObj.getFullYear();
  let hora = fechaObj.getHours();
  let minutos = fechaObj.getMinutes();
  return `${anio}-${getMinorDayMonth(mes)}-${getMinorDayMonth(dia)}T${getMinor(hora)}:${getMinor(minutos)}`;
}

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
  const [imagesOrder, setImagesOrder] = useState([])
  const [ordersCustomer, setOrdersCustomer] = useState([])


  const getOrdersCustomer = async (id) => {
    try {
      const res = await Axios.get(`/pedidos/get_pedios_cliente/${id}`);
      const data = res.data;
      console.log(data);
      if (data.length > 0) {
        setOrdersCustomer(darFormatoLista(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatoListaProductosRecibir = (data) => { //TODO: como se enviar la lista de productos
    const list = [];
    data.map((element) => {
      const prodOrder = {
        _id: element.id_producto,
        amountProduct: element.producto_cantidad,
        name: element.producto_nombre,
        price: element.producto_costo,
        //image: getImage(_id)
      }
      list.push(prodOrder);
    })
    return list;
  };
  const formatoOrdenRecibir = (data) => {
    const order = {
      _id: data._id,
      name_customer: data.ped_nombre_cliente,
      address: data.ped_direccion,
      dateHour: getDate(data.ped_fecha_pedido),
      reasonRejection: data.ped_motivo_rechazo,
      phoneNumber1: data.ped_numero_telefono1,
      phoneNumber2: data.ped_numero_telefono2,
      customerNote: data.ped_nota_cliente,
      customer_id: data.ped_fk_usuario,
      specialOrder: data.ped_especial,
      listProductsOrder: formatoListaProductosRecibir(data.ped_productos),
      cost: calculateOrderCost(formatoListaProductosRecibir(data.ped_productos)),
      state: data.ped_estado,
      imagesOrder: data.ped_imagenes_pedido,
      sendeOrder: data.ped_enviar_pedido
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
      const res = await Axios.get('/pedidos/get-all');
      const data = res.data;
      console.log(data);
      if (data.length > 0) {
        setOrders(darFormatoLista(data));
        setOrdersAux(darFormatoLista(data));
      }
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
  const deliteProductOrederList = productId => {
    order.listProductsOrder = (deliteItemList(order.listProductsOrder, productId));
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
          stock: product.stock,
          price: product.price
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
  const productShippingListFormat = (data) => { //TODO: como se enviar la lista de productos
    const list = [];
    data.map((element) => {
      const prodOrder = {
        id_producto: element._id,
        producto_cantidad: element.amountProduct,
        producto_nombre: element.name,
        producto_costo: element.price
      }
      list.push(prodOrder);
    })
    return list;
  };
  const formatoOrdenEnviar = (values) => {
    const formData = new FormData();

    formData.append('ped_nombre_cliente', values.name);
    formData.append('ped_direccion', values.address);
    formData.append('ped_numero_telefono1', values.phoneNumber1);
    formData.append('ped_numero_telefono2', values.phoneNumber2);
    formData.append('ped_costo', values.cost);
    formData.append('ped_fecha_pedido', values.dateHour);
    formData.append('ped_nota_cliente', values.customerNote);
    formData.append('ped_fk_usuario', values.customer_id);
    formData.append('ped_especial', values.specialOrder);
    formData.append('ped_productos', productShippingListFormat(listProductsOrder));
    formData.append('ped_imagenes_pedido', values.image);
    formData.append('ped_enviar_pedido', values.sendOrder);

    return formData;
  };


  const addOrder = async (values, actions) => {
    try {
      var formattedOrder = formatoOrdenEnviar(values);
      const response = await Axios.post('/pedido/add', formattedOrder, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        window.alert(response.data.message);
      } else {
        window.alert(response.data.message);
      }
    } catch (error) {
      window.alert("Error inesperado al guardar el pedido");
      console.error(error);
    }
    actions.setSubmitting(false);
  };

  const getOrder = async id => {
    try {
      const res = await Axios.get(`/pedido/${id}`);
      const data = res.data;
      setOrder(formatoOrdenRecibir(data[0]));
    } catch (error) {
      console.log("La consulta para obtener la orden fallo");
    }
  };
  const deliteOrder = async (id) => {
    console.log(id);
    try {
      Axios.delete(`/pedidos/delete/${id}`).then((data => console.log(data)));
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
      ped_productos: productShippingListFormat(values.listProductsOrder),
      ped_estado: values.state,
      ped_motivo_rechazo: values.reasonRejection,
      ped_enviar_pedido: values.sendOrder,
    }
    return order;
  };
  const editOrder = async (values, actions) => {
    try {
      Axios.put(`/pedidos/edit/${values._id}`, formatoOrdenEditar(values)).then((data => console.log(data)))
    } catch (error) { }
    actions.setSubmitting(false);
  };
  const editOrderList = async (values, ordAux) => { //TODO:
    try {
      console.log(values);
      Axios.put(`/pedidos/edit/${values._id}`, formatoOrdenEditar(values)).then((data => console.log(data)))
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
  const getListProductsOrder = (item) => {// Convierto la lista de productos pedidos, en un string
    console.log(item);
    var list = "";
    try {
      item.listProductsOrder.map((product) => {
        list = list + product.name + " " + product.amountProduct + ". ";
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
        getOrder,
        calculateOrderCost,
        listProductsOrder,
        getOrdersCustomer,
        ordersCustomer,
        setOrdersCustomer,
        setListProductsOrder,
        deliteProductOrederList
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export { OrderProvider }
export default OrderContext;
