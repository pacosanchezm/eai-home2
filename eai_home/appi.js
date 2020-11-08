import React, { useState, useEffect, useContext, createContext, Suspense } from "react"
import axios from "axios";


// ---------- styles
  /** @jsx jsx */ 
  import { ThemeProvider, jsx, Styled, useThemeUI, MenuButton } from "theme-ui"
  import { Grid, Flex, Box, Button, Text, Image, Spinner, Input, Link } from "@theme-ui/components"
  import Theme from "./theme"
  import "@babel/polyfill"

  import Head from "./head"
  import UsedataHome from "./usedata"

  import SideBar from "./sidebar";
  import "./styles.css";

  import { useMediaQuery } from 'react-responsive'



  
  let App;
  const StateContext = createContext();

// -----------------------------------------------------------------------------


  let server = "https://sushifactory.app"



const useStateUniv = () => {
  return {
    Theme: useState(useContext(createContext(Theme))),
    LoadingSecc1: useState(useContext(createContext(false))),
    Empresa: useState(useContext(createContext(1))),

    User: {
      Id: useState(useContext(createContext(0))),
      Name: useState(useContext(createContext(""))),
      LoginName: useState(useContext(createContext(""))),
      LoginPass: useState(useContext(createContext(""))),
    },

    Signup: {
      Id: useState(useContext(createContext(0))),
      Name: useState(useContext(createContext(0))),
      LoginName: useState(useContext(createContext(""))),
      LoginPass: useState(useContext(createContext(""))),
    },

  };
};

// ------------------

const ContextProvider = ({ children }) => {
  return (
    <StateContext.Provider value={useStateUniv()}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </StateContext.Provider>
  );
};

// -----------------------------------------------------------------------------

let useAcciones = function(StateContext) {

  const [LoginName, setLoginName] = useContext(StateContext).User.LoginName;
  const [LoginPass, setLoginPass] = useContext(StateContext).User.LoginPass;
  const [UserId, setUserId] = useContext(StateContext).User.Id;
  const [UserName, setUserName] = useContext(StateContext).User.Name;

  // ---------------------
  
  return {

    Loader : async function (props) {
      const res = await axios.get(server + '/logindata')
      setUserId(res.data.miid)
      setUserName(res.data.miuser)
    },


    Logger : async function (props) {
      let axapi = await axios({
        method: "get",
        headers: { 'Access-Control-Allow-Origin': '*'},
        url: "/loginp",
        baseURL: server,
        params: {
          username: LoginName,
          password: LoginPass,
        }
      })
  
       await setUserId(axapi.data._id)
       await setUserName(axapi.data.username)
    },

     Logout : async function (props) {
      let axapi = await axios({
        method: "get",
        headers: { 'Access-Control-Allow-Origin': '*'},
        url: "/logout",
        baseURL: server,
      });
  
      await setUserId(0)
      await setUserName("")
    },

     useChange : (Field, setField) => {
      return {
        name: Field,
        value: Field,
        fontSize: 1,
        color: "#595959",
        bg: "#DCDCDC",
        onChange: e => {
          setField(e.target.value);
        }
      }
    },

  }
}


// -----------------------------------------------------------------------------

const Body = props => {
  const [Loading, setLoading] = useContext(StateContext).LoadingSecc1

 // const useData = new usedata()
  const useacciones = new useAcciones(StateContext)

// ------------

  useEffect(() => {useacciones.Loader(props) }, [])

// ------------
  try {
    return (
      <Flex sx={{width: "100%" }}>

        <Box sx={{ width: "100%" }}>

          <Head sx={{width: "100%" }}
            useContext={useContext(StateContext)}
            // useData = {useData}
            useAcciones = {useacciones}
          />

        </Box>

      </Flex>
    )
  } catch (e) {
    console.error(e);
  }
}

// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------

const MenuHeader1 = props => {
  const Estilo = useThemeUI().theme.styles;

// -------------

// ------------


// ------------
  try {

    return (

      <div
        sx={{
          display: 'grid',
          gridGap: 3,
          gridTemplateColumns: `repeat(auto-fit, minmax(64px, 1fr))`,
        }}>

        <Link sx={Estilo.menu1}
          to='/acc/login' 
        >
          Mi Cuenta
        </Link>

        <Link sx={Estilo.menu1}
          to='/acc/signup'
        >
          Menu
        </Link>
      
        <Link sx={Estilo.menu1}
          to='/acc/info'
        >
          Blog
        </Link>
      
        <Link sx={Estilo.menu1}
          to='/orders'
        >
          Contacto
        </Link>
      
      </div>
    )

  } catch (e) {
    console.error(e);
  }
}




// -----------------------------------------------------------------------------



// -----------------------------------------------------------------------------

const MenuHeader21 = props => {
  const Estilo = useThemeUI().theme.styles;

// -------------

// ------------


// ------------
  try {

    return (

      <div
        sx={{
          display: 'grid',
          gridGap: 3,
          gridTemplateColumns: `repeat(auto-fit, minmax(64px, 1fr))`,
        }}>

        <Link sx={Estilo.menu1}
          to='/acc/login' 
        >
          Iniciar Sesión
        </Link>

        <Link sx={Estilo.menu1}
          to='/acc/signup'
        >
          Registrarse
        </Link>
      
        <Link sx={Estilo.menu1}
          to='/acc/info'
        >
          Mis Datos
        </Link>
      
        <Link sx={Estilo.menu1}
          to='/orders'
        >
          Mis Pedidos
        </Link>
      
      </div>
    )

  } catch (e) {
    console.error(e);
  }
}




// -----------------------------------------------------------------------------










// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------


export default (App = props => {

  const isDesktop = useMediaQuery({ minWidth: 550 })

  return (

      <div id="App">

        {isDesktop ? <div/>
          :  <div>
              <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
            </div>                 
           
        }


        <div id="page-wrap">

          <div style={{display: 'flex',
           justifyContent: 'center'
           }}
          >
              <ContextProvider>

                <Flex bg="White"
                  sx={{
                    display: "flex",
                     flexDirection: "column",
                    width: "100%",
                    minHeight: '300vh',
                    //justifyContent: 'center'
                  }}
                 // css={{ maxWidth: "768px", minWidth: "410px" }}

                >
                  <header sx={{width: "100%"}}>
                    <Body {...props} />

                  </header>

                  <main sx={{width: "100%",
                    // flex: "1 1 auto"
                    }}
                  >


                    {isDesktop ? 
                        <div>
                          <MenuHeader1 {...props} />
                          <MenuHeader21 {...props} />
                        </div>                 
                      : <div/>
                    }




                  </main>

                </Flex>

              </ContextProvider>
          </div>

        </div>
      </div>


);
});

// -------------------------------------------------------------------------------