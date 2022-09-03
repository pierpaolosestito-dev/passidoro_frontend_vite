

$(document).on('click', '#prova', function(){ 
    var formData = new FormData();
var imagefile = document.querySelector('#file');
formData.append("image", imagefile.files[0]);
axios.post('http://127.0.0.1:8000/testingfile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
})
  });