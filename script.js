const menu = document.querySelector("#menu");
const menuLine = document.querySelector("#menu #line");
const elem = document.querySelectorAll ('#page2 #page2-content .elem');
const cursor = document.querySelector ('#cursor');
let prev = 0;
let scroll;
const text = document.querySelector('h4');
const loaderContainer = document.querySelector('#loader')
const innerMost = document.querySelector('#inner-most-loader');
let value;
let curr;
let i = 1;

function loaderAnime() {
    let prev = 0;

    let interval = setInterval(() => {
        value = Math.floor(Math.random() * 6);
        curr = prev + (value * 4);

        if (curr >= 20 && (i===1)) curr = value;

        if (curr >= 100) {
            curr = 100;
            clearInterval(interval);
            loaderContainer.style.height = 0;
        }

        i++;
        prev = curr;
        text.textContent = `${curr}%`;
        innerMost.style.width = `${curr}%`;
    }, 200);

}

loaderAnime();

function cursorEffect () {
    window.addEventListener('mousemove', function (e) {
        let curr = e.clientX;

        gsap.to (cursor, {
            left: e.x,
            top: e.y,
            ease: Power2
        });

        prev = curr;
    });
}

cursorEffect();

function locomotive() {
    scroll = new LocomotiveScroll({
        el: document.querySelector('main'),
        smooth: true,
        getDirection: true, // Keep this line if you need direction change events
        scrollbarContainer: null
    });
}

locomotive();

function underlineEffect() {
    menu.addEventListener ('mousemove', () => {
        menuLine.style.transform = 'translateX(0)';
    });
    
    menu.addEventListener ('mouseleave', () => {
        menuLine.style.transform = 'translateX(100%)';
    });
}

underlineEffect()

function imageMover () {
    elem.forEach ((val) => {
        val.addEventListener ('mousemove', (e) => {
    
            let diff = e.clientY - val.getBoundingClientRect().top;
            let curr = e.clientX;
    
            gsap.to (val.querySelector('#text-part h1'), {
                opacity: 0.2,
                duration: 0.5,
                x: 60,
                ease: Power2
            })
    
            gsap.to (val.querySelector('#text-part small'), {
                opacity: 0.2,
                duration: 0.5,
                ease: Power2
            });

            gsap.to (cursor, {
                scale: 8,
                opacity: 0.9,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mixBlendMode: 'normal',
            });
            
            cursor.textContent = 'view';
        
            gsap.to (val.querySelector('img'), {
                opacity: 1,
                top: diff,
                x: e.clientX,
                rotate: gsap.utils.clamp(-20, 20, curr-prev),
                ease: Power3
            });    
            prev = curr;
        });
        
        val.addEventListener ('mouseleave', (e) => {
            gsap.to (val.querySelector('img'), {
                opacity: 0,
                ease: Power3
            })
    
            gsap.to (val.querySelector('#text-part h1'), {
                opacity: 1,
                duration: 0.5,
                x: 0,
                ease: Power3
            });

            gsap.to (val.querySelector('#text-part small'), {
                opacity: 1,
                duration: 0.5,
                ease: Power3
            });

            gsap.to (cursor, {
                scale: 1,
                opacity: 1,
                mixBlendMode: 'difference'
            });
            
            cursor.textContent = '';
        }) 
    });
    
}

imageMover();

function page1Anime() {
    gsap.from ('nav h1, nav h3', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        delay: 0.15
    })
    
    gsap.to ('#content #part1 h1', {
        transform: "translateY(0)",
        duration: 1,
        stagger: 0.1,
        delay: 0.35,
        opacity: 1
    });
    
    gsap.from ('footer .footer-parts', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        delay: 1.15
    });
    
    gsap.to ('#content #part2 p, #content #para', {
        transform: "translateY(0)",
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        delay: 1
    });
}

page1Anime()

function btnEffect () {
    const link = document.querySelector ('footer #part3 a');
    link.addEventListener ('mousemove', function () {
        gsap.to ('footer #part3 a .iconOne', {
            top: '100%',
        });

        gsap.to ('footer #part3 a .iconTwo', {
            top: '0%',
            translateY: '40%'
        });
    });

    link.addEventListener('mouseleave', function () {
        gsap.to ('footer #part3 a .iconOne', {
            top: '28%',
        });

        gsap.to ('footer #part3 a .iconTwo', {
            top: '-100%',
            translateY: '0%'
        });
    })
}

btnEffect();

function page1Menu () {
    var menu = document.querySelector('#btn-menu');
    var ul = document.querySelector('#page1 nav #menu ul');

    menu.addEventListener('click', function () {
        gsap.to (ul, {
            transform: 'translateY(30%)',
            opacity: 1,
            display: 'flex',
            duration: 1,
            ease: Power3
        });

        gsap.to(ul.querySelectorAll('li'), {
            translateY: 0,
            stagger: 0.3,
            duration: 0.6,
            ease: Power2
        })

        gsap.to (menu, {
            translateY: 100,
            duration: 1,
            ease: Power3
        })

        gsap.to(document.querySelector('#menu #line'), {
            display: 'none',
        });
    });

    scroll.on('scroll', (args) => {
        const { scroll } = args;
    
        // Your animations based on the scroll value
        gsap.to(ul, {
            display: 'none',
            translateY: -100, // Adjust this value based on your needs
            opacity: 0,
            delay: -0.5
        });

        gsap.to(ul.querySelectorAll('li'), {
            translateY: -100,
            stagger: 0.3,
            delay: -0.5
        })
    
        gsap.to(menu, {
            translateY: 0,
            duration: 1
        });

        gsap.to(document.querySelector('#menu #line'), {
            display: 'block'
        });
    });


}

page1Menu()

function time () {
    const time = document.querySelector('.time');

    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const currentTime = `${hours}:${minutes}`;

    if (hours >= 0 && hours < 13) {
        time.innerHTML = `${currentTime} a.m IST`;
    }else {
        time.innerHTML = `${currentTime} p.m IST`;
    }
}

time()
