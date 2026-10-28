import gsap from 'gsap';
import {ScrollTrigger, SplitText, ScrollSmoother, Flip, CSSPlugin} from 'gsap/all';

export function openPopUpAnim(cardID = 0) {
    const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 0.8, ease: 'power3.inOut' },
    });

    tl
        .set('.popup>div, .popup p', {opacity: 0})
        .set(['.popup', '[data-anim=pbg-container]', '[data-anim=pdesc]'], {opacity: 1})
        .set(['.popup img'], {visibility: 'hidden'})

        // .to('body', {backgroundColor: '#282828'}, 'start')
        .to(getAnim('pbg'), {width: '100%'}, )
        .to('.popup',  {backgroundColor: '#282828'}, )

        .add(FlipOutsideFlow(
            gsap.utils.toArray('.plogo')[cardID],
            getAnim('logo'),
            {duration: 0.8, ease: 'power3.out'}
        ),  )

        .add(
            () => {
                const images =  gsap.utils.toArray('.pimages')[cardID].querySelectorAll('[data-copy=orig]');
                images.forEach((image, index) => {
                    image.style.opacity = '0.2';

                    FlipOutsideFlow(
                        image,
                        gsap.utils.toArray(getAnim('pimage'))[index],
                        {duration: 0.8, ease: 'power3.out', props: "opacity"}
                    )
                })
            },
        )

    return tl;
}

function getAnim(name) {
    return `[data-anim="${name}"]`;
}

function FlipOutsideFlow(sourceEl, targetEl, props = {}) {
    const rect = sourceEl.getBoundingClientRect();

    // clone lives on <body>, so no parent can clip it
    const clone = sourceEl.cloneNode(true);

    gsap.set(clone, {
        position: 'fixed',
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        margin: 0,
        zIndex: 9999,
        pointerEvents: 'none',
    });
    document.body.appendChild(clone);

    // hide the originals while the clone is flying
    gsap.set(sourceEl, { visibility: 'hidden' });
    gsap.set(targetEl, { visibility: 'hidden' });

    return Flip.fit(clone, targetEl, {
            ...props, onComplete() {
                gsap.set(sourceEl, {visibility: 'visible'});
                gsap.set(targetEl, {visibility: 'visible'});
                clone.remove();
            },
        }
    );
}

