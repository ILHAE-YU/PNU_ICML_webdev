import { useMantineTheme, Grid, Text, Group, Avatar, UnstyledButton, Anchor, Code } from '@mantine/core';

const Footer = () => {
    const theme = useMantineTheme();
    
    return (
        <footer className="footer">

            <Grid justify="space-around">

            <Grid.Col xs={12} sm={6} md={6} lg={6}>
                    
                    
                    <Text color="white" mb="5px">
                        Room 415, Building 313, Pusan National University, 2 Busandaehak-ro 63 beon-gil, Geumjeong-gu, Busan 46241, South Korea
                    </Text>

                    <Text color="white" mb="5px">
                        TEL: +82 51-510-2292
                    </Text>

                    <Text color="#CCCCCC" mb="10px">copyright (C) PUSAN NATIONAL UNIVERSITY. All rights reaerved.</Text>

                </Grid.Col>



                <Grid.Col xs={12} sm={3} md={3} lg={3}>
                    <Code color="blue" style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 15 }}>
                        associated with
                        <Anchor href="https://www.pusan.ac.kr/kor/Main.do">
                            <UnstyledButton>
                                <Group>
                                    {/* <Avatar size={40} color="dark">ACRC</Avatar> */}
                                    <div>
                                        <Text>Graduate School of AI</Text>
                                        <Text size="xs" color="dimmed">부산광역시 금정구 부산대학로 63번길 2</Text>
                                    </div>
                                </Group>
                            </UnstyledButton>
                        </Anchor>
                    </Code>
                </Grid.Col>
                <Grid.Col xs={12} sm={3} md={3} lg={3}>
                    <Code color="blue" style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 15 }}>
                        associated with
                        <Anchor href="https://www.pusan.ac.kr/kor/Main.do">
                            <UnstyledButton>
                                <Group>
                                    {/* <Avatar size={40} color="dark">PNU</Avatar> */}
                                    <div>
                                        <Text>Pusan National University</Text>
                                        <Text size="xs" color="dimmed">부산광역시 금정구 부산대학로 63번길 2</Text>
                                    </div>
                                </Group>
                            </UnstyledButton>
                        </Anchor>
                    </Code>
                </Grid.Col>
            </Grid>
        </footer>
    )
};

export default Footer;

const redirectToLink = (link: string): void => {
    window.open(link, '_blank');
};