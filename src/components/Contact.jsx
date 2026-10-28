function Contact() {
    return (
        <section id="contact" className="h-svh relative flex items-center">
            <div className="pl-[5vw]">
               <div className="relative">
                   <div className="pb-[5px]">For enquiries, collaboration requests or job opportunities, don’t hesitate to reach out!</div>
                   <div className="text-touch text-[120px] font-bold uppercase">Get in touch</div>
                   <div className="line-bottom"></div>
               </div>
                
                <ul className="pt-[15px]">
                    <li className="pt-[15px]"><a href="mailto:wladone3@gmail.com">wladone3@gmail.com</a></li>
                    <li className="pt-[15px]"><a target="_blank" href="www.linkedin.com/in/wladone3">Linkedin</a></li>
                </ul>
            </div>


            <footer className="absolute bottom-0 pt-[15px] pb-[20px] flex justify-between items-center
            text text-code w-[90vw] left-1/2 -translate-x-1/2">
                <div className="line-top"></div>

                <div>{new Date().getFullYear()}</div>
                <div>Designed and developed by me, wladone3</div>

            </footer>
        </section>
    )
}

export default Contact
