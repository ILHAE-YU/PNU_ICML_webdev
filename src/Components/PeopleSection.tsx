import { Stack, Divider, Grid, Text, Image, AspectRatio } from '@mantine/core';
import { useState, useEffect } from 'react';

interface Line{
    line: string;
}

interface Contents{
    title: string;
    text: Line[];
}

interface ProfessorData{
    imagePath: string;
    name: string;
    contents: Contents[];
}

interface Research{
    area: string;
}

interface Member{
    name: string;
    imagePath: string;
    position: string;
    email: string;
    research: Research[];
}

interface MemberData{
    member: Member[];
}

interface Alumni{
    name: string;
    imagePath: string;
    position: string;
    email: string;
    research: Research[];
    employment: string;
}

interface AlumniData{
    alumni: Alumni[];
}

const PeopleSection = () => {

    const [professorData, setProfessorData] = useState<ProfessorData|null>(null);
    const [memberData, setMemberData] = useState<MemberData|null>(null);
    const [alumniData, setAlumniData] = useState<AlumniData|null>(null);

    useEffect(() => {
        fetch('people/professor/professor.json')
        .then((response) => response.json())
        .then((data:ProfessorData) => setProfessorData(data))
        .catch((error) => {
            console.error('error fetching data:', error);
            }
        )

        fetch('people/member/member.json')
        .then((response) => response.json())
        .then((data:MemberData) => setMemberData(data))
        .catch((error) => {
            console.error('error fetching data:', error);
            }
        )

        fetch('people/alumni/alumni.json')
        .then((response) => response.json())
        .then((data:AlumniData) => setAlumniData(data))
        .catch((error) => {
            console.error('error fetching data:', error);
            }
        )
    }, []);

    

    if (!professorData || !memberData || !alumniData) {
        return null;
    }

    const ProfessorCardComponent = (

            <Stack align="Stretch">
                <Text style={{fontSize:"240%"}} fw={700}>Advisor</Text>
                <Grid align="center" justify="space-between" >
                    <Grid.Col span={3} p="3%">
                        <Image src={professorData.imagePath} fit="fill"/>
                    </Grid.Col>
                    <Grid.Col span={9}>
                    <Text style={{fontSize:"180%"}} fw={700}>{professorData.name}</Text>
                    <Text style={{fontSize:"140%"}} fw={500} mt="2%">{professorData.contents[0].title}</Text>
                    <Text style={{fontSize:"110%"}}>{professorData.contents[0].text[0].line}</Text>
                    <Text style={{fontSize:"110%"}}>{professorData.contents[0].text[1].line}</Text>
                    <Text style={{fontSize:"110%"}}>{professorData.contents[0].text[2].line}</Text>
                    <Text style={{fontSize:"110%"}}>{professorData.contents[0].text[3].line}</Text>
                    <Text style={{fontSize:"140%"}} fw={500} mt="2%">{professorData.contents[1].title}</Text>
                    <Text style={{fontSize:"110%"}}>{professorData.contents[1].text[0].line}</Text>
                    <Text style={{fontSize:"110%"}}>{professorData.contents[1].text[1].line}</Text>
                    </Grid.Col>
                </Grid>
            </Stack>


    )

    const MemberCardComponent = (
        <Stack align="Stretch" mb="5%">
            <Text style={{fontSize:"240%"}} fw={700}>Member</Text>
            <Grid>
                {
                    memberData.member.map((member) => (
                        <Grid.Col span={6}>
                            <Grid>
                                <Grid.Col span={4}>
                                    <AspectRatio ratio={3/4}>
                                        <Image src={member.imagePath}/>
                                    </AspectRatio>
                                </Grid.Col>
                                <Grid.Col span={8}>
                                    <Text size="xl" fw={700}>{member.name}</Text>
                                    <Text size="md">{member.position}</Text>
                                    <Text size="md">{member.email}</Text>
                                    <Text size="xl" fw={500} mt="3%">Research Areas</Text>
                                    {
                                        member.research.map((research) => (
                                            <Text size="md">{research.area}</Text> 
                                        ))
                                    }
                                </Grid.Col>
                            </Grid>
                        </Grid.Col>
                    ))
                }
            </Grid>
        </Stack>
    )

    const AlumniCardComponent = (
        <Stack align="Stretch" mb="10%">
            <Text style={{fontSize:"240%"}} fw={700}>Alumni</Text>
            <Grid>
                {
                    alumniData.alumni.map((alumni) => (
                        <Grid.Col span={6}>
                            <Grid>
                                <Grid.Col span={4}>
                                    <AspectRatio ratio={3/4}>
                                        <Image src={alumni.imagePath}/>
                                    </AspectRatio>
                                </Grid.Col>
                                <Grid.Col span={8}>
                                    <Text size="xl" fw={700}>{alumni.name}</Text>
                                    <Text size="md">{alumni.position}</Text>
                                    <Text size="md">{alumni.email}</Text>
                                    <Text size="xl" fw={500} mt="3%">Research Areas</Text>
                                    {
                                        alumni.research.map((research) => (
                                            <Text size="md">{research.area}</Text> 
                                        ))
                                    }
                                    <Text size="xl" fw={500} mt="3%">Employment</Text>
                                    <Text size="md">{alumni.employment}</Text>
                                </Grid.Col>
                            </Grid>
                        </Grid.Col>
                    ))
                }
            </Grid>
        </Stack>


    )
    return (
        <section id="people-section">            
            <Stack mt="10%">
                {ProfessorCardComponent}
                <Divider my="sm" variant="dashed" />
                {MemberCardComponent}
                <Divider my="sm" variant="dashed" />
                {AlumniCardComponent}
            </Stack>
        </section>
    );
};

export default PeopleSection;