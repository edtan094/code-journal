/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
var previousEntriesJSON = localStorage.getItem('entry');
if (previousEntriesJSON !== null) {
  data.entries = JSON.parse(previousEntriesJSON);
}

window.addEventListener('beforeunload', function () {
  var savedImagesJSON = JSON.stringify(data.entries);
  localStorage.setItem('entry', savedImagesJSON);
});
