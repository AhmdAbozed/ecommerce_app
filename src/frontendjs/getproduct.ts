
//@ts-ignore
document.forms["productDetails"].addEventListener("submit", async (event) => {

    event.preventDefault(); //default behaviour replaces the page with the response file, which is not ideal.
    
    const resp = await fetch("http://"+window.location.hostname+":"+window.location.port+"/product/add", {
      method: "POST",
      //@ts-ignore
      body: new URLSearchParams(new FormData(event.target)) //It's unclear what URLSeachParams does, but without it, request body is empty.
  
    });
    
    const result = await resp.json();
    console.log(result)
    console.log("result is above, result[0] -->: " + result[0])
  
  });
  