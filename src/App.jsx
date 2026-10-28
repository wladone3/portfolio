import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";

import {useGSAP} from "@gsap/react";
import {ScrollSmoother} from 'gsap/all';
import gsap from 'gsap';
import Projects from "./components/Projects.jsx";
import Solutions from "./components/Solutions.jsx";
import Contact from "./components/Contact.jsx";
import Project from "./components/Project.jsx";

import project from "../public/projects.json";
import {createContext, useState} from "react";
import PopUp from "./components/PopUp.jsx";

export const PopUpContext = createContext(null);

function App() {
    const [popup, setPopup] = useState({
        type: '',
        id: null,
        status: 'closed', //  'open', 'closed';
    })

    return (
        <PopUpContext value={{popup, setPopup}}>
            <Hero/>
            <About/>
            <Projects/>
            <Solutions/>
            <Contact/>
            <Header/>
            <PopUp />
        </PopUpContext>
    )
}


export default App


