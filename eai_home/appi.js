import React, { useState, useEffect, useContext, createContext, Suspense } from "react"

import axios from "axios";




// ---------- styles
  /** @jsx jsx */ 
  import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
  import { Grid, Flex, Box, Button, Text, Image, Spinner, Input } from "@theme-ui/components"
  import Theme from "./theme"
  import "@babel/polyfill"
  //import "../src/styles.css";


  import UsedataHome from "./usedata"


  
  let App;
  const StateContextM = createContext();

// -----------------------------------------------------------------------------


  let server = "https://sushifactory.app"



const useStateUniv = () => {
  return {
    Theme: useState(useContext(createContext(Theme))),
    LoadingSecc1: useState(useContext(createContext(false))),
    Empresa: useState(useContext(createContext(1))),




    User: {
      Id: useState(useContext(createContext(0))),
      Name: useState(useContext(createContext(0))),
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
  // let xTheme = useState(useContext(CtxTheme))
  return (
    <StateContextM.Provider value={useStateUniv()}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </StateContextM.Provider>
  );
};

// -----------------------------------------------------------------------------

const Encabezado = props => {

  const [Loading, setLoading] = useContext(StateContextM).LoadingSecc1;

  const [UserId, setUserId] = useContext(StateContextM).User.Id;
  const [UserName, setUserName] = useContext(StateContextM).User.Name;


  let Loader = async function (props) {
    const res = await axios.get(server + '/logindata');
    setUserId(res.data.miid)
    setUserName(res.data.miuser)

    //console.log({data: res.data})
    console.log({UserId, UserName})
  }





// ------------

useEffect(() => {Loader(props) }, [])

// ------------
  try {

    return (

      <Flex bg="#000000" sx={{ height: "34px", width: "100%" }}>


        {Loading ? <Spinner size={17} ml={3} /> : 

         
            <Flex sx={{ height: "34px", width: "100%" }}>

              <Box sx={{ width: "100%" }}>

              {UserName}

              </Box>

            </Flex>
          
        }
      </Flex>


    )
    
  } catch (e) {
    console.error(e);
  }
}




// -----------------------------------------------------------------------------

const Info = props => {
  const Estilo = useThemeUI().theme.styles;

  const [Loading, setLoading] = useContext(StateContextM).LoadingSecc1;

  const [LoginName, setLoginName] = useContext(StateContextM).User.LoginName;
  const [LoginPass, setLoginPass] = useContext(StateContextM).User.LoginPass;
  const [UserId, setUserId] = useContext(StateContextM).User.Id;
  const [UserName, setUserName] = useContext(StateContextM).User.Name;


  let Logger = async function (props) {

    let axapi = await axios({
      method: "get",
      headers: { 
        'Access-Control-Allow-Origin': '*'
       },
      url: "/loginp",
      baseURL: server,
      params: {
        username: LoginName,
        password: LoginPass,
      }
    });

    console.log({axapi})

    console.log({data: axapi.data})

     await setUserId(axapi.data._id)
     await setUserName(axapi.data.username)

    //console.log({UserId, UserName})
  }


  let Logout = async function (props) {

    let axapi = await axios({
      method: "get",
      headers: { 
        'Access-Control-Allow-Origin': '*'
       },
      url: "/logout",
      baseURL: server,
    });

    await setUserId(0)
    await setUserName("")

  }


  const useChange = (Field, setField) => {
    return {
      name: Field,
      value: Field,
      fontSize: 1,
      color: "#595959",
      bg: "#DCDCDC",
      onChange: e => {
        setField(e.target.value);
      }
    };
  };


// ------------

//useEffect(() => {Loader(props) }, [])

// ------------
  try {

    return (

      <Flex  sx={{width: "100%" }}>

        {Loading ? <Spinner size={17} ml={3} /> : 

          <Grid bg="WhiteSmoke" css={{ maxWidth: "610px" }}>

            <Flex sx={{ width: "100%" }}>

              <Box sx={{ width: "100%" }}>


              <Flex sx={{ width: "100%", alignItems: 'center', mb: 3 }}>
                <Box sx={{ width: "20%"}}>
                  <Text sx={Estilo.h2b} >Tel</Text>
                </Box>
                <Box sx={{ width: "70%" }}>
                  <Input {...useChange(LoginName, setLoginName)}/>
                </Box>
              </Flex>


              <Flex sx={{ width: "100%", alignItems: 'center', mb: 3 }}>
                <Box sx={{ width: "20%"}}>
                  <Text sx={Estilo.h2b} >Pass</Text>
                </Box>
                <Box sx={{ width: "70%" }}>
                  <Input {...useChange(LoginPass, setLoginPass)}/>
                </Box>
              </Flex>

              </Box>

            </Flex>


              <Box sx={{ width: "70%" }}>

                  <Button sx={{ width: "100%", height: "34px" }}
                    width={1}
                    bg={"gray"}
                    //disabled={EnableBoton()}
                    onClick={async () => {

                      await Logger()

                      // setLoadingSecc(true)
                      // await props.useAcciones.InfoAdd(props.Referido)
                      // setLoadingSecc(false)
                    }}
                  >
                     <Text sx={Estilo.mbtn1}>
                       Entrar
                      </Text>

                  </Button>

              </Box>


              <Box sx={{ width: "70%" }}>

                  <Button sx={{ width: "100%", height: "34px" }}
                    width={1}
                    bg={"gray"}
                    //disabled={EnableBoton()}
                    onClick={async () => {

                      await Logout()

                    }}
                  >
                     <Text sx={Estilo.mbtn1}>
                       Cerrar Sesión
                      </Text>

                  </Button>

              </Box>

          </Grid>
        }
      </Flex>


    )
    
  } catch (e) {
    console.error(e);
  }
}


// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------

const Signup = props => {
  const Estilo = useThemeUI().theme.styles;
  const [Loading, setLoading] = useContext(StateContextM).LoadingSecc1;

   const UsedataHomeMx = new UsedataHome()
  const [Empresa, setEmpresa] = useContext(StateContextM).Empresa;


  const [LoginName, setLoginName] = useContext(StateContextM).Signup.LoginName;
  const [LoginPass, setLoginPass] = useContext(StateContextM).Signup.LoginPass;
  const [UserId, setUserId] = useContext(StateContextM).Signup.Id;
  const [UserName, setUserName] = useContext(StateContextM).Signup.Name;

  const [LoadingButton1, setLoadingButton1] = useState(useContext(createContext(false)))



  let Logger = async function (props) {

    let axapi = await axios({
      method: "get",
      headers: { 
        'Access-Control-Allow-Origin': '*'
       },
      url: "/loginp",
      baseURL: server,
      params: {
        username: LoginName,
        password: LoginPass,
      }
    });

    console.log({axapi})

    console.log({data: axapi.data})

     await setUserId(axapi.data._id)
     await setUserName(axapi.data.username)

    //console.log({UserId, UserName})
  }




  let SignUp = async function (props) {

    let Cliente = await UsedataHomeMx.Clientes().get({Telefono: LoginName, Empresa: Empresa})

    if (Cliente.length===0){

      let InsertCliente = await UsedataHomeMx.Clientes().insert({
        Empresa: Empresa,
        Origen: "Registro",
        Telefono: LoginName,
        Pass: LoginPass,
      })

      console.log({InsertCliente})
      if (InsertCliente>0) {return 1}

    } else {
       console.log({Cliente})
      return 0
    }







    // console.log({data: axapi.data})

    //  await setUserId(axapi.data._id)
    //  await setUserName(axapi.data.username)

    //console.log({UserId, UserName})
  }


  const useChange = (Field, setField) => {
    return {
      name: Field,
      value: Field,
      fontSize: 1,
      color: "#595959",
      bg: "#DCDCDC",
      onChange: e => {
        setField(e.target.value);
      }
    };
  };


// ------------

//useEffect(() => {Loader(props) }, [])

// ------------
  try {

    return (

      <Flex  sx={{width: "100%" }}>

        {Loading ? <Spinner size={17} ml={3} /> : 

          <Grid bg="WhiteSmoke" css={{ maxWidth: "610px" }}>

            <Flex sx={{ width: "100%" }}>

              <Box sx={{ width: "100%" }}>


              <Flex sx={{ width: "100%", alignItems: 'center', mb: 3 }}>
                <Box sx={{ width: "20%"}}>
                  <Text sx={Estilo.h2b} >Tel</Text>
                </Box>
                <Box sx={{ width: "70%" }}>
                  <Input {...useChange(LoginName, setLoginName)}/>
                </Box>
              </Flex>


              <Flex sx={{ width: "100%", alignItems: 'center', mb: 3 }}>
                <Box sx={{ width: "20%"}}>
                  <Text sx={Estilo.h2b} >Pass</Text>
                </Box>
                <Box sx={{ width: "70%" }}>
                  <Input {...useChange(LoginPass, setLoginPass)}/>
                </Box>
              </Flex>

              </Box>

            </Flex>

            <Flex sx={{ width: "100%", alignItems: 'center', mb: 3 }}>

              <Box sx={{ width: "70%" }}>

                  <Button sx={{ width: "100%", height: "34px" }}
                    width={1}
                    bg={"gray"}
                    disabled={LoadingButton1 ? true : false}
                    onClick={async () => {
                      setLoadingButton1(true)
                      let MiSignUp = await SignUp()
                      setLoadingButton1(false)
                    }}
                  >
                     <Text sx={Estilo.mbtn1}>
                       Registrar 
                      </Text>

                  </Button>
              </Box>

              <Box sx={{ width: "30%" }}>
                {LoadingButton1 ? <Spinner size={17} ml={3} /> : <div/>}
              </Box>


            </Flex>



          </Grid>
        }
      </Flex>


    )
    
  } catch (e) {
    console.error(e);
  }
}


// -----------------------------------------------------------------------------





// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>

      <ContextProvider>
        <Flex bg="DimGrey"
          sx={{
            display: "flex",
            flexDirection: "column",
            // set this to `minHeight: '100vh'` for full viewport height
            minHeight: '100vh',
            justifyContent: 'center'
          }}
          css={{ maxWidth: "610px" }}
          // style={{display: 'flex', justifyContent: 'center'}}
        >
          <header sx={{width: "100%"}}>
            <h1>Sushi Factory app</h1>
            <Encabezado {...props} />

          </header>

          <main sx={{width: "100%",flex: "1 1 auto"}}>

            <Info {...props} />
            <Signup {...props} />


            {/* <CatalogoProductos {...props} />
            <Cupon {...props} />
            <Sponsor {...props} />
            <Orden {...props} />
            <Pago {...props} />
            <Roll {...props} /> */}
          </main>

        </Flex>
      </ContextProvider>

    </div>
);
});

// -------------------------------------------------------------------------------