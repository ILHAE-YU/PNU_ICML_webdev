import { Grid, Text, Paper, Stack, Image } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useMantineTheme, Card } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useRef, useState, useEffect, useCallback } from 'react';

interface FeaturedNews {
    imagePath: string;
    title: string;
    topText: string;
    botText: string;
    questionList: QuestionList[];
}

interface QuestionList {
    mark: string;
    question: string;
    answer: string;
}

interface News {
    imagePath: string;
    title: string;
    date: string;
    text: string;
    link: string;
}

interface LineNews {
    date: string;
    title: string;
    text: string;
}

interface NewsData {
    featuredNews: FeaturedNews;
    news: News[];
    lineNews: LineNews[];
}

const NewsSection = () => {
    const theme = useMantineTheme();
    const autoplay = useRef(Autoplay({ delay: 2000 }));
    const viewport = useRef<HTMLDivElement>(null);
    const [newsData, setNewsData] = useState<NewsData | null>(null);
    const [visibleNewsCount, setVisibleNewsCount] = useState(10);
    const [loading, setLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('home/news/news.json');
                const data: NewsData = await response.json();
                console.log('Data fetched successfully:', data);
                setNewsData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const loadMoreNews = useCallback(() => {
        if (!loading && newsData && visibleNewsCount < newsData.news.length) {
            setLoading(true);
            console.log('Loading more news...');
            setVisibleNewsCount((prevCount) => {
                const newCount = prevCount + 10;
                console.log('New visibleNewsCount:', newCount);
                return newCount;
            });
            setLoading(false);
        }
    }, [loading, newsData, visibleNewsCount]);

    const handleScroll = useCallback((entries: IntersectionObserverEntry[]) => {
        const target = entries[0];
        console.log('IntersectionObserver entries:', entries);
        if (target.isIntersecting) {
            console.log('Reached the bottom of the page');
            loadMoreNews();
        }
    }, [loadMoreNews]);

    useEffect(() => {
        if (viewport.current) {
            observer.current = new IntersectionObserver(handleScroll, {
                root: null,
                rootMargin: '0px',
                threshold: 1.0,
            });

            observer.current.observe(viewport.current);
            console.log('Observer is set on viewport:', viewport.current);

            return () => {
                if (viewport.current && observer.current) {
                    observer.current.unobserve(viewport.current);
                    console.log('Observer is removed from viewport:', viewport.current);
                }
            };
        }
    }, [handleScroll]);

    useEffect(() => {
        console.log('Rendering newsData:', newsData);
        console.log('Current visibleNewsCount:', visibleNewsCount);
    }, [newsData, visibleNewsCount]);

    if (!newsData) {
        return <div>Loading...</div>;
    }

    const lineNewsComponent2 = newsData.lineNews.map((item, index) => (
        <Carousel.Slide
            key={index}
            style={{ display: 'flex', flexDirection: 'column', height: '100vh', margin: '5px 0' }}
        >
            <Grid className='line-news' justify="space-between" align="stretch" style={{ flex: 1 }}>
                <Grid.Col span={2} style={{ display: 'flex', flexDirection: 'column' }}>
                    <Paper className='line-news-dt' radius="lg" shadow='sm' style={{ flex: 1}}>
                        <Text size="lg" fw={700} ta="center" c="white">
                            {item.date}
                        </Text>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={10} style={{ display: 'flex', flexDirection: 'column' }}>
                    <Paper className='line-news-content' radius="lg" style={{ flex: 1 }}>
                        <Text size="lg" fw={500} pl="xs">
                            <b>{item.title}</b> {item.text}
                        </Text>
                    </Paper>
                </Grid.Col>
            </Grid>
        </Carousel.Slide>
    ));

    const visibleNews = newsData.news.slice(0, visibleNewsCount);
    const newsDataChunks: JSX.Element[][] = [[], [], []];

    visibleNews.forEach((item, index) => {
        const chunkIndex = index % 3;
        newsDataChunks[chunkIndex].push(
            <Card key={index}>
                <Card.Section>
                    <Image src={item.imagePath} />
                </Card.Section>
                <Text mt="3%" fw={700} size="xl">{item.title}</Text>
                <Text c="grey" size="lg">{item.date} {item.link ? <a href={item.link}>(link)</a> : null}</Text>
                <Text size="lg" align="justify">{item.text}</Text>
            </Card>
        );
    });

    return (
        <section id="news-section">
            <Text className='title' align="center">NEWS</Text>
            <Stack align='Stretch'>
                <Carousel
                    plugins={[autoplay.current]}
                    align="start"
                    orientation="vertical"
                    height={160}
                    slideSize="20%"
                    loop
                    withControls={false}
                    styles={{
                        controls: {
                            right: 20,
                            transform: 'translateX(50%)',
                        }
                    }}
                >
                    {lineNewsComponent2}
                </Carousel>
                <Grid>
                    <Grid.Col span={4}>
                        <Stack>
                            {newsDataChunks[0]}
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Stack>
                            {newsDataChunks[1]}
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Stack>
                            {newsDataChunks[2]}
                        </Stack>
                    </Grid.Col>
                </Grid>
                <div ref={viewport} style={{ height: '1px' }}></div>
            </Stack>
        </section>
    );
};

export default NewsSection;
