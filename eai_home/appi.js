import React, { useState, useEffect, useContext, createContext, Suspense } from "react"
import axios from "axios"




// ---------- styles
  /** @jsx jsx */ 
  import { ThemeProvider, jsx, Styled, useThemeUI, MenuButton } from "theme-ui"
  import { Grid, Flex, Box, Button, Text, Image, Spinner, Input } from "@theme-ui/components"

  import Theme from "./theme"
  import "@babel/polyfill"

  import { useMediaQuery } from 'react-responsive'
  import { Router, Link } from "@reach/router"




  import Head from "./head"
  import UsedataHome from "./usedata"
  import Menu from "./menu"

  import SideBar from "./sidebar";
  import "./styles.css";



  import Login from "./login"

  
  let App;
  const StateContext = createContext();

// -----------------------------------------------------------------------------
// ---------------

  let server = "https://sushifactory.app"



const useStateUniv = () => {
  return {
    Theme: useState(useContext(createContext(Theme))),
    LoadingSecc1: useState(useContext(createContext(false))),
    Empresa: useState(useContext(createContext(1))),

    Menu: {
      onMenu: useState(useContext(createContext(false))),
      Selected: useState(useContext(createContext(0))),
    },

    User: {
      Id: useState(useContext(createContext(null))),
      Name: useState(useContext(createContext(null))),
      Sucursal: useState(useContext(createContext(0))),
      LoginName: useState(useContext(createContext(""))),
      LoginPass: useState(useContext(createContext(""))),
      Status: useState(useContext(createContext(""))),

    },

    Signup: {
      Id: useState(useContext(createContext(null))),
      Name: useState(useContext(createContext(null))),
      LoginName: useState(useContext(createContext(""))),
      LoginPass: useState(useContext(createContext(""))),
    },

    Images: {
      Logo1: useState(useContext(createContext({src: "https://smxai.net/sf/sflogo1.jpg"}))),
      Logo2: useState(useContext(createContext({src: "https://smxai.net/sf/sflogo2.jpg"}))),
      Flechad: useState(useContext(createContext({src: "https://smxai.net/sf/cs1/arrowd1.png"}))),
      Flechau: useState(useContext(createContext({src: "https://smxai.net/sf/cs1/arrowu1.png"}))),
      Ayuda: useState(useContext(createContext({src: "https://smxai.net/sf/cs1/ayuda.jpg"}))),
      Icon1: useState(useContext(createContext({src: "https://smxai.net/sf/cs1/avatar.jpg"}))),
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
  const [Sucursal, setSucursal] = useContext(StateContext).User.Sucursal;
  const [Status, setStatus] = useContext(StateContext).User.Status;

  // ---------------------
  

  return {

     getUser : async (props) => {
      try {
        const res = await axios.get(server + '/logindata')
        setUserId(res.data.miid)
        setUserName(res.data.miuser)
        setSucursal(res.data.misucursal)

      } catch (e) { console.error(e) }
    },


    Loader : async function (props) {
      this.getUser()
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
  
      if(axapi.data._id) {
       await setUserId(axapi.data._id)
       await setUserName(axapi.data.username)

      } else {
         setStatus("Usuario o pass incorrectos")
      }







    },

     Logout : async function (props) {
      let axapi = await axios({
        method: "get",
        headers: { 'Access-Control-Allow-Origin': '*'},
        url: "/logout",
        baseURL: server,
      });
  
      await setUserId(null)
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

const HeaderBody = props => {
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

          <Router>
            <Login 
              path=":login"  
              useContext={useContext(StateContext)}
              useAcciones = {useacciones}
            />
            {/* <Signup 
              path="/acc/signup"
              useContext={useContext(StateContext)}
              useAcciones = {useacciones}
            />

            <Info 
              path="/acc/info"
              useContext={useContext(StateContext)}
              useAcciones = {useacciones}
            /> */}


          </Router>

        </Box>

      </Flex>
    )
  } catch (e) {
    console.error(e);
  }
}

// -----------------------------------------------------------------------------


const MenuBody = props => {
  const Estilo = useThemeUI().theme.styles;
  // const usestatus = new useStatus(StateContext)
  const useacciones = new useAcciones(StateContext)

// ------------
try {

  return (
    <Flex sx={{width: "100%" }}>

      <Box sx={{ width: "100%" }}>

        <Menu 
          useContext={useContext(StateContext)}
          useAcciones = {useacciones}
          //useStatus = {usestatus}
        />

      </Box>

    </Flex>
    )

  } catch (e) {
    console.error(e);
  }
}








// -----------------------------------------------------------------------------

// const MenuHeader1 = props => {
//   const Estilo = useThemeUI().theme.styles;
//   const [MenuSelected, setMenuSelected] = useContext(StateContext).Menu.Selected
//   const [onMenu, setonMenu] = useContext(StateContext).Menu.onMenu

// // -------------

// // ------------


// // ------------
//   try {

//     return (

//     <div
//       sx={{ width: "100%" }}
//       onMouseOver={() => { setonMenu(true)}}
//       onMouseLeave={() => { 
//         setonMenu(false)
//         setMenuSelected(0)
//       }}
//     >
//       <div
//         sx={{
//           display: 'grid',
//           gridGap: 3,
//           gridTemplateColumns: `repeat(auto-fit, minmax(64px, 1fr))`,
//         }}
//       >

//         <Link sx={Estilo.menu1}
//           to='/' 
//           onMouseOver={() => { setMenuSelected(1)}}
//         >
//           Mi Cuenta
//         </Link>

//         <Link sx={Estilo.menu1}
//           to='/' 
//           onMouseOver={() => { setMenuSelected(2)}}
//          >
//           Mis Pedidos
//         </Link>
      
//         <Link sx={Estilo.menu1}
//           to='/' 
//           onMouseOver={() => { setMenuSelected(3)}}
//          >
//           Blog
//         </Link>
      
//         <Link sx={Estilo.menu1}
//           to='/' 
//           onMouseOver={() => { setMenuSelected(4)}}
//         >
//           Contacto
//         </Link>

//       </div>

//       <MenuHeader21 {...props} />

//     </div>

//     )

//   } catch (e) {
//     console.error(e);
//   }
// }




// // -----------------------------------------------------------------------------



// // -----------------------------------------------------------------------------

// const MenuHeader21 = props => {
//   const Estilo = useThemeUI().theme.styles;

//   const [MenuSelected, setMenuSelected] = useContext(StateContext).Menu.Selected
//   const [onMenu, setonMenu] = useContext(StateContext).Menu.onMenu


// // -------------



// const SubMenu1  = () => {

//   return (
  
//     <div
//       sx={{
//         display: 'grid',
//         gridGap: 3,
//         gridTemplateColumns: `repeat(auto-fit, minmax(64px, 1fr))`,
//         height: "34px",
//         alignItems: "center",
//       }}>

//       <Link sx={Estilo.menu1}
//         to='/login' 
//       >
//         Iniciar Sesión
//       </Link>

//       <Link sx={Estilo.menu1}
//         to='/acc/signup'
//       >
//         Registrarse
//       </Link>
    
//       <Link sx={Estilo.menu1}
//         to='/acc/info'
//       >
//         Mis Datos
//       </Link>
    
//       <Link sx={Estilo.menu1}
//         to='/orders'
//       >
//         Mis Pedidos
//       </Link>
    
//     </div>

//   )

// }

// // ------------

// const SubMenu2  = () => {

//   return (
  
//     <div
//       sx={{
//         display: 'grid',
//         gridGap: 3,
//         gridTemplateColumns: `repeat(auto-fit, minmax(64px, 1fr))`,
//         height: "34px",
//         alignItems: "center",
//       }}>


//       <Link sx={Estilo.menu1}
//         to='/' 
//       >
//       </Link>



//       <Link sx={Estilo.menu1}
//         to='/login' 
//       >
//         Ver mis pedidos
//       </Link>

//       <Link sx={Estilo.menu1}
//         to='/acc/signup'
//       >
//         Nuevo Pedido
//       </Link>
    
//       <Link sx={Estilo.menu1}
//         to='/' 
//       >
        
//         </Link>



//     </div>

//   )

// }

// // ------------





// const SubMenu0  = () => {

//   return (
  
//     <div
//       sx={{
//         display: 'grid',
//         gridGap: 3,
//         gridTemplateColumns: `repeat(auto-fit, minmax(64px, 1fr))`,
//         height: "34px",
//         alignItems: "center",
//       }}>


//     </div>

//   )

// }

// // ------------


// const SubMenuArmar  = (MenuSelected, onMenu) => {

//   if (MenuSelected===1 & onMenu) {return SubMenu1()}
//   if (MenuSelected===2 & onMenu) {return SubMenu2()}
//   return SubMenu0()
// }

// // ------------



// // ------------
//   try {

//     return (
//       <div>
//         {SubMenuArmar(MenuSelected, onMenu)}
//       </div>
//     )

//   } catch (e) {
//     console.error(e);
//   }
// }




// // -----------------------------------------------------------------------------










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
                    <HeaderBody {...props} />

                    {isDesktop ? 
                        <div>
                          {/* <MenuHeader1 {...props} /> */}

                          <MenuBody {...props} />

                        </div>                 
                      : <div/>
                    }


                  </header>

                  <main sx={{width: "100%",
                    // flex: "1 1 auto"
                    }}
                  >


                    <Body {...props} />





                  </main>

                </Flex>

              </ContextProvider>
          </div>

        </div>
      </div>


);
});

// -------------------------------------------------------------------------------