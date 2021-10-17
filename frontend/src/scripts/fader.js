// Samuel Adamson - Crypto - Fade in objects on scroll

// Fade in elements
const faders = document.querySelectorAll('.fader');
const loadOptions = {
    threshold: 1,
    rowMargin: "0px 0px -100px 0px"
};

// Load elements on scroll
const loadOnScroll = new IntersectionObserver(function(entries, loadOnScroll) {
    // For each Entry
    entries.forEach(entry => {
        if(!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            loadOnScroll.unobserve(entry.target);
        }
    });
}, loadOptions);

// Load on scroll for each element
faders.forEach(fader => {
    loadOnScroll.observe(fader);
});