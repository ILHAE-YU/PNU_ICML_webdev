import { Grid, Text, Paper, Stack, Container, Title, List, Divider, Flex } from '@mantine/core';
import { Carousel} from '@mantine/carousel';
import { Accordion, useMantineTheme, Card, AspectRatio, Group } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useRef, useState, useEffect } from 'react';

interface FeaturedNews {
    imagePath: string;
    title: string;
    topText: string;
    botText: string;
    questionList: QuestionList[];
}

interface QuestionList{
    mark: string;
    question: string;
    answer: string;
}

interface News{
    imagePath: string;
    title: string;
    text: string;
    link: string;
}

interface LineNews{
    date: string;
    title: string;
    text: string;
}

interface NewsData {
    featuredNews: FeaturedNews;
    news: News[];
    lineNews: LineNews[];
  }

const RecruitSection = () => {
    const theme = useMantineTheme();
    const [newsData, setNewsData] = useState<NewsData|null>(null);

    useEffect(() => {
        fetch('home/news/news.json')
            .then((response) => response.json())
            .then((data: NewsData) => setNewsData(data))
            .catch((error) => {
                console.error('error fetching data:', error);
                }
            )
    }, []);

    if (!newsData) {
        return null;
    }

    return (
        <section id="recruit-section">
            <Text className='title' align="center">Recruit</Text>
            <Stack align='Stretch'>
            
            <Card radius="lg" shadow='xl' pb="3%">
                <Card.Section className='news-card-image'>
                    <AspectRatio ratio={16/4} >
                        <img src={newsData.featuredNews.imagePath}/>
                    </AspectRatio>
                </Card.Section>

                <Container mb="lg">
                    <Title order={3}>{newsData.featuredNews.title}</Title>

                    <Text size="xl" mb="1%" ml="3%">
                        ICML(Image Computing and Machine Learning) 연구실은 영상 관련 Algorithm, Computational Geometry, Shape Analysis, Computer Vision 그리고 영상처리를 위한 머신러닝 기법에 관하여 연구를 진행하고 있습니다. 또한, 영상계산 방법 및 기술을 다양한 의료 영상에 적용하는 의료융복합 과제를 수행 중입니다.
                    </Text>
                    <Text size="xl" ml="3%">
                        영상 처리 기술 및 머신 러닝 기술을 의료 분야에 접목하며 발생하는 도전적인 과제들을 해결하기 위해서 함께 공부하며 연구해 나갈 창의적이고 열정적인 여러분들을 기다리고 있습니다.
                    </Text>
                    <Title order={3} pt="0" style={{marginTop:"2%"}}>
                        모집 과정 및 인원
                    </Title>
                    <Text size="xl"  ml="3%">
                        박사과정 / 석박사 통합과정 / 석사과정 / 학부연구생 (각 0명)
                    </Text>
                    <Title order={3} pt="0" style={{marginTop:"2%"}}>
                        지원 방법
                    </Title>
                    <Text size="xl" ml="3%">부산대학교 AI 전공 지원(정보융합공학과) 및 이메일 송부</Text>
                    <Text size="md" ml="3%" color="grey" mb="1%">(*학부연구생은 이메일만 문의 주세요)</Text>

                    

                    <Text size="xl" ml="3%"> 지도교수 이메일 <span style={{color:"#228BE6"}}>(gahmj@pusan.ac.kr)</span> </Text> 
                    <Text size="lg" ml="5%">1. 이력서 또는 자기소개서(영문 또는 한글)</Text>
                    <Text size="lg" ml="5%">2. 성적증명서</Text>
                    <Text size="lg" ml="5%" mb="1%">3. 자유 형식의 자기 PR</Text>
                    <Text size="xl" ml="3%"> 2025학년도 정시 신입생 모집중 <a href="https://go.pusan.ac.kr/">(바로가기)</a></Text>
                        
                    <Title order={3} pt="0" style={{marginTop:"2%"}}>
                        FAQ
                    </Title>

                    <Accordion  ml="1%">
                        <Accordion.Item key={"연구실 생활이 궁금해요."} value={"연구실 생활이 궁금해요."}>
                            <Accordion.Control>
                                <Text size="xl">
                                    연구실 생활이 궁금해요.
                                </Text>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Text size="xl"  ml="2%">
                                    우리 연구실은 자유롭고 열정적인 연구 생활을 통해 연구원들의 능력을 최대한 발휘할 수 있도록 합니다.
                                </Text>
                                <List size="xl">
                                    <List.Item>지도교수와의 협의를 통한 창의적이고 도전적인 연구 주제 선정</List.Item>
                                    <List.Item>개인 논문 연구를 통한 연구 능력 함양</List.Item>
                                    <List.Item>연구 과제 참여를 통한 병원 및 기업과의 공동연구 수행</List.Item>
                                    <List.Item>주 1회 세미나를 통한 개별 논문 연구 지도</List.Item>
                                    <List.Item>자유로운 시간 관리 및 자율적인 연구활동</List.Item>
                                </List>

                            </Accordion.Panel>
                        </Accordion.Item>
                        <Accordion.Item key={"연구 환경이 알고 싶어요."} value={"연구 환경이 알고 싶어요."}>
                            <Accordion.Control>
                                <Text size="xl">
                                    연구 환경 및 혜택이 알고 싶어요.
                                </Text>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Text size="xl" ml="2%">
                                    우리 연구실은 연구원들이 연구에 집중할 수 있도록 지원하고 있습니다.
                                </Text>
                                <List size="xl">
                                    <List.Item>개인 연구 기자재(딥러닝 워크스테이션 등) 제공</List.Item>
                                    <List.Item>전일제학생 연구 인건비 지급</List.Item>
                                    <List.Item>대학원 과정 기간 등록금 및 장학금 지급</List.Item>
                                    <List.Item>국내외 저널 및 학회 참여 지원</List.Item>
                                    <List.Item>국내외 저널 및 학회 논문 인센티브 지급</List.Item>
                                    <List.Item>해외 유수 대학 인턴지원/해외유학 및 포닥 적극 장려</List.Item>
                                </List>
                            </Accordion.Panel>
                        </Accordion.Item>
                        <Accordion.Item key={"추가로 궁금한 점이나 진학에 대해 상담 하고 싶어요."} value={"추가로 궁금한 점이나 진학에 대해 상담 하고 싶어요."}>
                            <Accordion.Control>
                                <Text size="xl">
                                    궁금한 점이나 진학에 대해 상담 하고 싶어요.
                                </Text>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Text size="xl" ml="2%">
                                    연구실과 관련된 질문이나 진학 상담은 지도교수님에게 메일을 통해 문의 주세요.
                                    <br/>지도교수 이메일 <span style={{color:"#228BE6"}}>(gahmj@pusan.ac.kr)</span>
                                </Text>
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                </Container>
            </Card>
            </Stack>
        </section>
    );

};

export default RecruitSection;