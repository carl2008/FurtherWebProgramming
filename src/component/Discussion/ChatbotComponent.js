import { useState } from 'react';
import { Redirect } from 'react-router';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

export default function ChatbotComponent() {

    // all available props
    const theme = {
        background: '#f5f8fb',
        fontFamily: 'Open Sans',
        headerBgColor: '#0097ef',
        headerFontColor: '#fff',
        headerFontSize: '1em',
        botBubbleColor: '#0097ef',
        botFontColor: '#fff',
        userBubbleColor: '#fff',
        userFontColor: '#4a4a4a',
    };

    const steps = [
        {
            id: '1',
            message: 'Hello! I am a simple bot here to guide you. I may not be as good as my human friends, but I will try my best to help!',
            trigger: 'start-0',
        },
        {
            id: 'start-0',
            message: 'Please press Start to begin our conversation when you are ready.',
            trigger: 'start',
        },
        {
            id: 'start',
            options: [
                { value: 22, label: 'Start', trigger: '2' }
            ]
        },
        {
            id: '2',
            message: 'First, please tell me your name!',
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
                { value: 7, label: "Chatbot", trigger: 'bot' }
            ],
        },
        {
            id: '5',
            message: 'This website was created by RMIT students as a project to assist in the battle against COVID-19. We hope to build a platform where normal citizens can discuss and receive support from medical staff.',
            trigger: '5-1',
        },
        {
            id: '5-1',
            message: 'You can read more information on the About Us page of our website. I will take you there!',
            trigger: '6',
        },
        {
            id: '6',
            component: <Redirect to="/AboutUs" />,
            trigger: 'yesno'
        },
        {
            id: '7',
            message: 'This website has different several sections available to you. Please select an option below to find out more.',
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
            message: 'People with COVID-19 have had a wide range of symptoms reported – ranging from mild symptoms to severe illness. Symptoms may appear 2-14 days after exposure to the virus. Anyone can have mild to severe symptoms. People with these symptoms may have COVID-19:',
            trigger: 'symptom-2'
        },
        {
            id: 'symptom-2',
            component: <div><ul><li>Fever or chills</li>
            <li>Cough</li>
            <li>Shortness of breath or difficulty breathing</li>
            <li>Fatigue</li>
            <li>Muscle or body aches</li>
            <li>Headache</li>
            <li>New loss of taste or smell</li>
            <li>Sore throat</li>
            <li>Congestion or runny nose</li>
            <li>Nausea or vomiting</li>
            <li>Diarrhea</li></ul></div>,
            trigger: 'symptom-3'
        },
        {
            id: 'symptom-3',
            message: 'You can read more at the official website of CDC below.',
            trigger: 'symptom-4'
        },
        {
            id: 'symptom-4',
            component: <div><a href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html">https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html</a><br/><p>Live preview of website below:</p><iframe src="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html"/></div>,
            trigger: 'yesno'
        },
        {
            id: 'vaccine',
            message: 'Vietnam currently provides vaccination for all citizens and organizations in the country. The Ministry of Health built a website portal for everyone to register, learn more about the program and check their vaccination status.',
            trigger: 'vaccine-1'
        },
        {
            id: 'vaccine-1',
            message: 'You can read more at the official Vietnamese vaccination portal below.',
            trigger: 'vaccine-2'
        },
        {
            id: 'vaccine-2',
            component: <div><a href="https://tiemchungcovid19.gov.vn/">https://tiemchungcovid19.gov.vn/</a><br/><p>Live preview of website below:</p><iframe src="https://tiemchungcovid19.gov.vn/"/></div>,
            trigger: 'yesno'
        },
        {
            id: 'moh',
            message: 'The Vietnamese Ministry of Health built a website portal specialized in providing information about COVID-19. Everyone can read news, instructions and other useful information regarding COVID-19 on the website.',
            trigger: 'moh-1'
        },
        {
            id: 'moh-1',
            message: 'Sadly, the website is only available in Vietnamese. You can read more at the official Vietnam COVID-19 portal below.',
            trigger: 'moh-2'
        },
        {
            id: 'moh-2',
            component: <div><a href="https://covid19.gov.vn/">https://covid19.gov.vn/</a><br/><p>Live preview of website below:</p><iframe src="https://covid19.gov.vn/"/></div>,
            trigger: 'moh-3'
        },
        {
            id: 'moh-3',
            message: 'To foreigners looking for information, for now you can read information and news about COVID-19 at the official CDC portal.',
            trigger: 'moh-4'
        },
        {
            id: 'moh-4',
            component: <div><a href="https://www.cdc.gov/coronavirus/2019-ncov/index.html">https://www.cdc.gov/coronavirus/2019-ncov/index.html</a><br/><p>Live preview of website below:</p><iframe src="https://www.cdc.gov/coronavirus/2019-ncov/index.html"/></div>,
            trigger: 'yesno'
        },
        {
            id: 'map',
            message: 'The HCM city Department of Information and Communication released a map of different areas and points of interest in HCM city during the pandemic.',
            trigger: 'map-1'
        },
        {
            id:'map-1',
            message: 'You can find information about medical stations, necessity stores, COVID-19 safe and danger zones etc. Currently, the map is only for HCM city and can be accessed from the link below.',
            trigger:'map-2'
        },
        {
            id: 'map-2',
            component: <div><a href="https://bando.tphcm.gov.vn/">https://bando.tphcm.gov.vn/</a><br/><p>Live preview of website below:</p><iframe src="https://bando.tphcm.gov.vn/"/></div>,
            trigger: 'yesno'
        },
        {
            id: 'db',
            message: 'The Vietnamese Ministry of Health and ICT built a website portal for users to query the database for COVID-19 patients. They can look up information about quarantined, hospitalized COVID-19 patients and also people discharged from the hospital.',
            trigger: 'db-1'
        },
        {
            id: 'db-1',
            message:'You can access the website from the official link below.',
            trigger:'db-2'
        },
        {
            id: 'db-2',
            component: <div><a href="https://tracuuf0.medinet.org.vn/">https://tracuuf0.medinet.org.vn/</a><br/><p>Live preview of website below:</p><iframe src="https://tracuuf0.medinet.org.vn/"/></div>,
            trigger: 'yesno'
        },
        {
            id: 'sections',
            message: 'Which section of our website would you like to learn about?',
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
            message: 'All visitors can register a user account by following the links at the top-right of the navigation bar.',
            trigger: 'account-1'
        },
        {
            id: 'account-1',
            message: 'Functionalities such as posting and participating in discussions, like and comment are only available to logged in users. Please consider registering an account to use our website to its fullest.',
            trigger: 'account-2'
        },
        {
            id: 'account-2',
            message: 'However, normal registration can only get a user account. Those who want to have a doctor account to help patients and post articles must send their doctor certifications to our email.',
            trigger: 'account-3'
        },
        {
            id: 'account-3',
            message: 'That is all I can tell you about Account Registration. You can read more information and find our email address on the About Us page. I will take you there!',
            trigger: '6'
        },
        {
            id: 'discussion',
            message: 'The Discussions section is where users can ask questions and receive answers from doctors, or even other users. The user must be logged in to post and participate in discussions.',
            trigger: 'discussion-1'
        },
        {
            id: 'discussion-1',
            message: 'Users can also search and sort for a discussion topic they want to read, and vote in the replies section to help push useful replies to the top. I will take you to the Discussion section now!',
            trigger: 'discussion-re'
        },
        {
            id: 'discussion-2',
            message: 'The Admins monitoring this website can edit or delete harmful and insulting content, the database also records the accounts associated with the votes. Please do not attempt actions that can get your account banned.',
            trigger: 'discussion-3'
        },
        {
            id: 'discussion-3',
            message: 'That is all I can tell you about the Discussion section.',
            trigger: 'yesno'
        },
        {
            id: 'article',
            message: 'The Articles section is where doctors post write-up and share their knowledge regarding COVID-19. There are also articles about other health issues written by specialists in the fields.',
            trigger: 'article-1'
        },
        {
            id: 'article-1',
            message: 'Only doctors can post new articles, however, other logged in users are free to like and comment their opinions on the article posts. Everyone can also filter and search for the articles they want to read.',
            trigger: 'article-2'
        },
        {
            id: 'article-2',
            message: 'That is all I can tell you about the Articles section. I will take you there right now!',
            trigger: 'article-re'
        },
        {
            id: 'bot',
            message: 'Oh, me? I am flattered but I am but a simple chatbot. I was hoping you would be interested in other sections though, the developers worked hard on them.',
            trigger: 'bot-re'
        },
        {
            id: 'bot-re',
            message: 'However, I can provide you a limited amount of information on COVID-19. Would you like me to share my knowledge?',
            trigger: 'bot-yn'
        },
        {
            id: 'bot-yn',
            options: [
                { value: 18, label: 'Yes please.', trigger: '9' },
                { value: 19, label: "No, thanks.", trigger: 'deny' },
            ]
        },
        {
            id: 'deny',
            message: 'Oh...then would you like to learn about anything else?',
            trigger: 'yesnooption'
        },
        {
            id: 'discussion-re',
            component: <Redirect to="/Discussion" />,
            trigger: 'discussion-2'
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
                { value: 20, label: 'Sure, why not.', trigger: '10' },
                { value: 21, label: "No, I'm good.", trigger: '11' },
            ]
        },
        {
            id: '10',
            message: 'What other information would you like to know?',
            trigger: '4',
        },
        {
            id: '11',
            message: 'Thank you for visiting. We hope our website can be useful for you! Please take care of yourself and stay safe :)',
            trigger:'12'
        },
        {
            id: '12',
            message: 'If you want to start a new chat with me, please reload the page. Then we can start over again :)',
            end: true
        }
    ];

    return (
        <ThemeProvider theme={theme}><ChatBot floating={true} headerTitle="R-Med Chatbot"
            steps={steps}
        /></ThemeProvider>
    )
}