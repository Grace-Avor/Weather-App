function search(event) {
  if (event.key === "Enter")
    alert("Thank for searching, We are still working on this app");
}
var input = document.getElementById("search-input");
input.addEventListener("keypress", search);
