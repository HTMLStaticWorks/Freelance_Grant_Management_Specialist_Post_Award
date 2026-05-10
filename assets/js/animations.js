/* 
    Freelance Grant Management Specialist - Animations
*/

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    revealElements.forEach((el) => {
        gsap.fromTo(el, 
            { 
                opacity: 0, 
                y: 50,
                clipPath: 'inset(100% 0% 0% 0%)'
            }, 
            {
                opacity: 1,
                y: 0,
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.2,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // 2. Counter Animation for Metrics
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2; // seconds

        gsap.to(counter, {
            innerText: target,
            duration: duration,
            snap: { innerText: 1 },
            scrollTrigger: {
                trigger: counter,
                start: 'top 90%'
            },
            onUpdate: function() {
                counter.innerHTML = Math.ceil(this.targets()[0].innerText);
            }
        });
    });

    // 3. Staggered List Reveals
    const staggeredLists = document.querySelectorAll('.stagger-list');
    staggeredLists.forEach(list => {
        gsap.from(list.children, {
            opacity: 0,
            y: 30,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: list,
                start: 'top 80%'
            }
        });
    });

    // 4. Parallax Backgrounds
    const parallaxSections = document.querySelectorAll('.parallax-bg');
    parallaxSections.forEach(section => {
        gsap.to(section, {
            backgroundPositionY: '50%',
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    // 5. Magnetic Buttons
    const magneticBtns = document.querySelectorAll('.btn-premium');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
});
