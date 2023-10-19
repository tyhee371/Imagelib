document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const navbar = document.getElementById('navbar');
    const burger = document.getElementById('burger');
    const navList = document.getElementById('navList');

    function handleScroll() {
        sections.forEach(section => {
            const top = section.offsetTop;
            const scrollPosition = window.scrollY;

            if (scrollPosition >= top && scrollPosition <= top + section.offsetHeight) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        if (window.scrollY >= document.querySelector('#home').offsetTop) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    }

    burger.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    window.addEventListener('scroll', handleScroll);
});