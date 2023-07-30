var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
let pathName = window.location.pathname;

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark') {
    themeToggleLightIcon.classList.remove('hidden');
    document.documentElement.classList.add('dark');
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

// const navbarLinks =  document.querySelectorAll('.nav-link');

// if (pathName === '/movierecommender/') {
//     navbarLinks[1].classList.add('text-blue-700');
//     navbarLinks[1].classList.add('!dark:text-blue-700');
// } else {
//     navbarLinks[1].classList.remove('text-blue-700');
//     navbarLinks[1].classList.remove('!dark:text-blue-700');
// }

// if (pathName === '/') {
//     navbarLinks[0].classList.add('text-blue-700');
//     navbarLinks[0].classList.add('!dark:text-blue-700');
// } else {
//     navbarLinks[0].classList.remove('text-blue-700');
//     navbarLinks[0].classList.remove('!dark:text-blue-700');
// }


// Script of chat bot application
const messagesList = document.querySelector('.messages-list');
const messageForm = document.querySelector('.message-form');
const messageInput = document.querySelector('.message-input');

messageForm.addEventListener('submit', event => {
  console.log("Hello")
  event.preventDefault();

  const message = messageInput.value.trim();
  if (message.length === 0) {
    return;
  }

  const messageItem = document.createElement('li');
  messageItem.classList.add('flex', 'w-full', 'mt-2', 'space-x-3', 'max-w-xs', 'ml-auto', 'justify-end');
  messageItem.innerHTML = `
    <div>
      <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
        <h6 class="font-semibold">You</h6>
        <p class="text-md">${message}.</p>
      </div>
      <span class="text-xs text-gray-500 leading-none">2 min ago</span>
    </div>
    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
      <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
      </div>
    </div>
  `;

  messagesList.appendChild(messageItem);
  messageInput.value = '';

  fetch('', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams({
      'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value,
      message: message
    })
  })
  .then(response => response.json())
  .then(data => {
    const response = data.response;
    const messageItem = document.createElement('li');
    messageItem.classList.add('flex', 'w-full', 'mt-2', 'space-x-3', 'max-w-xs');
    messageItem.innerHTML = `
      <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
        <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span class="font-medium text-gray-600 dark:text-gray-300">AI</span>
        </div>
      </div>
      <div>
        <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
          <h6 class="font-semibold">AI Chatbot</h6>
          <p class="text-md">${response}</p>
        </div>
        <span class="text-xs text-gray-500 leading-none">2 min ago</span>
      </div>
    `
    messagesList.appendChild(messageItem);
  })
})