import $ from 'jquery';
import debounce from 'lodash/debounce';

let count = 0;

function updateCounter() {
	count++;
	$('#count').text(`${count} clicks on the button`);
}

$('body').append('<p>Holberton Dashboard</p>');
$('body').append('<p>Dashboard data for the students</p>');

const button = $('<button>Click here to get started</button>');
$('body').append(button);

$('body').append('<p id="count"></p>');
$('body').append('<p>Copyright - Holberton School</p>');

button.on('click', debounce(updateCounter, 500));