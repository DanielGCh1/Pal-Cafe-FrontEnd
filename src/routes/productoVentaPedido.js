import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  IconButton
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import useProducts from '../context/Product/UseProduct';
import NumberInputFormik from '../componets/NumberInputFormik';
import { useRef } from "react";
import useOrders from '../context/Orders/UseOrders';

import useCustomer from '../context/Customer/UseCustomer';
import { MinusIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons'

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

const isEmptyString = obj => {
  if (obj === "" || obj.trim() === "") {//Trim: remove blank spaces
    return true;
  }
  return false;
};

const getImage = obj => {
  if (!isUndefinedOrNull(obj) && !isEmptyString(obj.image)) {//Trim: remove blank spaces
    return obj.image;
  }
  return require('../assets/ImagenNoEncontrada.png');
};

const getName = obj => {
  if (!isUndefinedOrNull(obj) && !isEmptyString(obj.name)) {
    return obj.name;
  }
  return "No disponible";
};

const getUnits = obj => {
  if (!isUndefinedOrNull(obj)) {
    if (obj.amount == 1) {
      return obj.amount + " Unidad";
    }
    else {
      return obj.amount + " Unidades";
    }
  }
  return "No disponible";
};
const getPrice = obj => {
  if (!isUndefinedOrNull(obj)) {
    return "₡ " + obj.price;
  }
  return "No disponible";

};
const getStock = obj => {
  if (!isUndefinedOrNull(obj)) {
    return obj.stock;
  }
  return 0;
};

const getStockText = obj => {
  if (!isUndefinedOrNull(obj)) {
    if (getStock(obj) == 1) {
      return obj.stock + " Existencia";
    }
    else {
      return obj.stock + " Existencias";
    }
  }
  return 0;
};
const isNumber = obj => {
  if (typeof obj === "number") {
    return true;
  }
  return false;
};

const getDescription = obj => {
  if (!isUndefinedOrNull(obj) && !isEmptyString(obj.description)) {
    return obj.description;
  }
  return "No disponible";
};
const addCart = obj => {

  /*if (!isUndefinedOrNull(obj) && !isEmptyString(obj.pro_descripcion)) {
    return obj.pro_descripcion;
  }
  return "No disponible";*/
};

export default function ProductoVentaPedido() {

  const { products, productSelected, getProduct, getProducts } =
    useProducts();
  const { customer, getSectionCustomer, signOff } = useCustomer();
  const { addProductList } = useOrders();
  const params = useParams()
  const refFormik = useRef(null); // Reference to the formik
  const [amount, setAmount] = useState(1);


  //const handleInputChangeQuantityOrdered = (e) => setValueQuantityOrdered(e.target.value);

  useEffect(() => {

    if (isUndefinedOrNull(products) || products.length <= 0) {
      getProducts();
    }

    if (isUndefinedOrNull(productSelected)) {
      getProduct(params.id);
    }

  }, [products, productSelected]);

  /*
const errors = validate(
selected ? selected.id : '',
selected ? selected.last_name : 'hola',
selected ? selected.first_name : '',
selected ? selected.email : '',
selected ? selected.first_name : '',
selected ? selected.first_name : ''
);*/


  //const { match: { params } } = this.props;

  function validateOrderValue(value) {
    console.log("Valor de props.values.amount " + typeof refFormik.current.values.amount);
    var order = parseInt(refFormik.current.values.amount)
    if (!isNumber(order) || !order) {
      refFormik.current.values.amount = 1
      return 0
    }
    if (order < 1) {
      refFormik.current.values.amount = 1
      return 0
    }
    if (order > productSelected.stock) {
      refFormik.current.values.amount = productSelected.stock
      return 0
    }
    console.log("order" + order);
  };

  function increaseAmountItem() {
    if (refFormik.current.values.amount < productSelected.stock) {
      refFormik.current.values.amount++;
    }
    return refFormik.current.values.amount;
  }

  function decreaseAmountItem() {
    if (refFormik.current.values.amount > 1) {
      refFormik.current.values.amount--;
    }
    return refFormik.current.values.amount;
  }


  return <>
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 18, md: 24 }}>
      <Flex>
        <Image

          rounded={'md'}
          alt={'product image'}
          src={/*!isUndefinedOrNull(productSelected) ? productSelected.pro_imagen : require('../assets/ImagenNoEncontrada.png')*/
            getImage(productSelected)}
          fit={'cover'}
          align={'center'}
          w={'100%'}
          h={{ base: '100%', sm: '400px', lg: '500px' }}
        />
      </Flex>
      <Stack spacing={{ base: 6, md: 10 }}>
        <Box as={'header'}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
            {getName(productSelected)}
          </Heading>
          <Text
            color={useColorModeValue('gray.900', 'gray.400')}
            fontWeight={300}
            fontSize={'2xl'}>
            {getUnits(productSelected)}
          </Text>
          <Text
            color={useColorModeValue('gray.900', 'gray.400')}
            fontWeight={300}
            fontSize={'2xl'}>
            {getStockText(productSelected)}
          </Text>
          <Text
            color={useColorModeValue('gray.900', 'gray.400')}
            fontWeight={300}
            fontSize={'2xl'}>
            {getPrice(productSelected)}
          </Text>
        </Box>

        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={'column'}
          divider={
            <StackDivider
              borderColor={useColorModeValue('gray.200', 'gray.600')}
            />
          }>
          <VStack spacing={{ base: 4, sm: 6 }}>
            <Text fontSize={'lg'}>
              {getDescription(productSelected)}
            </Text>
          </VStack>
          {(getStock(productSelected) >= 1 && (customer != null) && customer.usu_estado === "Aceptado") ?

            <Formik
              initialValues={{ amount: amount }}
              innerRef={refFormik}
              onSubmit={(values, actions) => {
                /*
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2))
                  actions.setSubmitting(false)
                }, 1000)*/
                addProductList(productSelected, values.amount, actions);
              }}
            >
              {(props) => (
                <Form>
                  {/*
                  <NumberInputFormik item={productSelected} value={props.values.amount} nam={'amount'} val={validateOrderValue} />

                  */}

                  <Field name={'amount'}>
                    {({ field, form }) => (
                      <Stack direction="row" alignItems="center">

                        <Text>Cantidad: {amount}</Text>

                        <IconButton color={'black'}
                          aria-label="incrementar cantidad"
                          icon={<AddIcon />}
                          onClick={() => setAmount(increaseAmountItem())}
                        />
                        <IconButton color={'black'}
                          aria-label="decrementar cantidad"
                          icon={<MinusIcon />}
                          onClick={() => setAmount(decreaseAmountItem())}
                        />
                      </Stack>
                    )}
                  </Field>

                  <Button
                    mt={4}
                    colorScheme='red'
                    isLoading={props.isSubmitting}
                    type='submit'
                    marginTop='10'
                  >
                    Añadir al carro
                  </Button>
                </Form>
              )}
            </Formik>
            :
            (getStock(productSelected) <= 0) ?
              <Stack spacing={1} alignItems='center'>
                <Text fontSize='2xl' fontWeight="bold" p='25px'>Producto no disponible en este momento</Text>

              </Stack>
              : (!isUndefinedOrNull(customer) && customer.usu_estado != "Aceptado") ?
                <Stack spacing={1} alignItems='center'>
                  <Text fontSize='2xl' fontWeight="bold" p='25px'>Debe iniciar sesión para agregar productos al carrito de compra</Text>

                </Stack>
                :
                <Stack spacing={1} alignItems='center'>
                  <Text fontSize='2xl' fontWeight="bold" p='25px'>Su perfil debe estar aprobado para continuar con la compra</Text>

                </Stack>
          }



        </Stack>
      </Stack>
    </SimpleGrid>



  </>
}
/*
const validate = (
  name,
  description,
  amount,
  materialPrice,
  salePrice,
  preparationTime
) => {
  if (name !== undefined) if (name.length === 0) return 'Se requiere un nombre';
  if (description !== undefined)
    if (description.length === 0) return 'Se requiere una descripcion';
  if (amount !== undefined)
    if (amount.length === 0) return 'Se requiere una cantidad';
  if (materialPrice !== undefined)
    if (materialPrice.length === 0)
      return 'Se requiere el gasto en ingredientes';
  if (salePrice !== undefined)
    if (salePrice.length === 0) return 'Se requiere el precio de venta';
  if (preparationTime !== undefined)
    if (preparationTime.length === 0)
      return 'Se requiere el tiempo preparacion';
};*/
