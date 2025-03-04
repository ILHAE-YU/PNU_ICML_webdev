import React from 'react';
import Content from './Views/Content';
import Publication from './Views/Publication'
import People from './Views/People'
import Contact from './Views/Contact'

import Footer from './Components/Footer';
import Header from './Components/Header';

import { MantineProvider } from '@mantine/core';
import { TypographyStylesProvider } from '@mantine/core';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <MantineProvider>
      <TypographyStylesProvider>
        <Router>
          <Header/>
          <Routes>
            <Route path={process.env.PUBLIC_URL+"/"} element={<Content/>}/>
            <Route path={process.env.PUBLIC_URL+"/publication"} element={<Publication/>}/>
            <Route path={process.env.PUBLIC_URL+"/people"} element={<People/>}/>
            <Route id='contact-route' path={process.env.PUBLIC_URL+"/contact"} element={<Contact/>}/>
          </Routes>
          <Footer/>
        </Router>

      </TypographyStylesProvider>
     </MantineProvider>
  ); 
}
export default App;