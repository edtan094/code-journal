/* global data */
/* exported data */

// var $imageContainer = document.querySelector('.image-container');
var $imagePlaceHolder = document.querySelector('.image-place-holder');
var $photoURL = document.querySelector('#photo-URL');
function photoURLInput(event) {
  // console.log(event.target);
  // console.log(event.target.tagName);
  $imagePlaceHolder.setAttribute('src', $photoURL.value);
}
$photoURL.addEventListener('input', photoURLInput);

var $newEntryButton = document.querySelector('.new-entry-button');
function addingInputIntoObject(event) {
  var $title = document.querySelector('.title-value');
  var $photoURL = document.querySelector('#photo-URL');
  var $notes = document.querySelector('.notes-value');
  var inputs = {};
  inputs.title = $title.value;
  inputs.photoURL = $photoURL.value;
  inputs.notes = $notes.value;
  inputs.entryid = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(inputs);
  $imagePlaceHolder.setAttribute('src', 'images/placeholder-image-square.jpg');

  var $formTitleImage = document.querySelector('.form-title-image');
  var $formNotes = document.querySelector('.form-notes');
  $formTitleImage.reset();
  $formNotes.reset();
}
$newEntryButton.addEventListener('click', addingInputIntoObject);
