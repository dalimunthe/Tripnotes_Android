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
//tanggal G1
var tanggalG1 = document.getElementById('tanggalG1');
//tanggal G2
var tanggalG2 = document.getElementById('tanggalG2');
// div kategori
var kategori = document.getElementById('kategori');
// div path image
var gambar = document.getElementById('gambar');
// div path image2
var gambar2 = document.getElementById('gambar2');
// div lintang
var lintang = document.getElementById('lintang');
// div bujur
var bujur = document.getElementById('bujur');


function onBodyLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    navigator.notification.alert("onDeviceReady");

}

//ambil gambar camera
function takePhoto() {
    var date = new Date();
    var waktu1 = date.toLocaleString();
    document.getElementById('tanggalG1').value = waktu1;

    navigator.camera.getPicture(onCameraSuccess, onCameraError, {
        encodingType: Camera.EncodingType.JPEG,
        saveToPhotoAlbum: true
    });

}

//ambil url gambar
function onCameraSuccess(imageURL) {


    document.getElementById('gambar').value = imageURL;
}

//ambil gambar camera2
function takePhoto2() {
    var date = new Date();
    var waktu1 = date.toLocaleString();
    document.getElementById('tanggalG2').value = waktu1;

    navigator.camera.getPicture(onCamera2Success, onCamera2Error, {
        encodingType: Camera.EncodingType.PNG,
        saveToPhotoAlbum: true
    });

}

//ambil url gambar2
function onCamera2Success(imageURL) {


    document.getElementById('gambar2').value = imageURL;
}

document.addEventListener("deviceready", onDeviceReady, false);

// geolocation

function onDeviceReady() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        maximumAge: 3000,
        timeout: 5000,
        enableHighAccuracy: true
    });
}

// onSuccess Geolocation
//
function onSuccess(position) {
    document.getElementById('lintang').value = position.coords.latitude;
    document.getElementById('bujur').value = position.coords.longitude;
}

// onError geolocation
//
function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

//onError Camera
function onCameraError(e) {
    navigator.notification.alert("onCameraError: " + e);
}

//onError Camera2
function onCamera2Error(e) {
    navigator.notification.alert("onCameraError: " + e);
}
//definisi untuk database
var createStatement = "CREATE TABLE IF NOT EXISTS perjalanan (id INTEGER PRIMARY KEY AUTOINCREMENT, judul TEXT, deskripsi TEXT, tanggal DATE, kategori TEXT, gambar TEXT, tanggalG1 TEXT, gambar2 TEXT, tanggalG2 TEXT, lintang FLOAT, bujur FLOAT)";
var selectAllStatement = "SELECT * FROM perjalanan";
var insertStatement = "INSERT INTO perjalanan (judul, deskripsi, tanggal,tanggalG1, tanggalG2, kategori, gambar,gambar2, lintang, bujur) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
var updateStatement = "UPDATE perjalanan SET judul = ?, deskripsi = ?, tanggal = ?, tanggalG1 = ?, tanggalG2 = ?,  kategori = ?, gambar = ?, gambar2 = ?, lintang = ?, bujur = ? WHERE id = ?";
var deleteStatement = "DELETE FROM perjalanan WHERE id=?";
var dropStatement = "DROP TABLE perjalanan";

var db = openDatabase("basisdata", "1.0", "basisdata perjalanan", 1000000);
var dataset;
createTable();

function onError(tx, error) {
    alert(error.message);
}

// menampilkan hasil all
function showRecords() {
    hasil.innerHTML = '';
    db.transaction(function (tx) {
        tx.executeSql(selectAllStatement, [], function (tx, result) {
            dataset = result.rows;
            for (var i = 0, item = null; i < dataset.length; i++) {
                item = dataset.item(i);
                hasil.innerHTML +=
                    '<li class="myLi" data-tes="3" data-lat="'+item['lintang']+'" data-lng="'+item['bujur']+
                    '" data-gmapping='+"'{"+'"id":"'+item['id']+'","latlng":{"lat":'+item['lintang']+',"lng":'
                    +item['bujur']+'},"tags":"'+item['kategori']+'"}'+"'>"+
                    '<a style="text-decoration:none;" data-ajax="true" onclick="goto()" href="#pop1" data-rel="popup" id="btn1" data-inline="true">'+
                    '<div class="contain_main">'+'<div class="contain_image">'+
                    '<img class="captioned" src="'+item['gambar']+'" alt="">'+'<br>'+
	 				'<img class="captioned" src="'+item['gambar2']+'" alt="">'+'<p class="info-box">'+
	 				'<span style="font-size:1.5em;font-wight:bold;">'+
                    item['judul']+'</span><br>'+item['tanggal']+'<strong><br>'+item['kategori']+' : </strong> '+
                    item['deskripsi']+ '<br>kordinat : '+item['lintang']+','+item['bujur']+
                    '<br>'+'</p>'+'</div></div></a><br></li>';

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
        tx.executeSql(insertStatement, [judul.value, deskripsi.value, tanggal.value, tanggalG1.value, tanggalG2.value, kategori.value, gambar.value, gambar2.value, lintang.value, bujur.value], loadAndReset, onError);        
    });
    alert("Success");
}

// memanggil data
function loadRecord(i) {
    var item = dataset.item(i);
    judul.value = item['judul'];
    deskripsi.value = item['deskripsi'];
    tanggal.value = item['tanggal'];
    tanggalG1.value = item['tanggalG1'];
    tanggalG2.value = item['tanggalG2'];
    kategori.value = item['kategori'];
    gambar.value = item['gambar'];
    gambar2.value = item['gambar2'];
    lintang.value = item['lintang'];
    bujur.value = item['bujur'];
    id.value = item['id'];
}

// mengupdate record
function updateRecord() {
    db.transaction(function (tx) {
        tx.executeSql(updateStatement, [judul.value, deskripsi.value, tanggal.value, tanggalG1.value, kategori.value, gambar.value, gambar2.value, lintang.value, bujur.value, id.value], loadAndReset, onError);
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
// memanggil data
function loadAndReset() {
    resetForm();
    showRecords();
}


//menghapus isi form data
function resetForm() {
    judul.value = '';
    deskripsi.value = '';
    tanggal.value = '';
    tanggalG1.value = '';
    tanggalG2.value = '';
    kategori.value = '';
    gambar.value = '';
    gambar2.value = '';
    lintang.value = '';
    bujur.value = '';
    id.value = '';
}