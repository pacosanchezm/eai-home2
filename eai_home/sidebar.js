import React from "react";
import { slide as Menu } from "react-burger-menu";

import { Flex, Box, Button, Text, Image, Spinner, Grid, Input } from "@theme-ui/components";



export default props => {
  return (
    // Pass on our props
    <div>
      <Flex sx={{ width: "100%" }}>

        <Box sx={{ width: "50%" }}>

          <Menu {...props}>
            <a className="menu-item" href="/">
              Home
            </a>

            <a className="menu-item" href="/">
              Mi Cuenta
            </a>

            <a className="menu-item" href="/login">
              Iniciar Sesión
            </a>


            <a className="menu-item" href="/orders">
              Pedidos
            </a>

            <a className="menu-item" href="/orderbook?opt=3">
              Nuevo Pedido
            </a>





            <a className="menu-item" href="/togo">
              Entregas
            </a>

            <a className="menu-item" href="/contact">
              Reportes
            </a>

          </Menu>
          
        </Box>
      </Flex>

    </div>


  );
};
