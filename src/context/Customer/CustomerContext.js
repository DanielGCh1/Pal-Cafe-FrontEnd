import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import API from '../api';

const CustomerContext = createContext(null)

const CustomerProvider = props => {

    const [customer, setCustomer] = useState(null)

    const pal_usuario = {
        usu_id_usuario: 1,
        usu_nombre: 'Daniel',
        usu_primer_apellido: 'Gómez',
        usu_segundo_apellido: 'Chacón',
        usu_fecha_registro: null,
        usu_numero_telefono1: 61282136,
        usu_numero_telefono2: null,
        usu_direccion: '35 mts oeste',
        usu_estado: "pendiente",
        usu_correo: 'dgchaarturo@',
        usu_url_foto: '',
        usu_contrasenna: "1234"
    }
    /*
    useEffect(() => {
        //  console.log(clienteSelecionado)
    }, [customer])
    */
   
    const getSectionCustomer = async () => {
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
        }
    };
    const loginCustomer = async (correo, password, actions) => {
        try {
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
    };

    const signOff = async () => {
        try {
            const custom = localStorage.getItem("usu_id_usuario");
            if (custom !== null) {
                localStorage.removeItem("usu_id_usuario")
                setCustomer(null)
            }
        } catch (error) { }
    };
  

    return (
        <CustomerContext.Provider
            value={{
                customer,
                getSectionCustomer,
                loginCustomer,
                signOff
            }}
        >
            {props.children}
        </CustomerContext.Provider>
    );
};

export { CustomerProvider }
export default CustomerContext;
