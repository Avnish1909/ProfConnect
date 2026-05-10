import appointment_img from './nitkkr.jpg'
import header_img from './nitkkrlogo.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './adnitkkr.webp'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'

import prof1 from './doc1.png'
import prof2 from './doc2.png'
import prof3 from './doc3.png'
import prof4 from './doc4.png'
import prof5 from './doc5.png'
import prof6 from './doc6.png'
import prof7 from './doc7.png'
import prof8 from './doc8.png'
import prof9 from './doc9.png'
import prof10 from './doc10.png'
import prof11 from './doc11.png'
import prof12 from './doc12.png'
import prof13 from './doc13.png'
import prof14 from './doc14.png'
import prof15 from './doc15.png'

import Dermatologist from './mech.svg'
import Gastroenterologist from './pie.svg'
import General_physician from './cs.svg'
import Gynecologist from './electrical.svg'
import Neurologist from './electronics.svg'
import Pediatricians from './civil.svg'

import dp_img from './dp_img.png'

export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    dp_img,
    about_image,
    contact_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'Computer Science',
        image: General_physician
    },
    {
        speciality: 'Electrical ',
        image: Gynecologist
    },
    {
        speciality: 'Mechanical',
        image: Dermatologist
    },
    {
        speciality: 'Civil',
        image: Pediatricians
    },
    {
        speciality: 'Electronics',
        image: Neurologist
    },
    {
        speciality: 'PIE',
        image: Gastroenterologist
    },
]

export const professors = [
    {
        _id: 'prof1',
        name: 'Prof. Richard James',
        image: prof1,
        speciality: 'Computer Science',
        degree: 'PhD',
        experience: '4 Years',
        about: 'Experienced Computer Science professor with expertise in algorithms, system design, and software engineering.',
        fees: 500,
        available: true,
        address: {
            line1: 'NIT Kurukshetra',
            line2: 'Computer Engineering Department'
        }
    },

    {
        _id: 'prof2',
        name: 'Prof. Emily Larson',
        image: prof2,
        speciality: 'Electrical Engineering',
        degree: 'PhD',
        experience: '3 Years',
        about: 'Specialized in circuit analysis, VLSI systems, and embedded technologies.',
        fees: 600,
        available: true,
        address: {
            line1: 'NIT Kurukshetra',
            line2: 'Electrical Department'
        }
    },

    {
        _id: 'prof3',
        name: 'Prof. Sarah Patel',
        image: prof3,
        speciality: 'Mechanical Engineering',
        degree: 'PhD',
        experience: '5 Years',
        about: 'Focused on thermodynamics, robotics, and mechanical system design.',
        fees: 450,
        available: true,
        address: {
            line1: 'NIT Kurukshetra',
            line2: 'Mechanical Department'
        }
    },

    {
        _id: 'prof4',
        name: 'Prof. Christopher Lee',
        image: prof4,
        speciality: 'Civil Engineering',
        degree: 'PhD',
        experience: '2 Years',
        about: 'Expert in structural engineering and smart city infrastructure.',
        fees: 400,
        available: false,
        address: {
            line1: 'NIT Kurukshetra',
            line2: 'Civil Department'
        }
    },

    {
        _id: 'prof5',
        name: 'Prof. Jennifer Garcia',
        image: prof5,
        speciality: 'Artificial Intelligence',
        degree: 'PhD',
        experience: '6 Years',
        about: 'Researcher in Machine Learning, Deep Learning, and NLP systems.',
        fees: 700,
        available: true,
        address: {
            line1: 'NIT Kurukshetra',
            line2: 'AI Research Lab'
        }
    },

    {
        _id: 'prof6',
        name: 'Prof. Andrew Williams',
        image: prof6,
        speciality: 'Data Science',
        degree: 'PhD',
        experience: '4 Years',
        about: 'Passionate about big data analytics and predictive modeling.',
        fees: 650,
        available: true,
        address: {
            line1: 'NIT Kurukshetra',
            line2: 'Data Science Center'
        }
    },

    {
        _id: 'prof7',
        name: 'Prof. Christopher Davis',
        image: prof7,
        speciality: 'Computer Science',
        degree: 'PhD',
        experience: '7 Years',
        about: 'Expert in operating systems, DBMS, and compiler design.',
        fees: 550,
        available: true,
        address: {
            line1: 'NIT Kurukshetra',
            line2: 'Computer Engineering Department'
        }
    },

    {
        _id: 'prof8',
        name: 'Prof. Timothy White',
        image: prof8,
        speciality: 'Electrical Engineering',
        degree: 'PhD',
        experience: '3 Years',
        about: 'Focused on power systems and renewable energy solutions.',
        fees: 500,
        available: false,
        address: {
            line1: 'NIT Kurukshetra',
            line2: 'Electrical Department'
        }
    },

    {
        _id: 'prof9',
        name: 'Prof. Ava Mitchell',
        image: prof9,
        speciality: 'Mechanical Engineering',
        degree: 'PhD',
        experience: '2 Years',
        about: 'Specialist in CAD/CAM and industrial automation.',
        fees: 480,
        available: true,
        address: {
            line1: 'NIT Kurukshetra',
            line2: 'Mechanical Department'
        }
    },

    {
        _id: 'prof10',
        name: 'Prof. Jeffrey King',
        image: prof10,
        speciality: 'Civil Engineering',
        degree: 'PhD',
        experience: '5 Years',
        about: 'Research interests include sustainable construction and smart materials.',
        fees: 520,
        available: true,
        address: {
            line1: 'NIT Kurukshetra',
            line2: 'Civil Department'
        }
    }
]