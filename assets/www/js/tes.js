
$(".geo").each(function (index) {
    $(this).on("click", function () {
        // For the boolean value
        var latLi = $(this).data('lat');
        storeObject.firstname = latLi;
        $(".pass1").val(latLi);
    });
});

$(".geo").each(function (index) {
    $(this).on("click", function () {
        // For the mammal value
        var longLi = $(this).data('long');
        $(".pass2").append("long: " + longLi + "<br />");
    });
});

var lini = document.getElementById("kue1");
var lintang1 = document.getElementById("pere");

function res() {

    lintang1.innerHTML = lini.value * 2 / 8;
}