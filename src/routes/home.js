import Header from '../componets/header';
import NotificationsDrawer from '../componets/NotificationsDrawer';
import { Container } from '@chakra-ui/react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Axios from "../context/api";

export default function Home() {
  const navigate = useNavigate();

  const [logeado, setlogeado] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      await Axios.get("/getCookie", {
        withCredentials: true
      }).then(res => {
        setlogeado(true)
      }).catch(err => {
        navigate("/");
      });
    };

    fetchData();
  }, []);

  return (
    <>
      {logeado ? (
        <Container w="100%" maxW="100%" h="calc(100vh)" p="0" display="flex">
          <Header />
          <div id="divCenter">
            {/* <NotificationsDrawer /> */}
            <Outlet />
          </div>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
}