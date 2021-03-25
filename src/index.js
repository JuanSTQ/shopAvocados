const baseUrl = "https://platzi-avo.vercel.app";
const getFormat = function(price){
  const newPrice = new window.Intl.NumberFormat('en-EN',{
    style: "currency",
    currency: "USD"
  }).format(price);
  return newPrice
};

(async function App(){
  try{
    const response = await fetch(`${baseUrl}/api/avo`).then(response=> response.json());
    const data = response.data;
    const container = document.querySelector("#app");
    let arr = [];

    data.forEach(({name, image:img, price:priceValue,}) => {
      const h1 = document.createElement("h1");
      h1.textContent = name;
      h1.className = "fruitName"

      const price = document.createElement('p');
      price.textContent =getFormat(priceValue);
      price.className = "price"  

      const image = document.createElement('img')
      image.src = `${baseUrl}${img}`
      image.className = "fruitimg"

      const containerData = document.createElement("div")
      containerData.className = "containerFruit"
      containerData.append(image,h1,price)
      arr.push(containerData)
    });
    container.append(...arr)
  }catch(error){
    console.log(error)
  }
  
})();


