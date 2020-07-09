import React from 'react';
import MainRouter from './MainRouter'
import {BrowserRouter} from 'react-router-dom' //to import and do react-router-dom browser functionality
const App= () =>(
  <BrowserRouter>
    <MainRouter/>
  </BrowserRouter>
)

export default App;

//bootstrap material to be used
//visit react-router-dom and install it and learn more about it otoo
//react-router-dom is used to create a router as well as wrapper for all the pages to the app
//we create a MainRouter.js which routes to different pages for example Home.js
//core folder contains Home.js which has home component 
//every page will have their corresponding component , home page will have home component
