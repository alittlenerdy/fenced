document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    let lastScroll = window.scrollY;
    let ticking = false;
    const scrollThreshold = 20;
    
    header.classList.add('sticky-header');
    
    const updateHeaderVisibility = () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll <= 10) {
            header.classList.remove('header-hidden');
            lastScroll = currentScroll;
            ticking = false;
            return;
        }
        
        if (currentScroll < lastScroll - 5) {
            header.classList.remove('header-hidden');
        } 
        else if (currentScroll > lastScroll + scrollThreshold) {
            header.classList.add('header-hidden');
        }
        
        lastScroll = currentScroll;
        ticking = false;
    };
    
    const scrollHandler = () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeaderVisibility);
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    updateHeaderVisibility();

    document.querySelectorAll('header a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                header.classList.remove('header-hidden');
                
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    document.querySelectorAll('h2').forEach(section => {
        const text = section.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const nextElement = section.nextElementSibling;
        if (nextElement && !nextElement.id) {
            nextElement.id = text;
        }
    });
});