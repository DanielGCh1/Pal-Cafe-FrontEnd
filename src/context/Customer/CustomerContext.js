import React, { createContext, useState } from 'react';
import Axios from "../api";
import { useEffect } from 'react';

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

const isObj = obj => {
    if (typeof obj === "object") {//Trim: remove blank spaces
        return true;
    }
    return false;
};

const CustomerContext = createContext(null)

const CustomerProvider = props => {

    const [customer, setCustomer] = useState(null)

    const getCookie = async () => {
        try {
            const { data } = await Axios.get("/getCookie", {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (isObj(data)) {
                setCustomer(data);
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const getSectionCustomer = async () => {
        getCookie();
        /*
        try {
            const res = await API.get('/use/login/:correo/:password');
            const data = res.data.data;
            setCustomer(data)
        } catch (error) {
            console.log("Obtener la seccion fallo, proceso a setear una seccion")
            const customId = localStorage.getItem("usu_id_usuario");
            console.log("el id de la seccion del cliente es");
            console.log(customId);
            if (customId != null) {
                setCustomer(pal_usuario)
            }
        }*/
    };
    const loginUser = async (user, password, actions) => {
        try {
            Axios.post("/loginSession", { correo: user, password: password }, {
                withCredentials: true
            }).then((data => setCustomer(data.data.user)))
            console.log("El usuario fue");
        } catch (error) {
            console.log(error)
        }
        actions.setSubmitting(false)
    };
    const loginCustomer = async (correo, password, actions) => {
        loginUser(correo, password, actions);
        /*try {
             const res = await API.get('/use/login/:correo/:password');
             const data = res.data.data;
             setCustomer(data)
         } catch (error) {
             //console.error(error);
             console.log("Fallo buscar usuario a la bd, procedo a buscarlo de forma interna");
             if (pal_usuario.usu_correo == correo && pal_usuario.usu_contrasenna == password) {
                 setCustomer(pal_usuario)
                 localStorage.setItem("usu_id_usuario", pal_usuario.usu_id_usuario)
             }
             else {
                 setTimeout(() => {
                     alert("Correo o contraseña incorrecta.")
                 }, 1000)
             }
         }
         actions.setSubmitting(false)
         */
    };
    const eliminarCookie = async () => {
        console.log("hola");
        try {
            console.log("hola");
            const { data } = await Axios.get("/logout", {
                withCredentials: true
            });
            setCustomer(null);
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    }
    const signOff = async () => {
        eliminarCookie();
        /*
        try {
            const custom = localStorage.getItem("usu_id_usuario");
            if (custom !== null) {
                localStorage.removeItem("usu_id_usuario")
                setCustomer(null)
            }
        } catch (error) { }
        */
    };

    const editCustomer = async (values, actions) => {
        try {
            console.log(values);
            const val = {
                _id: values._id,
                usu_nombre: values.name,
                usu_usuario: values.user,
                usu_primer_apellido: values.surname,
                usu_segundo_apellido: values.secondSurname,
                usu_fecha_registro: values.registrationDate,
                usu_numero_telefono1: values.firstNumber,
                usu_numero_telefono2: values.secondNumber,
                usu_direccion: values.address,
                usu_estado: values.state,
                usu_correo: values.email,
                usu_contraseña: values.password
            };
            Axios.put(`/users/edit/${values._id}`, val).then((data => console.log(data)))
        } catch (error) { }
        actions.setSubmitting(false);
    };
    return (
        <CustomerContext.Provider
            value={{
                customer,
                getSectionCustomer,
                loginCustomer,
                signOff,
                getDate,
                editCustomer
            }}
        >
            {props.children}
        </CustomerContext.Provider>
    );
};

export { CustomerProvider }
export default CustomerContext;
