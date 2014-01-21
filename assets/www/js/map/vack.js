// div menampilken hasil
var hasil = document.getElementById('hasil');
// div primary key
var id = document.getElementById('id');
// div judul
var judul = document.getElementById('judul');
// div deskripsi 
var deskripsi = document.getElementById('deskripsi');
// div tanggal
var tanggal = document.getElementById('tanggal');
// div kategori
var kategori = document.getElementById('kategori');
// div path image
var gambar = document.getElementById('gambar');
// div lintang
var lintang = document.getElementById('lintang');
// div bujur
var bujur = document.getElementById('bujur');
//Location content
var lc;
//PhoneGap Ready variable
var pgr = false;

function onBodyLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    //During testing, Let me know PhoneGap actually
    // initialized
    alert("onDeviceReady");
    //Get a handle we'll use to adjust the accelerometer
    //content
    lc = document.getElementById("locationInfo");
    //Set the variable that lets other parts of the program
    //know that PhoneGap is initialized
    pgr = true;
}

function getLocation() {
    alert("getLocation");
    if (pgr == true) {
        var locOptions = {
            timeout: 5000,
            enableHighAccuracy: true
        };
        //get the current location
        navigator.geolocation.getCurrentPosition(
            onGeolocationSuccess, onGeolocationError,
            locOptions);
        //Clear the current location while we wait for a
        //reading
        lc.innerHTML = "Reading location...";
    } else {
        alert("Please wait,\nPhoneGap is not ready.");
    }
}

function onGeolocationSuccess(loc) {
    document.getElementById('lintang').value = position.loc.latitude;
    document.getElementById('bujur').value = position.loc.longitude;
}

function onGeolocationError(e) {
    alert("Geolocation error: #" + e.code + "\n" +
        e.message);
}


function takePhoto() {

    navigator.camera.getPicture(onCameraSuccess,
        onCameraError);
}

function onCameraSuccess(imageURL) {

    document.getElementById('gambar').value = imageURL;
}



function onCameraError(e) {
    navigator.notification.alert("onCameraError: " + e);
}



var createStatement = "CREATE TABLE IF NOT EXISTS perjalanan (id INTEGER PRIMARY KEY AUTOINCREMENT, judul TEXT, deskripsi TEXT, tanggal DATE, kategori TEXT, gambar TEXT, lintang FLOAT, bujur FLOAT)";
var selectAllStatement = "SELECT * FROM perjalanan";
var insertStatement = "INSERT INTO perjalanan (judul, deskripsi, tanggal, kategori, gambar,lintang, bujur) VALUES (?, ?, ?, ?, ?, ?, ?)";
var updateStatement = "UPDATE perjalanan SET judul = ?, deskripsi = ?, tanggal = ?, kategori = ?, gambar = ?, lintang = ?, bujur = ? WHERE id = ?";
var deleteStatement = "DELETE FROM perjalanan WHERE id=?";
var dropStatement = "DROP TABLE perjalanan";

var db = openDatabase("basisdata", "1.0", "basisdata perjalanan", 1000000);
var dataset;
createTable();

function onError(tx, error) {
    alert(error.message);
}

// menampilkan hasil
function showRecords() {
    hasil.innerHTML = '';
    db.transaction(function (tx) {
        tx.executeSql(selectAllStatement, [], function (tx, result) {
            dataset = result.rows;
            for (var i = 0, item = null; i < dataset.length; i++) {
                item = dataset.item(i);
                hasil.innerHTML +=
                    '<li>' + '<img src="' + item['gambar'] + '">' + item['judul'] + ' , ' + item['deskripsi'] + ' , ' + item['tanggal'] + ' , ' + item['kategori'] + ' , ' + item['lintang'] + ' , ' + item['bujur'] + ' <a href="#" onclick="loadRecord(' + i + ')">edit</a>  ' +
                    '<a href="#" onclick="deleteRecord(' + item['id'] + ')">delete</a></li>';
            }
        });
    });
}

// membuat table
function createTable() {
    db.transaction(function (tx) {
        tx.executeSql(createStatement, [], showRecords, onError);
    });
}

// menambah data
function insertRecord() {
    db.transaction(function (tx) {
        tx.executeSql(insertStatement, [judul.value, deskripsi.value, tanggal.value, kategori.value, gambar.value, lintang.value, bujur.value], loadAndReset, onError);
    });
}

// memanggil data
function loadRecord(i) {
    var item = dataset.item(i);
    judul.value = item['judul'];
    deskripsi.value = item['deskripsi'];
    tanggal.value = item['tanggal'];
    kategori.value = item['kategori'];
    gambar.value = item['gambar'];
    lintang.value = item['lintang'];
    bujur.value = item['bujur'];
    id.value = item['id'];
}

// mengupdate record
function updateRecord() {
    db.transaction(function (tx) {
        tx.executeSql(updateStatement, [judul.value, deskripsi.value, tanggal.value, kategori.value, gambar.value, lintang.value, bujur.value, id.value], loadAndReset, onError);
    });
}
//menghapus record
function deleteRecord(id) {
    db.transaction(function (tx) {
        tx.executeSql(deleteStatement, [id], showRecords, onError);
    });
    resetForm();
}
// menghapus isi tabel
function dropTable() {
    db.transaction(function (tx) {
        tx.executeSql(dropStatement, [], showRecords, onError);
    });
    resetForm();
}
// memanggul data
function loadAndReset() {
    resetForm();
    showRecords();
}
//menghapus isi form data
function resetForm() {
    judul.value = '';
    deskripsi.value = '';
    tanggal.value = '';
    kategori.value = '';
    gambar.value = '';
    lintang.value = '';
    bujur.value = '';
    id.value = '';
}