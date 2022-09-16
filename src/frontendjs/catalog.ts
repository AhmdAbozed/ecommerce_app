const typeSelect = document.getElementById("type")
const brandSelect = document.getElementById("brand")

type product = {
  id?: Number;
  type:string;
  name: string;
  brand: string;
  description: string;
  price: Number;

}

async function getFilters() {

  const options = {
    method: "get"
  }

  const resp = await fetch("http://" + window.location.hostname + ":" + window.location.port + "/filters", options);

  const result = await resp.json();

  console.log(result)
  console.log("result is above, result[0] -->: " + result[0])

  addfilters(result)
}

function addfilters(filters: Array<any>) {
  //uniq = [...new Set(array)];
  let brands: Array<string> = [];
  let types: Array<string> = [];

  for (const filter of filters) {
    brands.push(filter.brand)
    types.push(filter.type)
  }

  brands = [...new Set(brands)]
  types = [...new Set(types)]

  for (const brand of brands) {

    const brandOption = document.createElement("option")
    let typesForBrand = "brandOption ";
    for (const filter of filters) {
      if (brand == filter.brand) {
        typesForBrand += filter.type + " ";
      }
    }
    brandOption.setAttribute("class", typesForBrand)
    brandOption.value = brand;
    brandOption.innerHTML = brand;
    brandSelect?.append(brandOption);

  }

  for (const type of types) {

    const typeOption = document.createElement("option")
    typeOption.value = type;
    typeOption.innerHTML = type;
    typeSelect?.append(typeOption);

  }
}

async function getproducts(type: string, brand: string) {
  console.log("INSIDE GETPRODUCTS")
  const options = {
    method: "get"
  }

  if(type == "brandOption") type = "type";
  if(brand == "brandOption") brand = "brand";

  const resp = await fetch("http://" + window.location.hostname + ":" + window.location.port + "/products/" + type + "-" + brand, options);

  const result = await resp.json();
  console.log(result)
  console.log("getproducts result is above, result[0] -->: " + result[0])

  return result
  }

function listProducts(products:Array<any>){
  
  let catalog = document.getElementById("catalog");
  catalog?.remove();
  
  catalog = document.createElement("div")
  catalog.setAttribute("id", "catalog")
  document.getElementById("bodyContent")?.append(catalog)


  for (const product of products) {
    const element = createProductElement(product)
    catalog?.append(element);
  }
}

function createProductElement(product:product){
  const div = document.createElement("div");
  div.setAttribute("class", "products");
  div.setAttribute("id", JSON.stringify(product.id));
  
  const img = document.createElement("img")
  img.setAttribute("src", "https://f004.backblazeb2.com/file/abozedbucket/"+product.id+".png")
  img.setAttribute("class", "productImg")

  const anchor = document.createElement("a")
  anchor.setAttribute("href", "http://localhost:3000/product/"+product.id)
  
  anchor.append(img)
  div.append(anchor)


  return div;
  
}

function hideCatalogOptions() {

  //hide all brand selector options until a type is selected

  const options = document.querySelectorAll(".brandOption");
  const brandSelect = document.getElementById("brand")

  //@ts-ignore
  brandSelect.selectedIndex = 0;

  for (const option of options) {
    option.setAttribute("hidden", "true");
  }

}

document.getElementById("find")?.addEventListener("click", async (event) => {
  //@ts-ignore
  console.log(typeSelect.value + " " + brandSelect.value)

  //@ts-ignore
  const products = await getproducts(typeSelect?.value, brandSelect?.value)
  listProducts(products)
})

document.getElementById("type")?.addEventListener("change", (event) => {
  //@ts-ignore //Simple error, fixing it would add a fair amount of code that is unnecessary
  console.log("inputtype event" + JSON.stringify(event.target?.value))

  hideCatalogOptions()

  //@ts-ignore
  const selectedOptions = document.querySelectorAll("." + event.target?.value)
  for (const option of selectedOptions) {
    option.removeAttribute("hidden")
  }
})

getFilters()