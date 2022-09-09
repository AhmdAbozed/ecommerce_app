//@ts-ignore
document.forms["formBody"].addEventListener("submit", async (event) => {
  
  event.preventDefault(); //default behaviour replaces the page with the response file, which is not ideal.
  //@ts-ignore
  const forum = new URLSearchParams(new FormData(event.target))
  console.log(forum)
  const resp = await fetch(event.target.action, {
    method: "POST",
    //@ts-ignore
    body: new URLSearchParams(new FormData(event.target)) //It's unclear what URLSeachParams does, but without it, request body is empty.
  });
  
  const errors = await resp.json();

  if (errors[0]) {
    listErrors(errors)
  } 
  
  else {
    window.location.href = ("http://" + window.location.hostname + ":" + window.location.port + "/user")
  }

});

function listErrors(errors: Array<any>) {
  
  const errorElements = document.querySelectorAll(".error")
  
  for (const element of errorElements) {
    element.innerHTML = "";
  }
  
  for (const error of errors) {
    console.log("error: " + error.param)
    document.getElementById(error.param + "Error")!.innerHTML = error.msg;
  }
  
}