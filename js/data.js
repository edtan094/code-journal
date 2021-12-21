/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
var previousEntriesJSON = localStorage.getItem('entry');
var previousNextEntryId = localStorage.getItem('entry ID');
if (previousEntriesJSON !== null && previousNextEntryId !== 1) {
  data.entries = JSON.parse(previousEntriesJSON);
  data.nextEntryId = JSON.parse(previousNextEntryId);
}

window.addEventListener('beforeunload', function () {
  var savedImagesJSON = JSON.stringify(data.entries);
  var savedNextEntryId = JSON.stringify(data.nextEntryId);

  localStorage.setItem('entry', savedImagesJSON);
  this.localStorage.setItem('entry ID', savedNextEntryId);
});
