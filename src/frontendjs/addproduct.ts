
//@ts-ignore
document.forms["productDetails"].addEventListener("submit", async (event) => {

  event.preventDefault(); //default behaviour replaces the page with the response file, which is not ideal.

  const resp = await fetch("http://" + window.location.hostname + ":" + window.location.port + "/product/add", {
    method: "POST",
    //@ts-ignore
    body: new URLSearchParams(new FormData(event.target)) //It's unclear what URLSeachParams does, but without it, request body is empty.

  });

  const result = await resp.json();
  console.log(result)
  console.log("result is above, result[0] -->: " + result[0])
}
);

const imginput = <HTMLInputElement>document.getElementById("imgInput");

const imgarea = document.getElementById("pic")

imginput?.addEventListener("change",async (event) => {
  const imgfile = imginput.files;
  console.log(imgfile)
  console.log("testingimgInput")
  if(imgfile![0]){
    const imgUrl = URL.createObjectURL(imgfile![0]);
    console.log("img Url: "+imgUrl)
    imgarea?.setAttribute("src",imgUrl);
    //URL.revokeObjectURL(imgUrl)
  }
})

async function sendImg(){

  //not functional yet

  const resp = await fetch("https://api.backblazeb2.com/b2api/v2/b2_authorize_account",{
    method: "GET",
    
    headers:{
      'Authorization':'Basic ZWJiMGVjZjhmNmE4OjAwNDhhZTE3YzgyYTQyOWM5NjhlMjI4MDk3OTZhNTNkNWJiZGI0ZjUwMQ==',

    }   
  })
  const result = await resp.json();
  console.log("backblaze api: "+result)
}