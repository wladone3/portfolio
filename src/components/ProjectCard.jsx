import {useGSAP} from "@gsap/react";
import {useContext, useRef} from "react";
import gsap from "gsap";
import {PopUpContext} from "../App.jsx";

function ProjectCard({el, index}) {
    const card = useRef(null);
    const animation = useRef(null);
    const {popup, setPopup} = useContext(PopUpContext);

    useGSAP(() => {
        const tl = gsap.timeline({
            paused: true,
            onReverseComplete: () => { card.current?.querySelector('.plogo').removeAttribute('style') }
        })

        tl
            .to(card.current, {
                top: 0,
                left: 0,
                right: 0,
                width: '100%',
                maxWidth: 'calc(100% - 20px)',
                height: 'calc(100% - 20px)',
                bottom: 0,
                ease: "power2.out",
                duration: 0.3,
            }, 'start')
            .to(card.current.querySelector('.nmber'), {
                top: 0,
                left: '10px',
                duration: 0.3,
            }, 'start')
            .to(card.current.querySelector('.pback'), {
                width: 'calc(100% + 22px)',
                duration: 0.3,
            }, '-=0.15')
            .to(card.current.querySelector('.pimgs'), {
                opacity: .2 ,
                duration: 0.3,
            }, '-=0.15')
            .to(card.current.querySelector('.pclik'), {
                opacity: 1,
                duration: 0.3,
            }, '-=0.1')

        animation.current = tl;
    })

    const onEnter = () => {
        animation.current?.play()
    }

    const onLeave = () => {
        if (popup.status === 'closed' ) {
            animation.current?.reverse()
        }
    }

    function getPos(i)  {
        const pos = [
            {y: '-20%', x: '0'},
            {y: '25%', x: '-5%'},
            {y: '-10%', x: '8%'},
            {y: '20%', x: '5%'},
            {y: '6%', x: '-1%'},

            {y: '20%', x: '5%'},
        ];

        const index = ((i - 1) % pos.length) + 1;
        return {
            top: pos[index].y,
            left: pos[index].x,
        }
    }

    function getImages(description) {
        let images = description
            .filter((item) => item.type === "image")
            .map((item) => ({ ...item, isCopy: false }));

        if (images.length > 0 && images.length < 4) {
            const originalsCount = images.length;
            let i = 0;
            while (images.length < 4) {
                images.push({ ...images[i % originalsCount], isCopy: true });
                i++;
            }
        }

        return images;
    }

    function getProject(index) {
        setPopup({
            type: 'project',
            id: index,
            status: 'open'
        })
    }

    return (
        <div key={index}
             className="flex-center relative">
            <div
                ref={card}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
                className="cursor-pointer flex-center relative aspect-square w-[65%] max-w-[290px]"
                data-base-left={getPos(index).left}
                style={{backgroundColor: el.backgroundColor, ...getPos(index)}}
                onClick={() =>  getProject(index)}
            >
                <div className="nmber absolute left-0 -top-[40px] text-[20px] font-bold z-40 ">
                    {String(index + 1).padStart(2, '0')}
                </div>

                <div className="relative flex-center z-40">
                    <img src={el.logo} alt="Logo" className="plogo w-[40%] max-w-max"/>
                    <div className="pclik whitespace-nowrap opacity-0 absolute -bottom-[40px]">click to open</div>
                </div>
                <div className="z-30 pback absolute top-1/2 left-1/2 -translate-1/2 h-[210px] backdrop-blur-[6px] bg-[rgba(255,255,255,0.2)] flex items-end justify-center"></div>

                <div className="pimages pointer-events-none absolute inset-0 pimgs size-full z-20 overflow-hidden opacity-0">
                    {getImages(el.description).map((item, index) => (<img key={index} src={item.src} alt={item.alt} data-copy={item.isCopy ? 'copied' : 'orig'} />))}
                </div>
            </div>
            <div className="line-right"></div>
        </div>
    )
}

export default ProjectCard
