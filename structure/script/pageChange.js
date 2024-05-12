function redirectToPage() {
    var selectBox = document.getElementById("changePageSelect");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    if (selectedValue !== "") {
      window.location = selectedValue;
    }
  }