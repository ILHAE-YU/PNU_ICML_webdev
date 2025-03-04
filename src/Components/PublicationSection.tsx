import { useState, useRef, useEffect } from 'react';
import { ScrollArea, Card, TextInput, Badge } from '@mantine/core';

interface Pblc{
    type: string;
    title: string;
    authors: string;
    link: string;
    pdf: string;
    academy: string;
    volueIssuePage: string;
    date: string;
}

interface PublicationData {
    publications: Pblc[];
}

const PublicationSection = () => {
    const viewportRef = useRef<HTMLDivElement>(null);
    const [query, setQuery] = useState('');
    const [publicationData, setPublicationData] = useState<PublicationData|null>(null);

    useEffect(() => {
        fetch('publication/publication.json')
            .then((response) => response.json())
            .then((data: PublicationData) => setPublicationData(data))
            .catch((error) => {
                console.error('error fetching data:', error);
                }
            )
    }, []);

    if (!publicationData) {
        return null;
    }

    const filtered = publicationData.publications.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
    const items = filtered.map((item, index) => {
        if (item.type == 'journal'){
            return (
                <Card className='card' shadow='sm' radius='md' withBorder mb='5px'>
                    <div>
                    <Badge id="publication_journal_badge" size='xl'> {item.type} </Badge>
                        <text className='title'> {item.title} </text>
                        <a href={item.link} target='_blank'>[Link]</a> <a href={item.pdf} target='_blank'>[preprint]</a> 
                    </div>
                        <text> {item.authors}. <i>{item.academy}</i>, {item.volueIssuePage}, {item.date}</text>
                </Card>
            );
        } else if (item.type == 'conference'){
            return (
                <Card className='card' shadow='sm' radius='md' withBorder mb='5px'>
                    <div>
                    <Badge id="publication_conference_badge" size='xl'> {item.type} </Badge>
                        <text className='title'> {item.title} </text>
                    </div>
                    <text> {item.authors}. <i>{item.academy}</i>, {item.date}</text>
                </Card>
            );
        } else {
            return
        }
    });

    return (
        <section id="publication-section">
            <TextInput
                mt="5%"
                size='xl'
                value={query}
                onChange={(event) => {
                    setQuery(event.currentTarget.value);
                }}
                placeholder="Search for Publications with title!"
            />

            <ScrollArea className='scroll-area' type="always" mt="md" viewportRef={viewportRef}>
                {items}
            </ScrollArea>
        </section>
    );
};

export default PublicationSection;