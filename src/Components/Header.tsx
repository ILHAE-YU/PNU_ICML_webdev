import React from 'react';
import { HashLink } from 'react-router-hash-link';

const Header = () => {
    //const theme = useMantineTheme();
    const [opened, setOpened] = React.useState(false);    

    return (
        <header className="header">
            <div className="content-desktop">
                <div className='banner'>
                    <HashLink smooth to="/">IC&ML</HashLink>
                </div>

                <div className="navbar">
                    <div className="navbar-item"><HashLink smooth to="/#about">Home</HashLink></div>
                    <div className="navbar-item"><HashLink smooth to="/#research-section">Research</HashLink></div>
                    <div className="navbar-item"><HashLink smooth to="/#recruit-section" >Recruit</HashLink></div>
                    <div className="navbar-item"><HashLink smooth to="/#news-section" >News</HashLink></div>
                    <div className="navbar-item"><HashLink to="/publication">Publication</HashLink></div>
                    <div className="navbar-item"><HashLink to="/people">People</HashLink></div>
                    <div className="navbar-item"><HashLink to="/contact">Contact</HashLink></div>
                </div>
            </div>
        </header>
    );
};

export default Header;