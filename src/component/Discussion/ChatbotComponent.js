import { useState } from 'react';
import { Redirect } from 'react-router';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

export default function ChatbotComponent() {

    // all available props
    const theme = {
        background: '#f5f8fb',
        fontFamily: 'Helvetica Neue',
        headerBgColor: '#0097ef',
        headerFontColor: '#fff',
        headerFontSize: '15px',
        botBubbleColor: '#0097ef',
        botFontColor: '#fff',
        userBubbleColor: '#fff',
        userFontColor: '#4a4a4a',
    };

    const steps = [
        {
            id: '1',
            message: 'Hello! What is your name?',
            trigger: 'name',
        },
        {
            id: 'name',
            user: true,
            validator: (value) => {
                if (!value.trim()) {
                    return 'Please enter your name!';
                }
                return true;
            },
            trigger: '3',
        },
        {
            id: '3',
            message: 'Hi {previousValue}! What information would you like to know?',
            trigger: '4',
        },
        {
            id: '4',
            options: [
                { value: 1, label: 'What is this website?', trigger: '5' },
                { value: 2, label: 'How to use website', trigger: '7' },
                { value: 3, label: 'COVID-19 information', trigger: '8' },
            ],
        },
        {
            id: '5',
            message: 'This website is.... You can read more on the About Us page. I will take you there!',
            trigger: '6',
        },
        {
            id: '6',
            component: <Redirect to="/AboutUs" />,
            trigger: 'yesno'
        },
        {
            id: '7',
            message: 'This website has different sections blabla',
            trigger: 'sections'
        },
        {
            id: '8',
            message: 'Please note that we provide brief information for reference only. Please seek help from doctors and other professionals in case of emergency.',
            trigger: '9'
        },
        {
            id: '9',
            message: 'What information would you like to know about COVID-19?',
            trigger: 'covid'
        },
        {
            id: 'covid',
            options: [
                { value: 10, label: 'Symptoms', trigger: 'symptom' },
                { value: 11, label: "Vaccination", trigger: 'vaccine' },
                { value: 12, label: "Information website", trigger: 'moh' },
                { value: 13, label: "COVID-19 map", trigger: 'map' },
                { value: 14, label: "COVID-19 patient database", trigger: 'db' }
            ]
        },
        {
            id: 'symptom',
            message: 'Symptom stuff...',
            trigger: 'yesno'
        },
        {
            id: 'vaccine',
            message: 'Vaccine stuff...\nWebsite at:',
            trigger: 'vaccine-2'
        },
        {
            id: 'vaccine-2',
            component: <div><a href="https://tiemchungcovid19.gov.vn/">https://tiemchungcovid19.gov.vn/</a><br/><p>Preview website below</p><iframe src="https://tiemchungcovid19.gov.vn/"/></div>,
            trigger: 'yesno'
        },
        {
            id: 'moh',
            message: 'Main website for COVID-19 from Ministry of Health...\nWebsite at:',
            trigger: 'moh-2'
        },
        {
            id: 'moh-2',
            component: <div><a href="https://covid19.gov.vn/">https://covid19.gov.vn/</a><br/><p>Preview website below</p><iframe src="https://covid19.gov.vn/"/></div>,
            trigger: 'yesno'
        },
        {
            id: 'map',
            message: 'Map of HCM city COVID-19 danger and safe zones...\nWebsite at:',
            trigger: 'map-2'
        },
        {
            id: 'map-2',
            component: <div><a href="https://bando.tphcm.gov.vn/">https://bando.tphcm.gov.vn/</a><br/><p>Preview website below</p><iframe src="https://bando.tphcm.gov.vn/"/></div>,
            trigger: 'yesno'
        },
        {
            id: 'db',
            message: 'Database to query the COVID-19 patient records...\nWebsite at:',
            trigger: 'db-2'
        },
        {
            id: 'db-2',
            component: <div><a href="https://tracuuf0.medinet.org.vn/">https://tracuuf0.medinet.org.vn/</a><br/><p>Preview website below</p><iframe src="https://tracuuf0.medinet.org.vn/"/></div>,
            trigger: 'yesno'
        },
        {
            id: 'sections',
            message: 'Which section of our website would you like to learn more?',
            trigger: 'sectionchoice'
        },
        {
            id: 'sectionchoice',
            options: [
                { value: 4, label: 'Account registration', trigger: 'account' },
                { value: 5, label: "Discussions", trigger: 'discussion' },
                { value: 6, label: "Articles", trigger: 'article' }
            ]
        },
        {
            id: 'account',
            message: 'How to account, doctor account and stuff',
            trigger: 'yesno'
        },
        {
            id: 'discussion',
            message: 'Discussion stuff',
            trigger: 'discussion-re'
        },
        {
            id: 'article',
            message: 'Article stuff',
            trigger: 'article-re'
        },
        {
            id: 'discussion-re',
            component: <Redirect to="/Discussion" />,
            trigger: 'yesno'
        },
        {
            id: 'article-re',
            component: <Redirect to="/Articles" />,
            trigger: 'yesno'
        },
        {
            id: 'yesno',
            message: 'Would you like to know other information?',
            trigger: 'yesnooption'
        },
        {
            id: 'yesnooption',
            options: [
                { value: 10, label: 'Yes please.', trigger: '10' },
                { value: 11, label: "No, I'm good.", trigger: '11' },
            ]
        },
        {
            id: '10',
            message: 'What other information would you like to know?',
            trigger: '4',
        },
        {
            id: '11',
            message: 'Thank you for visiting. We hope our website can be useful for you!',
            end: true
        }
    ];

    return (
        <ThemeProvider theme={theme}><ChatBot floating={true}
            steps={steps}
        /></ThemeProvider>
    )
}