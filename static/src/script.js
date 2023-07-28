var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
let pathName = window.location.pathname;

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
    
});

const likedButton = document.querySelectorAll('.heart-button');
const heartLike = document.getElementById('like-heart');
const heartUnlike = document.getElementById('unlike-heart');

// likedButton.forEach(ele => ele.addEventListener('click', function(e) {
//     e.preventDefault();
// }));

// Path name

const navbarLinks =  document.querySelectorAll('.nav-link');

if (pathName === '/movierecommender/') {
    navbarLinks[1].classList.add('text-blue-700');
    navbarLinks[1].classList.add('!dark:text-blue-700');
} else {
    navbarLinks[1].classList.remove('text-blue-700');
    navbarLinks[1].classList.remove('!dark:text-blue-700');
}

if (pathName === '/') {
    navbarLinks[0].classList.add('text-blue-700');
    navbarLinks[0].classList.add('!dark:text-blue-700');
} else {
    navbarLinks[0].classList.remove('text-blue-700');
    navbarLinks[0].classList.remove('!dark:text-blue-700');
}