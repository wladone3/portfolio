import solutions from "../../public/solutions.json";
import Code from "./Code.jsx";
function Solutions() {

    return (
        <section id="solutions" className="h-svh grid grid-cols-[15rem_1fr]">
            <Code/>

            <div className="grid grid-rows-[1fr_3fr] relative min-h-0">
                <div className="line-top"></div>
                <div className="relative self-end">
                    <div className="title _normal pl-10 pb-20">
                        Solutions
                        <div className="sub-title">[selected]</div>

                    </div>
                    <div className="line-bottom"></div>

                </div>

                <div className="overflow-auto h-full min-h-0">
                    <div className="min-h-0">
                        {solutions.map((item, index) => (
                            <div key={item.id} className="group relative w-full h-[235px] cursor-pointer">
                                <div className="line-bottom"></div>
                                <img src={item.backgroundImage}
                                     alt="Background"
                                     className="absolute size-full object-cover object-center
                                          transition-[clip-path] duration-500 ease-in-out
                                          [clip-path:inset(65px_max(0px,calc(100%_-_550px))_104px_40px)]
                                          group-hover:[clip-path:inset(0)]"/>

                                <div
                                    className="h-[65px] absolute left-10 bottom-[40px] bg-solution w-full max-w-[510px]">
                                    <div className="font-bold p-5  text-[16px] text-center">{item.name}</div>
                                    <div className="absolute -top-[95px] text-[#ABABAA] mix-blend-difference">
                                        {Number(index + 1).toString(2).padStart(4, '0')}
                                    </div>
                                    <div
                                        className="absolute left-1/2 -translate-x-1/2 -bottom-[25px] text-[12px] text-[#ABABAA] mix-blend-difference">
                                        {item.technologies.join(' | ')}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Solutions