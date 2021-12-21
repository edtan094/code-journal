/* global data */
/* exported data */

var $imageContainer = document.querySelector('.image-container');
var $imagePlaceHolder = document.querySelector('.image-place-holder');
var $photoURL = document.querySelector('#photo-URL');
function photoURLInput(event) {
  // console.log(event.target);
  // console.log(event.target.tagName);
  $imagePlaceHolder.setAttribute('src', $photoURL.value);
}
$photoURL.addEventListener('input', photoURLInput);

var $newEntryButton = document.querySelector('.new-entry-button');
var $titleValue = document.querySelector('.title-value').value;
var $photoURLValue = document.querySelector('#photo-URL').value;
var $notesValue = document.querySelector('.notes-value').value;
function addingInputIntoObject(event) {
  var inputs {
    title:
    photoURL:
    notes:
  }
  inputs.title = $titleValue
  inputs.photoURL = $photoURLValue
  inputs.notes = $notesValue
}
$newEntryButton.addEventListener('submit', addingInputIntoObject);
