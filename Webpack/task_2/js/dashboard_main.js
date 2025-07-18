import $ from 'jquery';
import debounce from 'lodash/debounce';
import '../css/main.css';
import logoImage from '../assets/holberton-logo.jpg';

let count = 0;

function updateCounter() {
  count++;
  $('#count').text(`${count} clicks on the button`);
}

const logo = $(`<img id="logo" src="${logoImage}" alt="Holberton Logo">`);
$('body').prepend(logo);

$('body').prepend('<div id="logo"></div>');

$('body').append('<p>Holberton Dashboard</p>');
$('body').append('<p>Dashboard data for the students</p>');

const button = $('<button>Click here to get started</button>');
$('body').append(button);

$('body').append('<p id="count">0 clicks on the button</p>');
$('body').append('<p>Copyright - Holberton School</p>');

button.on('click', debounce(updateCounter, 500));
