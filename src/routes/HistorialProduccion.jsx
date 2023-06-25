import { Button, HStack, Image, Input, Table, TableCaption, TableContainer, Tbody, Tfoot, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ComboBox from '../componets/ComboBox'
import axios from 'axios'

const HistorialProduccion = () => {
    const [selected, setSelected] = useState(true)
    const [list, setList] = useState([])
    const [productos, setProductos] = useState([])
    const [promociones, setPromociones] = useState([])
    const [date, setDate] = useState("")

    //const [productos, setProductos] = useState()
    useEffect(() => {
        const fetchProductos = async () => {
          try {
            const response = await axios.get('/api/historial/buscar/productos');
            setProductos(response.data);
          } catch (error) {
            console.error('Error al obtener los productos:', error);
          }
        }

        const fetchPromos = async () => {
            try {
              const response = await axios.get('/api/historial/buscar/promociones');
              setPromociones(response.data);
            } catch (error) {
              console.error('Error al obtener las promociones:', error);
            }
        }
    
        fetchProductos()
        fetchPromos()
    }, []);

    useEffect(() => {
        console.log(list)
    }, [list])
    
    const addElement = (element) => {
        console.log(element)
        setList([...list,
            {
                id: element.id,
                nombre: element.nombre,
                tipo: element.tipo,
                ventas: 0,
                expirados: 0,
                sobrantes: 0,
                regalias: 0
            }
        ])
    }


    const getData = async (fecha) => {
        try {
            const date = new Date(fecha).toLocaleDateString().replace(/\//g, '-')
            setDate(date)
            const res = await axios.get(`/api/historial/${date}`)
            if (res.data.mensaje === "No hay datos") {
                alert(date + " no hay registros")
            }
            else {
                setList(res.data)
            }
        } catch (error) {
            console.log(error);
        } 
    }
    
    const handleChange = (e, i) => {
        const { name, value } = e.target
        const vector = [...list]
        vector[i][name] = value
        setList(vector)
    }

    const saveData = async () => {
        if(date === "") {
            alert("Falta una fecha")
        }
        else
        {
            const datos = {
                fecha: date,
                hist: list
            }
            try {
                const response = await axios.post('/api/historial/add', datos);
                alert(response.data);
                console.log(response.status)
            } catch (error) {
                console.error('Error al realizar la solicitud POST:', error);
            } 
        }     
    }

    const eliminar = (nombre) => {
        console.log(nombre)
        const updatedItems = list.filter(item => item.nombre !== nombre);
        setList(updatedItems);
    }

    return (
        <VStack>
            <HStack marginBottom="2%" width="100%" padding="2%" bg="rgba(0,0,0,0.1)" alignItems="center" justifyContent="center">
                    <VStack>
                        <Input
                            justifyContent="left" width="20%"
                            placeholder="Select Date"
                            size="md"
                            type="date"
                            w="250px"
                            bg="rgba(255,255,255,.4)"
                            onChange={(event) => {getData(event.target.value)}}
                        />
                        <Button width="100%" colorScheme='green' onClick={saveData}>
                            Guardar
                        </Button>
                    </VStack>
                    <HStack>
                        <VStack bg="rgba(255, 255, 255, .4)"
                            color={selected ? "#FFDB58" : "#56070C"}
                            borderColor=""
                            fontSize="20px"
                            variant="outline"
                            width="100%" // Ajusta el ancho del botón al 100% del contenedor
                            height="100%" // Ajusta la altura del botón al 100% del contenedor
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            padding="5px"
                            borderRadius="5px"
                        >
                            <Button bg="rgba(0,0,0,.2)" color={selected ? '#FFDB58' : '#56070C'} borderColor="" fontSize="20px" variant='outline' 
                                onClick={() => setSelected(!selected)}>{selected ? "Productos" : "Promociones"}
                            </Button>
                            <ComboBox          
                                options={(selected === true) ? productos : promociones}
                                onChange={(value) => addElement(value)}
                                searchable
                            />
                        </VStack>     
                    </HStack>                    
            </HStack>

            <TableContainer width="90%">
                <Table variant='simple' bgColor="rgba(0,0,0,.2)" borderRadius="7px" color="#fff">
                    <TableCaption color="#000">Palcafe Historial de Produccion</TableCaption>
                    <Thead>
                    <Tr>
                        <Th color="#fff">Nombre</Th>
                        <Th color="#fff">Categoria</Th>
                        <Th color="#fff">Vendidos</Th>
                        <Th color="#fff">Expirados</Th>
                        <Th color="#fff">Sobrantes</Th>
                        <Th color="#fff">Regalias</Th>
                        <Th color="#fff">Eliminar</Th>

                    </Tr>
                    </Thead>
                    <Tbody style={{ placeItems: 'center' }}>
                        {list.map((row, i) => (
                            <tr key={i} style={{ textAlign: 'center', margin: '10px 10px' }}>
                            <td style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                {row.nombre}
                            </td>
                            <td>
                                {row.tipo}
                            </td>
                            <td>
                                <Input name='ventas' value={row.ventas} onChange={e => handleChange(e, i)} />
                            </td>
                            <td>
                                <Input name='expirados' value={row.expirados} onChange={e => handleChange(e, i)} />
                            </td>
                            <td>
                                <Input name='sobrantes' value={row.sobrantes} onChange={e => handleChange(e, i)} />
                            </td>
                            <td>
                                <Input name='regalias' value={row.regalias} onChange={e => handleChange(e, i)} />
                            </td>
                            <td>
                                <a onClick={() => eliminar(row.nombre)}>
                                    <Image src={require("../assets/eliminar.png")} width="35px" height="35px" alt="Eliminar" m="auto" borderBlock="1px" borderRadius="5px" bg="rgba(0,0,0,.2)" />
                                </a>
                            </td>
                           </tr> 
                        ))}
                    </Tbody>
                    <Tfoot>
                    <Tr>
                        <Th color="#000">Nombre</Th>
                        <Th color="#000">Categoria</Th>
                        <Th color="#000">Vendidos</Th>
                        <Th color="#000">Expirados</Th>
                        <Th color="#000">Sobrantes</Th>
                        <Th color="#000">Regalias</Th>
                        <Th color="#000">Eliminar</Th>
                    </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </VStack>
    )
}

export default HistorialProduccion;
