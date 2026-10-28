import hero from '../assets/hero.jpg';
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import { SplitText} from "gsap/all";
import {useRef} from "react";
function Hero() {
    const devTitleRef = useRef(null);
    const descRef = useRef(null);
    const img = useRef(null);

    useGSAP(() => {
       // const splitText = new SplitText(devTitleRef.current, {type: 'chars, words'} );

       // gsap.from(splitText.chars, {
       //     yPercent: 50,
       //     opacity: 0,
       //     duration: 0.5,
       //     ease: 'easeOutExpo',
       //     stagger: 0.04,
       // })
       //
       //  gsap.from(descRef.current.querySelectorAll('p'), {
       //      yPercent: 50,
       //      opacity: 0,
       //      duration: 0.5,
       //      ease: 'easeOutExpo',
       //      stagger: 0.04,
       //      delay: 0.5,
       //  })
        //
        // gsap.timeline({
        //     scrollTrigger: {
        //         trigger: '#hero',
        //         start: 'top top',
        //         end : 'bottom top',
        //         scrub: 1,
        //         pin:true
        //     }
        // })
        //     .to(devTitleRef.current, {
        //        y: -200,
        //        ease: 'easeOutExpo',
        //     }, 0)
    }, [])

    return (
        <div id="hero" className="h-svh grid grid-rows-[140px_minmax(450px,calc(100svh-315px))_175px]">
            <div className=""></div>
            <div className="grid md:grid-cols-12 relative">
                <div className="line-top"></div>
                <div className="col-span-5 relative"><div className="border-right"></div></div>
                <div className="col-span-7 h-full relative">
                    <img ref={img}  src={hero} alt="Hero" className="size-full absolute object-cover p-0.5 pr-0" />
                </div>
                <div className="line-bottom"></div>
            </div>
            <div className="grid md:grid-cols-12">
                <div className="col-span-5 relative">
                    <div className="line-right"></div>
                    <div ref={devTitleRef} className="title pl-[5vw] pt-5">Web developer</div>
                </div>
                <div ref={descRef} className="col-span-4 text-center h-full flex flex-col gap-1.25 justify-center relative text-[14px]">
                    <div className="line-right"></div>
                    <p>Senior Wordpress developer</p>
                    <p>Full-stack developer</p>
                </div>
            </div>
        </div>
    )
}

export default Hero
