

const img = document.getElementById("pic");
const id = window.location.pathname.split("/").pop()
console.log(id)
console.log(img)
img?.setAttribute("src","https://f004.backblazeb2.com/file/abozedbucket/"+id+".png")


