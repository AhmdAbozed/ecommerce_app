async function getProducts() {
    const options = {
        method: "get"
      }
      const resp = await fetch("http://" + window.location.hostname + ":" + window.location.port + "/product/all", options);
    
      const result = await resp.json();
      console.log(result)
      console.log("result is above, result[0] -->: " + result[0])
}