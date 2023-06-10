import { Heading, VStack, HStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from '../componets/TextField';
import ProductContext from '../context/Product/ProductContext';
import { useContext, useEffect, useState } from 'react';

export const CrearProducto = () => {
  const { selectedProduct } = useContext(ProductContext);

  const [selected, setSelected] = useState({})

  useEffect(() => {
    console.log(selected)
  },[selected])

  return (
    <VStack m="1%" overflowY="scroll" maxHeight="55.4rem" sx={{
      "&::-webkit-scrollbar": {
          width: "7px",
          backgroundColor: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
          bg: "gray.400",
          borderRadius: "full",
          opacity: "0.4",
          "&:hover": {
              opacity: "0.7",
          },
      },
  }}>
      <HStack spacing={10}>
        <Formik
          initialValues={{
            username: selectedProduct?.first_name,
            description: selectedProduct ? selectedProduct.first_name : '',
            amount: selectedProduct ? selectedProduct.first_name : '',
            materialsPrice: selectedProduct ? selectedProduct.first_name : '',
            salePrice: selectedProduct ? selectedProduct.first_name : '',
            preparationTime: selectedProduct ? selectedProduct.first_name : '',
          }}
          validationSchema={Yup.object({
            username: Yup.string().required('Se requiere un nombre.'),
            description: Yup.string().required('Se requiere una descripcion.'),
            amount: Yup.string().required('Se requiere la cantidad.'),
            materialsPrice: Yup.string().required(
              'Se requiere el precio de los materiales.'
            ),
            salePrice: Yup.string().required('Se requiere el precio de venta.'),
            preparationTime: Yup.string().required(
              'Se requiere el tiempo de preparacion.'
            ),
          })}
          onSubmit={(values, actions) => {
            alert(JSON.stringify(values, null, 2));
            actions.resetForm();
          }}
        >
          {formik => (
            <VStack
              as="form"
              justifyContent="center"
              p={5}
              onSubmit={formik.handleSubmit}
            >
              <Heading>Datos</Heading>

              <TextField
                name="username"
                label="Nombre"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}  
              />
              <TextField
                name="description"
                label="Descripcion"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              <TextField
                name="amount"
                label="Cantidad"
                value={formik.values.amount}
                onChange={formik.handleChange}
              />
              <TextField
                name="materialsPrice"
                label="Precio de materiales"
                value={formik.values.materialsPrice}
                onChange={formik.handleChange}
              />
              <TextField
                name="salePrice"
                label="Precio venta"
                value={formik.values.salePrice}
                onChange={formik.handleChange}
              />
              <TextField
                name="preparationTime"
                label="Tiempo de elaboracion"
                value={formik.values.preparationTime}
                onChange={formik.handleChange}
              />

              <HStack>
                <Button type="submit" variant="outline" colorScheme="teal">
                  Crear Producto
                </Button>

                <Button
                  onClick={() => {
                    alert('Editar');
                  }}
                  variant="outline"
                  colorScheme="teal"
                >
                  Editar Producto
                </Button>

                <Button
                  onClick={() => {
                    alert('Eliminar');
                  }}
                  variant="outline"
                  colorScheme="teal"
                >
                  Eliminar Producto
                </Button>
              </HStack>
            </VStack>
          )}
        </Formik>
      </HStack>
    </VStack>
  );
};
