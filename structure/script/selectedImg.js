function previewImage(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    var previewImg = document.createElement('img');
    previewImg.style.maxWidth = '200px'; 
    previewImg.style.maxHeight = '200px'; 
  
    reader.onload = function(event) {
      var imageUrl = event.target.result;
      previewImg.src = imageUrl;
      document.getElementById('imagePreview').innerHTML = '';
      document.getElementById('imagePreview').appendChild(previewImg);
    };
  
    reader.readAsDataURL(file);
  }
  