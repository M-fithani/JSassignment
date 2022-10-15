var mainDiv = document.createElement("div");
var clothDiv = document.createElement("div");
var cardDiv = document.createElement("div");
cardDiv.classList.add("card_container");
var clothHeading = document.createElement("h1");
clothHeading.classList.add("main_heading");
clothHeading.setAttribute("id","clothingSection");
clothHeading.innerText = "Clothing for Men and Women";
clothDiv.append(clothHeading, cardDiv);

mainDiv.append(clothDiv);
document.body.append(mainDiv);

var aDiv = document.createElement("div");
var aCardDiv = document.createElement("div");
aCardDiv.classList.add("card_container");
var aHeading = document.createElement("h1");
aHeading.classList.add("main_heading");
aHeading.setAttribute("id","accessoriesSection");
aHeading.innerText = "Accessories for Men and Women";
aDiv.append(aHeading, aCardDiv);
mainDiv.append(aDiv);

$(document).ready(function() {
  $('.banner_class').slick({
      dots: true,
      arrows:false,      
      autoPlay: true,
      autoPlaySpeed : 1000,
      

  });
});
		


var productList = new XMLHttpRequest();
$.ajax({
  url: "https://5d76bf96515d1a0014085cf9.mockapi.io/product",
  method: "GET",
  success: function (data) {
    productList = data;

    for (i = 0; i < data.length; i++) {
      var imageSrc = data[i].preview;
      var detail = data[i].name;
      var brand = data[i].brand;
      var amount = data[i].price;
      var item = data[i].isAccessory;
      var productId=data[i].id;
      createCard(imageSrc, detail, brand, amount, item,productId);
    }
  },
});

function createCard(imageSrc, detail, brand, amount, item,productId) {
  var card = document.createElement("div");
  card.classList.add("card");
  var imgLink = document.createElement("a");
  imgLink.href = "/description page/index.html?productId="+productId;
  var img = document.createElement("img");
  img.src = imageSrc;
  img.alt = "image";
  img.classList.add("image");
  var div = document.createElement("div");
  div.classList.add("info");
  var heading = document.createElement("h3");
  heading.classList.add("heading");
  heading.innerText = detail;
  var title = document.createElement("h4");
  title.classList.add("title");
  title.innerText = brand;
  var para = document.createElement("h5");
  para.classList.add("amount");
  para.innerText = "Rs " + amount;
  div.append(heading, title, para);
  imgLink.append(img);
  card.append(imgLink, div);
  if (item == false) {
    cardDiv.append(card);
  } else {
    aCardDiv.append(card);
  }
}



var cartAnchor=document.getElementById('cart');
 cartAnchor.href="/checkout page/index.html";
 var count=document.getElementById("cart_count");
 count.innerText=localStorage.getItem("itemCount");