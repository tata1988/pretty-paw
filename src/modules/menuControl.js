import { gsap } from "gsap";

export const menuControl = () => {
    const navBtn = document.querySelector('.navigation__button');
    const navList = document.querySelector('.navigation__list');
    const navItems = document.querySelectorAll('.navigation__item');

    const tl = gsap.timeline({ paused: true });

    tl.fromTo(navList,
        { opacity: 0, display: 'none' },
        { opacity: 1, display: 'block' },
    );

    navItems.forEach((elem, i) => {
        const x = i % 2 ? 500 : -500;
        tl.from(elem, { opacity: 0, x, duration: 1 }, '-=1')
    });

    const openMenu = () => {
        navBtn.classList.add('navigation__button_active');
        tl.play();
    }

    const closeMenu = () => {
        tl.reverse();
    };

    tl.eventCallback('onReverseComplete', () => {
        navBtn.classList.remove('navigation__button_active');
    })

    navBtn.addEventListener('click', () => {
        if (navBtn.classList.contains('navigation__button_active')) {
            closeMenu();
        } else {
            openMenu();
        }

    });

    const checkScreenSize = (e) => {
        if (e.matches) {
            gsap.set(navList, { opacity: 1, display: 'flex' });
            navItems.forEach((elem, i) => {
                gsap.set(elem, { opacity: 1, x: 0 })
            });
        } else {
            gsap.set(navList, { opacity: 0, display: 'none' });
            navItems.forEach((elem, i) => {
                const x = i % 2 ? 500 : -500;
                gsap.set(elem, { opacity: 0, x, duration: 1 });
            });
        }
    }

    const mediaQuery = window.matchMedia('(min-width: 1280px)');

    mediaQuery.addEventListener('change', checkScreenSize);

    checkScreenSize(mediaQuery);
}

