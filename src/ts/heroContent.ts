import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)

gsap.to('.hero__content h2:nth-child(1), .hero__content h2:nth-child(2), .hero__scrollButton',{
    ease:"linear",
    opacity:0,
    scrollTrigger: {
        trigger:'.hero__content',
        start: '2% 1%',
        end:'30% top',
        scrub:true,
        onLeave:(scroll)=>{
            if(scroll.direction===1){
                gsap.to(window, {
                    duration: 8,
                    scrollTo: {
                      y: ".section1",
                    },
                    onStart:()=>{
                        document.body.style.overflowY = "hidden"
                    },
                    onComplete: () => {
                        document.body.style.overflowY = "scroll"
                    }
                });
            }
        }
    },
})