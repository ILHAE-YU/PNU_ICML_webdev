import { Carousel, Embla } from '@mantine/carousel';
import { Text, Timeline, Grid, AspectRatio, Image, Stack, Group, Badge, createStyles  } from '@mantine/core';
import {useState, useCallback, useEffect } from 'react';

interface ProjectDetailLink {
    text: string;
    href: string;
  }
  
  interface ProjectDetail {
    type: 'journal'|'patent'|'conference';
    title: string;
    detail: string;
    Link?: ProjectDetailLink[];
  }
  
  interface Project {
    projectTitle: string;
    projectImagePath: string;
    projectDescription: string;
    projectDetail: ProjectDetail[];
  }
  
  interface ProjectData {
    description: string;
    main_image_path: string[];
    project: Project[];
  }

const ResearchSection = () => {

    const [scrollProgress, setScrollProgress] = useState(0);
    const [embla, setEmbla] = useState<Embla | null>(null);

    const handleScroll = useCallback(() => {
      if (!embla) return;

        var project_length = ProjectData?.project.length ?? 0;
        var n = Math.round(embla.scrollProgress() * project_length)
        if ( n == ProjectData?.project.length ){
            setScrollProgress(0)
        } else {
            setScrollProgress(n)
        }

    }, [embla, setScrollProgress]);
  
    useEffect(() => {
      if (embla) {
        embla.on('scroll', handleScroll);
        handleScroll();
      }
    }, [embla]);

    const [ProjectData, setProjectData] = useState<ProjectData|null>(null);

    useEffect(() => {
        fetch('home/project/project.json')
            .then((response) => response.json())
            .then((data: ProjectData) => setProjectData(data))
            .catch((error) => {
                console.error('error fetching data:', error);
                }
            )
        
    }, []);

    if (!ProjectData) {
        return null;
    }

    const getBadgeColor = (type: ProjectDetail['type']): string => {
        switch (type) {
          case 'journal':
            return 'blue';
          case 'patent':
            return 'orange';
          case 'conference':
            return 'green';
          default:
            return 'green';
        }
      };
      

    const CarouselSlideComponent = 
        ProjectData.project.map(
            (project) => (
                <Carousel.Slide key={project.projectImagePath}>
                    <AspectRatio ratio={4/3} style={{borderRadius:"3%", boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', border: '2px solid #ccc', backgroundColor:"white"}}>
                        <img src={project.projectImagePath} style={{borderRadius :"2%", marginBottom:"0"}}/>
                    </AspectRatio>
                </Carousel.Slide>
            )
        )


    const TimeLineComponent = ProjectData.project.map((project) =>
        project.projectDetail.map((detail) => (
            <Timeline.Item 
                title={
                    <Group style={{position:"relative", top:"-5px", flexGrow:1, width:"100%"}} spacing="xs">
                        
                        <Text style={{width:"100%"}}><Badge id={`research_badge_${detail.type}`} mr='1%'>{detail.type}</Badge>{detail.title}</Text>
                    </Group>}
                style={{fontSize:"120%"}}
                mt="2%"
            >
                <Text size="lg" c="grey" style={{position:"relative", top:"-10px"}}>
                {detail.detail}{" "}
                {detail.Link && detail.Link.length > 0 && detail.Link.filter(link => link.href).map((link) => (
                    <a href={link.href} target="_blank" key={link.href}>[{link.text}]</a>
                ))}
                </Text>
            </Timeline.Item>
        ))
        );

    return (
        <section id="research-section">

            <Text align='center' style={{fontSize:"240%"}} fw={700} mb="5%">
                Research Focus of the Laboratory
            </Text>

            <Grid mb="3%">
                <Grid.Col span={4}>
                    <AspectRatio ratio={8/5}>
                        <Image src={ProjectData.main_image_path[0]} bg="black"/>
                    </AspectRatio> 
                </Grid.Col>
                <Grid.Col span={8}>
                    <Text size="xl" align="justify">
                        In the three-dimensional enviroment we live in, there exist numerous natural such as humans and animals as well as artificial such as cars and computers structures. 
                        The visual representations of these structures can be acquired as two-dimensional or three-dimensional digital data through commonly used devices like mobile phone, cameras, or specialized scanning equipment. 
                        Technologies for separating these structures from digital images and analyzing, calculating the extracted structural data have been actively developed, particularly in recent years, with a focus on techniques utilizing machine learning, including deep learning, for classification and recognition of structures.
                    </Text>
                </Grid.Col>
            </Grid>
            <Grid>
                <Grid.Col span={8}>
                    <Text size="xl" align='justify'>
                        Our research lab is dedicated to representing diverse and complex structures through surface modeling and developing algorithms for computing matching between structures of the same category but with different shapes.
                        These shape modeling and matching techniques are utilized as core technologies in various industries relying on image-based applications, including animation, entertainment, security surveillance, robotics, and autonomous driving. 
                        In the field of healthcare, in particular, three-dimensional images obtained through techniques like magnetic resonance imaging (MRI) and computed tomography (CT) are used to model/match internal structures (such as the cerebral cortex and hippocampus in the brain) and develop systems for tracking structural changes caused by diseases and diagnosing them.
                    </Text>
                </Grid.Col>
                
                <Grid.Col span={4}>
                    <AspectRatio ratio={4/3}>
                        <Image src={ProjectData.main_image_path[1]} bg="black"/>
                    </AspectRatio>
                </Grid.Col>
            </Grid>

            <Stack mt="5%">

                <Text align='center' style={{fontSize:"240%"}} fw={700} mb="3%">
                    Detailed Projects
                </Text>

                <Carousel
                    getEmblaApi={setEmbla}
                    height={260}
                    slideGap="xl"
                    slideSize="28%"
                    withControls
                    withIndicators
                    loop
                >
                    {CarouselSlideComponent}
                </Carousel>
                <Text align="center" style={{fontSize:"160%"}} fw={700}>
                    {ProjectData.project[scrollProgress].projectTitle}
                </Text>
                <Text size="xl" align="justify">
                    {ProjectData.project[scrollProgress].projectDescription}
                </Text>

                <Timeline active={190000} id='research_timeline' color='dark'>
                    {TimeLineComponent[scrollProgress]}
                </Timeline>
            </Stack>
        </section>
    );
};

export default ResearchSection;