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
  var $titleValue = document.querySelector('.title-value').value;
  var $photoURLValue = document.querySelector('#photo-URL').value;
  var $notesValue = document.querySelector('.notes-value').value;
  var inputs = {};
  inputs.title = $titleValue;
  inputs.photoURL = $photoURLValue;
  inputs.notes = $notesValue;
  inputs.entryid = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(inputs);
}
$newEntryButton.addEventListener('click', addingInputIntoObject);
