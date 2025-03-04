import { Text, MediaQuery, Button, useMantineTheme } from '@mantine/core';
import { MdOutlineArrowDownward } from "react-icons/md";
import { Link } from 'react-scroll';
import { useState, useEffect } from 'react';

export interface AboutData {
    topTitle: string;
    title: string;
    description: string;
  }

const About = () => {
    const theme = useMantineTheme();
    const [aboutData, setAboutData] = useState<AboutData|null>(null);

    useEffect(() => {
        fetch('home/about/about.json')
            .then((response) => response.json())
            .then((data: AboutData) => setAboutData(data))
            .catch((error) => {
                console.error('error fetching data:', error);
                }
            )
  }, []);
    if (!aboutData) {
        return null; // or loading indicator
    }
    return (
        <section id="about" style={{backgroundImage:'url("home/about/background_winter.jpg")'}}>
            <div className="about-bg-container">
            </div>
            <div className="about-content">

                <div style={{ marginBottom: 5 }}>
                    <Text className="title-top" dangerouslySetInnerHTML={{ __html: aboutData.topTitle }}></Text>
                </div>

                <div style={{ marginBottom: 15 }}>
                    <Text>
                        <MediaQuery query="(max-width: 768px)" styles={{ fontSize: '2.8rem !important' }}>
                            <h1 className="title" dangerouslySetInnerHTML={{ __html: aboutData.title }}></h1>
                        </MediaQuery>
                    </Text>
                </div>

                <div style={{ marginBottom: 10 }}>
                    <Text className="text" size="xl" color="black" dangerouslySetInnerHTML={{ __html: aboutData.description }}>                        
                    </Text>
                </div>
            </div>

            <div className="buttons">
                {/* <Link to="research-section" smooth duration={500}>
                    <Button style={{ backgroundColor: theme.colors.blue[9]}} rightIcon={<MdOutlineArrowDownward size={24} />} radius="lg" size="xl">RESEARCH</Button>
                </Link>

                <Link to="recruit-section" smooth duration={500}>
                    <Button style={{ backgroundColor: theme.colors.blue[9]}} rightIcon={<MdOutlineArrowDownward size={24} />} radius="lg" size="xl">RECRUIT</Button>
                </Link>
                <Link to="news-section" smooth duration={500}>
                    <Button style={{ backgroundColor: theme.colors.blue[9]}} rightIcon={<MdOutlineArrowDownward size={24} />} radius="lg" size="xl">NEWS</Button>
                </Link>
 */}


                {/* <Button variant="default" radius="lg" size="xl" onClick={()=> {window.location.href=process.env.PUBLIC_URL+'/contact';}}>Contact</Button> */}
            </div>


        </section>
    );
};

export default About;