const debounce = (fn, msec) => {
    let lastCall = 0;
    let lastCallTimer = 0;

    return (...arg) => {
        const prevCall = lastCall;
        lastCall = Date.now();

        if (prevCall && (lastCall - prevCall) < msec) {
            clearTimeout(lastCallTimer);
        }

        lastCallTimer = setTimeout(() => fn(...arg), msec);
    }

}
const createArrow = (className = 'arrow-up', hover = true) => {
    const button = document.createElement('button');

    button.innerHTML = `
    <svg class="${className}__svg" width="8" height="8" viewBox="0 0 8 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.9998 0.212499C4.06647 0.212499 4.12897 0.222832 4.1873 0.243499C4.24564 0.264165 4.2998 0.299666 4.3498 0.349999L7.6498 3.65C7.7498 3.75 7.7998 3.86867 7.7998 4.006C7.7998 4.14333 7.7498 4.26217 7.6498 4.3625C7.5498 4.4625 7.43314 4.5125 7.2998 4.5125C7.16647 4.5125 7.0498 4.4625 6.9498 4.3625L4.4998 1.9125V7.5125C4.4998 7.65417 4.4518 7.77083 4.3558 7.8625C4.2598 7.95417 4.14114 8 3.9998 8C3.85814 8 3.73931 7.952 3.64331 7.856C3.54731 7.76 3.49947 7.64133 3.4998 7.5V1.9125L1.04981 4.3625C0.949805 4.4625 0.833138 4.5125 0.699805 4.5125C0.566472 4.5125 0.449805 4.4625 0.349805 4.3625C0.249805 4.2625 0.199805 4.14367 0.199805 4.006C0.199805 3.86833 0.249805 3.74967 0.349805 3.65L3.64981 0.349999C3.69981 0.299999 3.75397 0.264499 3.8123 0.243499C3.87064 0.222499 3.93314 0.212165 3.9998 0.212499Z"/>
    </svg>
    `;
    button.classList.add(className);

    const style = document.createElement('style');

    style.textContent = `
    .${className} {
        position: fixed;
        z-index: 999;
        bottom: 30px;
        right: 30px; 
        padding: 0;
        border: none;
        background-color: #ffffff;
        box-shadow: 0px 4px 4px rgba(49, 33, 1, 0.15);
        border-radius: 50%;
        width: 50px;
        heigth: 50px;
        justify-content: center;
        align-items: center;
        display: none;
        color: #000000;
        ${hover && 'transition: color .3s ease-in-out, background-color .3s ease-in-out;'} 
    }

    ${hover && `.${className}:hover {
        color: #ffffff;
        background-color: #000000;
    }`}
   
    `;
    document?.head.prepend(style);

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    });

    return button;
}

export const initScrollTopBtn = (className) => {
    const arrow = createArrow(className);

    document?.body.append(arrow);

    const showElemScrollPosition = () => {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        arrow.style.display = (scrollPosition > window.innerHeight / 2) ? 'flex' : 'none';

    }

    window.addEventListener('scroll', showElemScrollPosition, 100);
}