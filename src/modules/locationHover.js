import { gsap } from "gsap";

export const locationHover = () => {

    const locationList = document.querySelector('.location__list');
    const locationItems = document.querySelectorAll('.location__item');

    const mediaQueryXL = window.matchMedia('(min-width: 1280px)');
    const mediaQueryLG = window.matchMedia('(min-width: 1024px)');

    for (const item of locationItems) {
        const content = item.querySelector('.location__content');
        const title = item.querySelector('.location__title');
        const descr = item.querySelector('.location__descr');

        const tl = gsap.timeline({ paused: true });

        tl.to(content, { opacity: 0, duration: 0.5 })
            .to(content, {
                transform: 'none',
                left: 0,
                bottom: 0,
                top: 'auto',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                duration: 0,
            })
            .to(title, {
                whiteSpace: 'unset',
                hyphens: 'auto',
                color: '#FFAA05',
                marginBottom: mediaQueryXL.matches ? '40px' : '24px',
                duration: 0,
            })
            .to(descr, {
                display: 'block',
                duration: 0,
            })
            .to(content, {
                opacity: 1,
                duration: 0.5,
            });

        item.addEventListener('mouseenter', () => {
            if (mediaQueryLG.matches) {
                tl.play();
            }
        });

        item.addEventListener('mouseleave', () => {
            if (mediaQueryLG.matches) {
                tl.reverse();
            }
        });

        mediaQueryLG.addEventListener('change', (e) => {
            if (!e.matches) {
                content.style = '';
                title.style = '';
                descr.style = '';
            }
        });
    }
}