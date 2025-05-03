import { Wrapper } from '@googlemaps/react-wrapper';
import { Divider, Paper, Group, Stack, Input, Textarea,Button } from '@mantine/core';
import React, { useRef, FormEvent, useState } from 'react';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import {toast, ToastContainer} from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export const Container = styled(ToastContainer)`
  .Toastify__toast {
    font-size: 24px;
    font-weight:600;
    padding-bottom: 10px;
    width:400px;
  }

  .Toastify__toast-icon {
    width: 32px;
    height: 32px;
  }

`;


export const ContactForm: React.FC = () => {

    const form = useRef<HTMLFormElement>(null);

    const sendEmail = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
  
       if (form.current) {
            const nameInput = form.current.querySelector<HTMLInputElement>('input[name="name"]');
            const emailInput = form.current.querySelector<HTMLInputElement>('input[name="email"]');
            const textArea = form.current.querySelector<HTMLTextAreaElement>('textarea[name="text"]');

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValidEmail = emailInput?.value.match(emailRegex);

        if (!nameInput?.value) {
            toast.error('Name is required!', {position: toast.POSITION.TOP_CENTER});
            return;
        }

        if (!emailInput?.value) {
            toast.error('E-mail is required', {position: toast.POSITION.TOP_CENTER});
            return;
        }

        if (!isValidEmail) {
            toast.error('Invalid email format', {position: toast.POSITION.TOP_CENTER});
            return;
        }

        if (!textArea?.value.trim()) {
            toast.error('Message is required!', { position: toast.POSITION.TOP_CENTER });
            return;
        }

        const lastSubmissionTime = localStorage.getItem('lastSubmissionTime');
        const currentTime = new Date().getTime();
        const fiveMinutes = 5 * 60 * 1000; // 5 minutes
        
        if (lastSubmissionTime) {
            const elapsedTime = currentTime - parseInt(lastSubmissionTime, 10);

            if (elapsedTime < fiveMinutes) {
                const remainingTime = fiveMinutes - elapsedTime;
                const remainingTimeInMinutes = Math.ceil(remainingTime / (60 * 1000));
                toast.error(`You can submit again in ${remainingTimeInMinutes} minutes.`, {
                    position: toast.POSITION.TOP_CENTER
                });
                return;
            }
        }


        if(process.env.REACT_APP_EMAILJS_SERVICE_ID && process.env.REACT_APP_EMAILJS_TEMPLATE_ID && process.env.REACT_APP_EMAILJS_API_KEY){
          
            emailjs
                .sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID , form.current, process.env.REACT_APP_EMAILJS_API_KEY)
                .then(
                    (result: EmailJSResponseStatus) => {
                        localStorage.setItem('lastSubmissionTime', currentTime.toString());
                        toast.success('your message is sent!', {position: toast.POSITION.TOP_CENTER});
                    },
                    (error: EmailJSResponseStatus) => {
                        toast.error('fail to send a message', {position: toast.POSITION.TOP_CENTER});
                    }
                );
        } else {
            toast.error('fail to send a message', {position: toast.POSITION.TOP_CENTER});
        }
        }
    };


    return (
        <form ref={form} onSubmit={sendEmail}>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom:'15px'}}>
                    <Input.Wrapper label="Name" withAsterisk size="xl" style={{marginRight:'15px'}}>
                        <Input size='xl' name='name' placeholder="Name" />
                    </Input.Wrapper>
                    
                    <Input.Wrapper label="E-mail" withAsterisk size="xl">
                        <Input name='email' size='xl'  placeholder="E-mail" />
                    </Input.Wrapper>
                </div>

                <div style={{alignContent:'right', alignItems:'right',display:'flex', flexDirection:'column'}}>
                    <Textarea
                    name='text'
                    size="xl"
                    radius="md"
                    label="Message"
                    placeholder="Message"
                    minRows={12}
                    style={{minWidth:'100%', marginBottom:'15px'} }
                    />
                    <Button id='contact-send-button' ml='80%' pl='10px' pr='10px' style={{fontSize:'24px'}} type="submit" value="Send" radius={8}>Send</Button>
                </div>
            </div>    
        </form>
        
    );
}

const Map: React.FC<{}> = () => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [map, setMap] = React.useState<google.maps.Map>();
    const [marker, setMarker] = React.useState<google.maps.Marker>();
    
    React.useEffect(() => {
      if (ref.current && !map) {
        setMap(new window.google.maps.Map(ref.current, {center:{lat:35.2350361, lng:129.08268}, zoom:16}));
      }
    }, [ref, map]);
    
    React.useEffect(() => {
        if (map) {
            const markerPosition = { lat: 35.2350361, lng:129.08268 };
            const newMarker = new google.maps.Marker({
                position: markerPosition,
                map: map,
                title: 'PNU IC&ML',
            });
            setMarker(newMarker);
        }
    }, [ref, map]);
    
    return (<div ref={ref} style={{width:'600px', height:'400px'}}/>)
};


const ContactSection = () => {

    console.log(process.env.REACT_APP_GOOGLE_MAP_API_KEY);
    console.log(process.env);
    console.log(process.env.PATH);

    return (
        <section id="contact-section">
            <Paper className='contact-container' shadow='lg' radius='lg' withBorder p='xl'>
                <Group style={{justifyContent:'space-around'}}>
                    <Stack className='info-div'>
                        <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY||"None"}>
                            <Map></Map>
                        </Wrapper>
                        <div className='info'>
                            <text className='title'> ADDRESS </text>
                            <text>Room 320, Building 313, Pusan National University</text>
                            <text>2 Busandaehak-ro 63 beon-gil, Geumjeong-gu, Busan 46241, South Korea</text>

                            <div className='info-mailphone'>
                                <div className='info-mail'>
                                    <text className='title'>E-Mail</text>
                                    <text>Professor: gahmj@pusan.ac.kr</text>
                                    <text>Lab: icml@pusan.ac.kr</text>
                                </div>
                                <div className='info-phone'>
                                    <text className='title'> Phone</text>
                                    <text>Professor: +82 51-510-2292</text>
                                    <text>Lab: +82-051-510-3483</text>
                                </div>
                            </div>
                        </div>
                    </Stack>

                    <Divider orientation='vertical'/>

                    <div>
                        <ContactForm/>
                    </div>
                </Group>
            </Paper>
            <Container className='toast-container'/>
        </section>
    );
};

export default ContactSection;