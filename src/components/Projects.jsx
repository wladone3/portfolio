import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import projects from "../../public/projects.json";
import Code from "./Code.jsx";
import ProjectCard from "./ProjectCard.jsx";
function Projects() {

    return (
        <section id="projects" className="h-svh w-full grid grid-rows-[1fr_minmax(500px,3fr)]">
            <div className="title _normal self-end pl-60 relative pb-10">
                Projects
                <div className="sub-title">[selected]</div>
            </div>

            <div className="grid grid-cols-[auto_1fr] relative h-full">
                <div className="line-top"></div>

                <Code/>

                <div

                    className="overflow-hidden w-full cursor-grab active:cursor-grabbing select-none touch-pan-y"
                >
                    <div className="grid auto-cols-[minmax(375px,25vw)] grid-flow-col h-full w-max">
                        {projects.map((el, index) => (
                            <ProjectCard el={el} index={index} key={index} />
                        ))}
                    </div>
                </div>


            </div>
        </section>
    )
}

export default Projects
