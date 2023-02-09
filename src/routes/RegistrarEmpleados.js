import Header from '../componets/header';
import { Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input
} from '@chakra-ui/react'

export default function RegistrarEmpleados() {
    return (
        <>
            <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type='email' />
                <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
        </>
    );
}
