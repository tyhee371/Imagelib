document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');

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
    }

    window.addEventListener('scroll', handleScroll);
});
