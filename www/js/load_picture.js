var pictureSource; // picture source
var destinationType; // sets the format of returned value
// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);
// device APIs are available
//

function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}
// Called when a photo is successfully retrieved
//

function onPhotoDataSuccess(imageURI) {
	alert(imageURI);
    // Uncomment to view the base64-encoded image data
    console.log(imageURI);
    // Get image handle
    //
    var cameraImage = $('#image');
    // Unhide image elements
    //
	var filename= imageURI.substr(imageURI.lastIndexOf('/') + 1);
    var img_name = $('#image_name');
	img_name.attr('ng-value', filename)
   // cameraImage.style.display = 'block';
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    cameraImage.attr('src',imageURI);
	//$('#load_photo').toggleClass("active");
}
// Called when a photo is successfully retrieved
//

function onPhotoURISuccess(imageURI) {
	alert(imageURI);
    // Uncomment to view the image file URI
    console.log(imageURI);
    // Get image handle
    //
    var galleryImage = $('#image');
	var filename= imageURI.substr(imageURI.lastIndexOf('/') + 1);
    var img_name = $('#image_name');
	img_name.attr('ng-value', filename)
    // Unhide image elements
    //
    //galleryImage.style.display = 'block';
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    galleryImage.attr('src',imageURI);
	//$('#load_photo').toggleClass("active");
}
// A button will call this function
//

function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 30,
        targetWidth: 600,
        targetHeight: 600,
        destinationType: destinationType.FILE_URI,
        saveToPhotoAlbum: true
    });
}
// A button will call this function
//

function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 30,
        targetWidth: 2600,
        targetHeight: 1600,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}
// Called if something bad happens.
//

function onFail(message) {
    alert('Failed because: ' + message);
}

function upload() {
    var img = $('#image');
    var imageURI = img.attr('src');
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    var params = new Object();
    options.params = params;
    options.chunkedMode = false;
    var ft = new FileTransfer();
    ft.upload(imageURI, "https://abardev.net/assets/files/tmp", win, fail,
        options);
}

function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
}

function fail(error) {
   console.log("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}