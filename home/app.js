import React, { useState, useEffect, useContext, createContext, Suspense } from "react"


// ---------- styles
  /** @jsx jsx */ 
  import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
  import { Flex, Box, Button, Text, Image, Spinner } from "@theme-ui/components"
  //import Theme from "../css/cssui/theme"
  import "@babel/polyfill"
  //import "../src/styles.css";




  let Theme
  let App;
  const StateContextM = createContext();

// -----------------------------------------------------------------------------



const useStateUniv = () => {
  return {
    Theme: useState(useContext(createContext(Theme))),

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


// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>

      <ContextProvider bg="#000000">
        <Flex bg="#000000"
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

            {/* <Encabezado {...props} texto="Inscripción" /> */}
          </header>

          <main sx={{width: "100%",flex: "1 1 auto"}}>
            {/* <CatalogoProductos {...props} />
            <Info {...props} />
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




// export default function App() {
//   return (
//     <div className="App">
//       <h1>Sushi Factory app</h1>

//     </div>
//   );
// }
