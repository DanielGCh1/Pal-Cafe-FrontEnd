import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@chakra-ui/react';
import API from '../api';

// Usuario

export const CargarUsuario = async () => {
    const response = await API.get(`/user`);

    return response;
}


export const UserEdit = async (props) => {
    const user = {
        name: props
    };
    const response = await API.put(`/user/${props}`);

    return response;
}

export const UserAdd = async (nombre) => {
    const user = {
        name: nombre
    };

    const response = await API.post(`/user/`, { user });

    return response;
}

export const UsuarioDelete = async (id) => {
    const response = await API.delete(`/user/${id}`);

    return response;
}

// Ingredientes

export const CargarIngredientes = async () => {
    const response = await API.get(`/ingredientes/all-ingredientes`);

    return response.data;
}
