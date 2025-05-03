import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom'; // 추가

const Header = () => {
    //const theme = useMantineTheme();
    const [opened, setOpened] = React.useState(false);    

    return (
        <header className="header">
            <div className="content-desktop">
                <div className='banner'>
                    <HashLink smooth to="/">IC&ML</HashLink>
                    {/* <HashLink smooth to="/#/?popup=true">IC&ML</HashLink> */}
                </div>

                <div className="navbar">
                    <div className="navbar-item"><HashLink smooth to="/#about">Home</HashLink></div>
                    <div className="navbar-item"><HashLink smooth to="/#research-section">Research</HashLink></div>
                    <div className="navbar-item"><HashLink smooth to="/#recruit-section" >Recruit</HashLink></div>
                    <div className="navbar-item"><HashLink smooth to="/#news-section" >News</HashLink></div>
                    <div className="navbar-item"><HashLink to="/publication">Publication</HashLink></div>
                    <div className="navbar-item"><HashLink to="/people">People</HashLink></div>
                    <div className="navbar-item"><HashLink to="/contact">Contact</HashLink></div>
                    {/* <div className="navbar-item"><Link to="/publication">Publication</Link></div>
                    <div className="navbar-item"><Link to="/people">People</Link></div>
                    <div className="navbar-item"><Link to="/contact">Contact</Link></div> */}
                </div>
            </div>
        </header>
    );
};

export default Header;