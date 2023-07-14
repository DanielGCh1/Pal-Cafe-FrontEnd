import React, { createContext, useState } from 'react';
import Axios from '../api';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState(null)

    const getImageUrl = async id => {
        try {
          const response = await Axios.get(`/usuarios/imagen/${id}`);
          if (response.status = 200) {
            setImageUrl(`http://localhost:3001/api/usuarios/imagen/${id}`);
          }
          else {
            setImageUrl(require('../../assets/ImagenNoEncontrada.png'));
          }
        } catch (error) {
          console.log('La consulta para obtener la imagen del usuario falló');
          setImageUrl(require('../../assets/ImagenNoEncontrada.png'));
        }
      };

    const getCookie = async () => {
        await Axios.get("/getCookie", {
            withCredentials: true
        }).then(res => {
            setCustomer(res.data);
        }).catch(err => {
            // navigate("/PalCafe/PaginaPrincipal");
        });
    }

    const getSectionCustomer = async () => {
        getCookie();
    };

    const loginUser = async (user, password, actions) => {
        try {
            Axios.post("/login", { correo: user, password: password }, {
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
            const { data } = await Axios.delete("/logout", {
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
        navigate("/PalCafe/LoginCustomer")
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
            const formData = new FormData();
            formData.append('image', values.image);
            formData.append('nombre', values.name);
            formData.append('usuario', values.user);
            formData.append('primerApellido', values.surname);
            formData.append('segundoApellido', values.secondSurname);
            formData.append('telefonoPrimer', values.firstNumber);
            formData.append('telefonoSegundo', values.secondNumber);
            formData.append('direccion', values.address);
            formData.append('correo', values.email);
            formData.append('password', values.password);
            formData.append('newPassword', values.newPassword);
            formData.append('newImage', values.newImage);
            formData.append('imageUrlLocal', values.imageUrlLocal);//TODO: si esta en null, es
            //TODO: porque borro la foto, y no planea dejar ninguna, pero solo aplica para clientes
            // TODO: pero se ocupa aqui, porque los empleados si ocupan foto, y ocupo saber si lo intento
      
            console.log(formData);
            const response = await Axios.put(`/users/edit-customer/${values._id}`, formData, {
              withCredentials: true,
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
      
            if (response.status == 200) {
                console.log(response.data);
              window.alert(response.data.message);
            } else {
              window.alert(response.data.message);
            }
          } catch (error) {
            window.alert("Error inesperado al editar el empleado");
          }
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
                editCustomer,
                imageUrl,
                setImageUrl,
                getImageUrl
            }}
        >
            {props.children}
        </CustomerContext.Provider>
    );
};

export { CustomerProvider }
export default CustomerContext;
