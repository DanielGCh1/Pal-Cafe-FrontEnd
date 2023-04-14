import {
    Box,
    Flex,
    Text,
    Image
} from "@chakra-ui/react";
import { Link } from '@chakra-ui/react'

export default function Footer() {

    return (
        <Box bg="black" w="100%" p={4}>
            <Flex justifyContent="center" alignItems="center" direction={['column', 'row']}>
                <Box w={["100%", "30%"]} display="flex" justifyContent={['center', 'start']}>
                    <Link to='/PalCafe/PaginaPrincipal'>
                        <Image src={require("../assets/Logo.png")} w="100px" h="100px" minW="100px" minh="100px"></Image>
                    </Link>
                </Box>

                <Box w={["100%", "30%"]} display="flex" justifyContent={['center', 'space-between']}>
                    <Text m="auto" color="white">Barrio Las Brisas, Daniel Flores, Pérez Zeledón</Text>
                </Box>

                <Box w={["100%", "10%"]} display="flex" justifyContent={['center','flex-end']}>
                    <Link isExternal="true" href='https://www.facebook.com/PalCafe254?comment_id=Y29tbWVudDo1Njc1MTg3NzIyNDk1NTI1XzU2NzUyNjQyNzkxNTQ1MzY%3D'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-facebook" width="52" height="52" viewBox="0 0 24 24" strokeWidth="1.3" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                        </svg>
                    </Link>
                </Box>

                <Box w={["100%", "10%"]} display="flex" justifyContent={['center','flex-end']}>
                    <Link href='https://www.instagram.com/palcafe_pz/' isExternal="true">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-instagram" width="52" height="52" viewBox="0 0 24 24" strokeWidth="2" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <rect x="4" y="4" width="16" height="16" rx="4" />
                            <circle cx="12" cy="12" r="3" />
                            <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
                        </svg>
                    </Link>

                </Box>

                <Box w={["100%", "10%"]} display="flex" justifyContent={['center','flex-end']} >
                    <Link isExternal="true" href='https://api.whatsapp.com/send?phone=%2B50672090961&fbclid=IwAR2_fOq_ak5lUBIbGMhoSB4mV3gjOOGxCGH5GsHhUwoCXyQ8Us9FMn3nvmE'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-whatsapp" width="52" height="52" viewBox="0 0 24 24" strokeWidth="2" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                            <path d="M9 10a0.5 .5 0 0 0 1 0v-1a0.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a0.5 .5 0 0 0 0 -1h-1a0.5 .5 0 0 0 0 1" />
                        </svg>
                    </Link>
                </Box>

            </Flex>

        </Box >);
}
