import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {PopUpContext} from "../App.jsx";
import projects from "../../public/projects.json";
import Project from "./Project.jsx";
import {useGSAP} from "@gsap/react";
import {openPopUpAnim} from "../animations.js";
import {Flip} from "gsap/all";
import gsap from "gsap";
function PopUp() {
    const {popup, setPopup} = useContext(PopUpContext);

    useGSAP(() => {
        if ( popup.status === 'open' ) {
            openPopUpAnim(popup.id).play()
        }


    }, [popup]);

    function prev(id) {
       const ID = id - 1 < 0 ?  projects.length -1 : id - 1;
        setPopup({...popup, id: ID});
    }

    function next(id) {
        const ID = id + 1 > projects.length -1 ? 0 : id + 1;
        setPopup({...popup, id: ID});
    }

    return (
        popup.status === 'open' ? (<section className="popup fixed inset-0 overflow-auto z-40 opacity-0">
            <div onClick={() => prev(popup.id)} className="fixed left-[35px] top-1/2 -translate-y-1/2 cursor-pointer">
                <svg width="56" height="12" viewBox="0 0 56 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1.00195" y="5" width="55" height="1" fill="#F0F0EF"/>
                    <rect x="0.00195312" y="5.5249" width="8" height="1" transform="rotate(-43.6771 0.00195312 5.5249)"
                          fill="#F0F0EF"/>
                    <rect x="0.597656" y="5" width="8" height="0.843461" transform="rotate(45 0.597656 5)"
                          fill="#F0F0EF"/>
                </svg>
                <div className="pl-[20px]">PREVIOUS</div>
            </div>

            <div onClick={() => next(popup.id)}  className="fixed right-[35px] top-1/2 -translate-y-1/2 cursor-pointer ">
                <svg width="56" height="12" viewBox="0 0 56 12" fill="none" xmlns="http://www.w3.org/2000/svg"
                     className="rotate-180">
                    <rect x="1.00195" y="5" width="55" height="1" fill="#F0F0EF"/>
                    <rect x="0.00195312" y="5.5249" width="8" height="1" transform="rotate(-43.6771 0.00195312 5.5249)"
                          fill="#F0F0EF"/>
                    <rect x="0.597656" y="5" width="8" height="0.843461" transform="rotate(45 0.597656 5)"
                          fill="#F0F0EF"/>
                </svg>
                <div className="-ml-[50px]">NEXT</div>
            </div>

            <div className="pt-[200px]"></div>
            <Project project={projects[popup.id]}/>
        </section>) : ""
    )
}

export default PopUp
