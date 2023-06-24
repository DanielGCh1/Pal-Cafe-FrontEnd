import ProductosVentaPaginaPrincipal from '../componets/productosVentaPaginaPrincipal'
import { Stack, Flex, Spacer, Text, AspectRatio, Heading } from '@chakra-ui/react'



export default function paginaPrincipal() {

    return <>

        <Stack spacing={3} alignItems='center'>
            <Text fontWeight="bold" fontSize='7xl' fontFamily="'Yellowtail', cursive">Pal Café!</Text>
            <Text fontWeight="bold" color='#FFDB58' fontSize='3xl'>Panadería y Repostería</Text>
            <Text fontSize='4xl' textAlign='justify' fontWeight="bold" w='70%' p='50px'>Somos un pequeño negocio familiar dedicado a la panadería y repostería tradicional de la zona. Todos nuestros productos son elaborados de manera artesanal y libres de preservantes artificiales.</Text>
        </Stack>

        <AspectRatio ratio={4 / 2} h='60vh'>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3936.5903856472532!2d-83.68107094127808!3d9.369467042815717!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa14fcec96d1653%3A0xaabcb7b8d5b0b0dd!2zUGFsIGNhZsOp!5e0!3m2!1ses!2scr!4v1673391758308!5m2!1ses!2scr"
                width="200"
                style={{
                    border: '2px solid #ddd', // Añade un borde de 2px sólido con color #ddd
                    borderRadius: '8px', // Suaviza las esquinas con un radio de 8px
                    width: '70%',
                    height: '60vh',
                    margin: '0 auto',
                }}
                allowFullScreen=""
                loading="lazy"
            ></iframe>
        </AspectRatio>


        <Flex justifyContent="space-around" alignItems="center" direction={['column', 'row']}>

            <Stack spacing={1} alignItems='center'>
                <Text fontSize='3xl'>VISÍTANOS</Text>
                <Text fontSize='2xl' maxW='%' p='25px'>100 este del templo católico de Barrio Las Brisas</Text>
            </Stack>

            <Stack spacing={1} alignItems='center'>
                <Text fontSize='3xl' p='25px 25px 5px 5px' >HORARIO</Text>
                <Text fontSize='2xl' p='25px 25px 5px 5px' >Lunes - Sabádo</Text>
                <Text fontSize='2xl' p='25px 25px 5px 5px' >5:30 a.m. - 7:00 p.m.</Text>
                <Text fontSize='2xl' p='25px 25px 5px 5px' >Domingo</Text>
                <Text fontSize='2xl' p='25px 25px 5px 5px' >5:30 a.m. - 3:00 p.m.</Text>

            </Stack>

        </Flex>

        <ProductosVentaPaginaPrincipal />

    </>
}