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
  var $imagePlaceHolder = document.querySelector('.image-place-holder');
  var inputs = {};
  inputs.title = $title.value;
  inputs.photoURL = $photoURL.value;
  inputs.notes = $notes.value;
  if ($imagePlaceHolder.matches('[data-entry-id]')) {
    inputs.entryid = $imagePlaceHolder.getAttribute('data-entry-id');
    inputs.entryid = parseInt(inputs.entryid);
    for (var dataEntryNumber = 0; dataEntryNumber < data.entries.length; dataEntryNumber++) {
      if (inputs.entryid === data.entries[dataEntryNumber].entryid) {
        data.entries[dataEntryNumber].title = inputs.title;
        data.entries[dataEntryNumber].photoURL = inputs.photoURL;
        data.entries[dataEntryNumber].notes = inputs.notes;
      }
    }
  } else {
    inputs.entryid = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(inputs);
  }
  $imagePlaceHolder.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  $imagePlaceHolder.removeAttribute('data-entry-id');
  var $newLi = generateEntryDomTree(inputs);
  $newLi.removeAttribute('data-entry-id');
  $newLi.setAttribute('data-entry-id', inputs.entryid);
  var $allLi = document.querySelectorAll('li');
  var $ul = document.querySelector('ul');
  for (var allLiIndex = 0; allLiIndex < $allLi.length; allLiIndex++) {
    if ($newLi.getAttribute('data-entry-id') === $allLi[allLiIndex].getAttribute('data-entry-id')) {
      $ul.replaceChild($newLi, $allLi[allLiIndex]);
      return;
    }
  }
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

var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
function swappingViews(event) {
  if (event.target.matches('.swap-view')) {
    var $dataView = event.target.getAttribute('data-view');
    viewTarget($dataView);
  }
  if (event.target.matches('i')) {
    addingDeleteEntryButton();
    var $heading = document.querySelector('h2');
    $heading.textContent = 'Edit Entry';
    var $entry = event.target.closest('.list-entry');
    var $entryIdValue = $entry.getAttribute('data-entry-id');
    $entryIdValue = parseInt($entryIdValue);
    for (var dataEntryNumber = 0; dataEntryNumber < data.entries.length; dataEntryNumber++) {
      if ($entryIdValue === data.entries[dataEntryNumber].entryid) {
        var entryObject = data.entries[dataEntryNumber];
        $title.value = entryObject.title;
        $photoURL.value = entryObject.photoURL;
        $imagePlaceHolder.removeAttribute('src');
        $imagePlaceHolder.setAttribute('src', entryObject.photoURL);
        $imagePlaceHolder.setAttribute('data-entry-id', $entryIdValue);
        $notes.value = entryObject.notes;
      }
    }
  }
}
$form.addEventListener('submit', swappingViews);

var $ul = document.querySelector('ul');
$ul.addEventListener('click', swappingViews);

function addingDeleteEntryButton(event) {
  var $divButtons = document.querySelector('#buttons');
  $divButtons.classList.replace('justify-end', 'justify-space-between');
  var $deleteButton = document.createElement('button');
  $deleteButton.setAttribute('class', 'delete-button');
  $deleteButton.textContent = 'Delete Entry';
  $divButtons.prepend($deleteButton);
}

var $anchor = document.querySelector('.anchor');
function anchor(event) {
  if (event.target.tagName === 'A') {
    var $heading = document.querySelector('h2');
    $heading.textContent = 'New Entry';
    var $dataView = event.target.getAttribute('data-view');
    $imagePlaceHolder.setAttribute('src', 'images/placeholder-image-square.jpg');
    $form.reset();
    viewTarget($dataView);
  }
}
$anchor.addEventListener('click', anchor);

function generateEntryDomTree(entries) {
  var $li = document.createElement('li');
  $li.setAttribute('data-entry-id', data.nextEntryId);
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
