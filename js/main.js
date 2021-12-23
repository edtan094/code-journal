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

function viewTarget(dataView) {
  for (var eachView = 0; eachView < $allViews.length; eachView++) {
    $allViews[eachView].className = 'hidden';
    if (dataView === $allViews[eachView].getAttribute('data-view')) {
      $allViews[eachView].classList.replace('hidden', 'view');
      data.view = event.target.getAttribute('data-view');
    }
    if ($allViews[eachView].matches('#navigation')) {
      $allViews[eachView].classList.remove('hidden', 'hidden-navbar');
    }
  }
}

function removeNoEntriesText(event) {
  var $allLi = document.querySelectorAll('li');
  var $noEntriesText = document.querySelector('#no-entries-text');
  if ($allLi.length === 1) {
    $noEntriesText.remove();
  }
}
$form.addEventListener('submit', removeNoEntriesText);

var $allViews = document.querySelectorAll('.view');
function swappingViews(event) {
  if (event.target.matches('.swap-view')) {
    var $dataView = event.target.getAttribute('data-view');
    viewTarget($dataView);
  }
}
$form.addEventListener('submit', swappingViews);

var $anchor = document.querySelector('.anchor');
function anchor(event) {
  if (event.target.tagName === 'A') {
    var $dataView = event.target.getAttribute('data-view');
    viewTarget($dataView);
  }
}
$anchor.addEventListener('click', anchor);

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

function previousDataView(event) {
  var $view;
  $view = data.view;
  for (var eachView = 0; eachView < $allViews.length; eachView++) {
    $allViews[eachView].className = 'hidden';
    if ($view === $allViews[eachView].getAttribute('data-view')) {
      $allViews[eachView].classList.replace('hidden', 'view');
    }
    if ($allViews[eachView].matches('#navigation')) {
      $allViews[eachView].classList.remove('hidden');
    }
  }
}
previousDataView(event);
