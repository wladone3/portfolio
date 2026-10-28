
function Project({project}) {
    return (
        <>
            <div className="relative flex-center h-[220px]" data-anim="pbg-container">
                <div data-anim="pbg" className="h-[220px] absolute w-0 top-0 left-0" style={{backgroundColor: project.backgroundColor}}></div>
                <img src={project.logo} alt="Logo" data-anim="logo" className="max-w-[120px] z-40"/>
            </div>

            <div className="text-center pt-[40px]" data-anim="header">
                <div className="text-[#B5B5B5] text-[16px] pb-[15px]">[PROJECT]</div>
                <div className="font-bold text-[42px] text-[#F0F0EF]">{project.title}</div>
                <a href={project.link}
                   className="project-link mt-[20px] text-[14px]"
                   target="_blank">LIVE LINK</a>
            </div>
            
            <div className="m-auto max-w-[800px] my-[50px]" data-anim="pdesc">
                {project.description?.map((block, i) =>
                    block.type === "text"
                        ? <p key={i} className="max-w-[700px] m-auto mb-[30px]">{block.content}</p>
                        : <img data-anim="pimage" key={i} src={block.src} alt={block.alt} className="mb-[30px]"/>
                )}
            </div>

            <div className="text-center mb-[100px]">
                <a href={project.link}
                   className="project-link mt-[20px] text-[14px]"
                   target="_blank">LIVE LINK</a>
            </div>
        </>
    )
}

export default Project
