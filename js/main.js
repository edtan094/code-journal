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

function removeNoEntriesText(event) {
  var $allLi = document.querySelectorAll('li');
  var $noEntriesText = document.querySelector('#no-entries-text');
  if ($allLi.length > 0) {
    $noEntriesText.className = 'hidden';
  }
}

var $allViews = document.querySelectorAll('.view');
function swappingViews(event) {
  if (event.target.matches('.swap-view')) {
    var $dataView = event.target.getAttribute('data-view');
    viewTarget($dataView);
  }
  if (event.target.matches('i')) {
    var $entry = event.target.closest('.list-entry');
    $entry.getAttribute('data-entry-id');
  }
}
$form.addEventListener('submit', swappingViews);

var $ul = document.querySelector('ul');
$ul.addEventListener('click', swappingViews);

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
  $li.setAttribute('data-entry-id', data.nextEntryId - 1);
  $li.setAttribute('class', 'list-entry');

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

  var $rowForEntryHeading = document.createElement('div');
  $rowForEntryHeading.setAttribute('class', 'row justify-space-between align-center');
  $divHalfColumn2.appendChild($rowForEntryHeading);

  var $heading = document.createElement('h3');
  var $headingText = document.createTextNode(entries.title);
  $heading.appendChild($headingText);
  $rowForEntryHeading.appendChild($heading);

  var $editIcon = document.createElement('i');
  $editIcon.setAttribute('class', 'fas fa-pen purple-pen pen-size swap-view');
  $editIcon.setAttribute('data-view', 'entry-form');
  $rowForEntryHeading.appendChild($editIcon);

  var $rowForEntryParagraph = document.createElement('div');
  $rowForEntryParagraph.setAttribute('class', 'row');
  $divHalfColumn2.appendChild($rowForEntryParagraph);

  var $paragraph = document.createElement('p');
  var $paragraphText = document.createTextNode(entries.notes);
  $paragraph.appendChild($paragraphText);
  $rowForEntryParagraph.appendChild($paragraph);

  return $li;
}

function appendTheDom(event) {
  var $ul = document.querySelector('.list');
  for (var i = 0; i < data.entries.length; i++) {
    var $newEntry = generateEntryDomTree(data.entries[i]);
    $ul.appendChild($newEntry);
  }
  removeNoEntriesText();
}
document.addEventListener('DOMContentLoaded', appendTheDom);

function previousDataView(event) {
  viewTarget(data.view);
}
previousDataView(event);

function viewTarget(dataView) {
  for (var eachView = 0; eachView < $allViews.length; eachView++) {
    $allViews[eachView].className = 'hidden';
    if (dataView === $allViews[eachView].getAttribute('data-view')) {
      $allViews[eachView].classList.replace('hidden', 'view');
      data.view = dataView;
    }
    if ($allViews[eachView].matches('#navigation')) {
      $allViews[eachView].classList.remove('hidden');
    }
  }
  removeNoEntriesText();
}

// var $ul = document.querySelector('ul');
// $ul.addEventListener('click', editEntries);
// var $editTitle = document.querySelector('#title-value');
// var $editPhotoURL = document.querySelector('#edit-photoURL');
// var $editNotes = document.querySelector('#edit-notes');
// function editEntries(event) {
//   swappingViews();
// for (var dataEntriesIndex = 0; dataEntriesIndex < data.entries.length; dataEntriesIndex++){
//   if()
// }
// }

document.addEventListener('click', function showWhatIAmClicking(event) {
  console.log(event.target);
  console.log(event.target.tagName);
});
