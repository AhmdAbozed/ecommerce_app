//setting img for each product at catalog
const img = document.getElementById("pic");
const id = window.location.pathname.split("/").pop()
img?.setAttribute("src","https://f004.backblazeb2.com/file/abozedbucket/"+id+".png")


