/* global data */
/* exported data */

var $imageContainer = document.querySelector('.image-container');
var $imagePlaceHolder = document.querySelector('.image-place-holder');
var $photoURL = document.querySelector('#photo-URL');
function photoURLInput(event) {
  // console.log(event.target);
  // console.log(event.target.tagName);
  $imagePlaceHolder.removeAttribute('src');
  $imagePlaceHolder.setAttribute('src', $photoURL.value);
}

$photoURL.addEventListener('input', photoURLInput);
