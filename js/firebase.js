// Firebase Setting
var config = {
  apiKey: "xxxxxxxxx",
  authDomain: "xxxxxxxxx",
  databaseURL: "xxxxxxxxx",
  projectId: "xxxxxxxxx",
  storageBucket: "xxxxxxxxx",
  messagingSenderId: "xxxxxxxxx"
};
firebase.initializeApp(config);

// Write Data (overwrite)
function writeData(path, dbname, value) {
    firebase.database().ref(path).set({
      [dbname]: value, 
    });
  }

// Read Data
function readData(path, dbname) {
    firebase.database().ref(path + '/' + dbname).on('value', function(snapshot){
      console.log(snapshot.val());
    });
}

// Update Data
function updateData(path, dbname, value) {
    var updates = {};
    updates[path + '/' + dbname] = value;
    return firebase.database().ref().update(updates);
}