import $ from 'jquery';
import './header.css';
import logoImage from '../../assets/holberton-logo.jpg';

console.log('Init header');

$('body').prepend(`<div id="logo"><img src="${logoImage}" alt="Holberton Logo"></div>`);
$('body').prepend('<h1>Holberton Dashboard</h1>');
