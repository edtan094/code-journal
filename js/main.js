/* global data */
/* exported data */

var $imagePlaceHolder = document.querySelector('.image-place-holder');
var $photoURL = document.querySelector('#photo-URL');
function photoURLInput(event) {
  $imagePlaceHolder.setAttribute('src', $photoURL.value);
}
$photoURL.addEventListener('input', photoURLInput);

var $form = document.querySelector('#submission-form');
function addingInputIntoObject(event) {
  event.preventDefault();
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
  $form.reset();
  var $newLi = generateEntryDomTree(inputs);
  var $ul = document.querySelector('ul');
  $ul.prepend($newLi);
}
$form.addEventListener('submit', addingInputIntoObject);

function generateEntryDomTree(entries) {
  var $li = document.createElement('li');

  var $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');
  $li.appendChild($divRow);

  var $divHalfColumn = document.createElement('div');
  $divHalfColumn.setAttribute('class', 'column-half');
  $divRow.appendChild($divHalfColumn);

  var $divHalfColumn2 = document.createElement('div');
  $divHalfColumn2.setAttribute('class', 'column-half');
  $divRow.appendChild($divHalfColumn2);

  var $divImageContainer = document.createElement('div');
  $divImageContainer.setAttribute('class', 'image-container');
  $divHalfColumn.appendChild($divImageContainer);

  var $img = document.createElement('img');
  $img.setAttribute('class', 'image-size');
  $img.setAttribute('src', entries.photoURL);
  $divImageContainer.appendChild($img);

  var $heading = document.createElement('h3');
  var $headingText = document.createTextNode(entries.title);
  $heading.appendChild($headingText);
  $divHalfColumn2.appendChild($heading);

  var $paragraph = document.createElement('p');
  var $paragraphText = document.createTextNode(entries.notes);
  $paragraph.appendChild($paragraphText);
  $divHalfColumn2.appendChild($paragraph);

  return $li;
}

function appendTheDom(event) {
  var $ul = document.querySelector('.list');
  for (var i = 0; i < data.entries.length; i++) {
    var $newEntry = generateEntryDomTree(data.entries[i]);
    $ul.appendChild($newEntry);
  }
}
document.addEventListener('DOMContentLoaded', appendTheDom);
