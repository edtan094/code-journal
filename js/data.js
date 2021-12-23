/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
var previousEntriesJSON = localStorage.getItem('entry');
if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}

window.addEventListener('beforeunload', function () {
  var savedData = JSON.stringify(data);
  localStorage.setItem('entry', savedData);
});
