import React, { useEffect, useState } from 'react';
import { MantineProvider, TypographyStylesProvider, Modal } from '@mantine/core';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Content from './Views/Content';
import Publication from './Views/Publication'
import People from './Views/People'
import Contact from './Views/Contact'
import Footer from './Components/Footer';
import Header from './Components/Header';

function PopupWatcher() {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const { pathname, hash } = location;
    const isHomeRoute = pathname === '/' && (hash === '' || hash === '#' || hash === '#/');

    setShowPopup(isHomeRoute);
  }, [location]);

  return (
    <Modal 
      opened={showPopup} 
      onClose={() => setShowPopup(false)} 
      withCloseButton={false}
      centered 
      size="90%"
    >
      <div>
      <img
        src="/modal/recruit.png"
        alt="팝업 이미지"
        style={{
          // height: "30%",
          width: "100%",
          objectFit: 'cover'
        }}
      />
      </div>
    </Modal>
  );
}

function App() {
  return (
    <MantineProvider>
      <TypographyStylesProvider>
        <Router>
          <PopupWatcher />
          <Header />
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/publication" element={<Publication />} />
            <Route path="/people" element={<People />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </Router>
      </TypographyStylesProvider>
    </MantineProvider>
  );
}

export default App;
