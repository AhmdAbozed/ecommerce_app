
//@ts-ignore
document.getElementById("signOut").addEventListener("click", async (event) => {
    
    console.log("event: " + event); //the submission
    console.log("target: " + event.target); //the form
    document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";  
    const resp = await fetch("http://localhost:3000/user/signout", {
      method: "POST"
    });
    const response = await resp;
    window.location.href = ("http://"+window.location.hostname+":"+window.location.port+"/user/signin")
});