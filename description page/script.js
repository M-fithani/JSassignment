var idParam = location.search;
var param = new URLSearchParams(idParam);
var productId = param.get("productId");
var productData;
$.ajax({
  url: "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + productId,
  method: "GET",
  success: function (data) {
    productData = data;

    var mainDiv = document.createElement("div");
    mainDiv.classList.add("section");

    var leftDiv = document.createElement("div");
    leftDiv.classList.add("image_div");
    var image = document.createElement("img");
    image.classList.add("image");
    image.src = data.preview;
    image.alt = "product_image";
    leftDiv.append(image);

    var rightDiv = document.createElement("div");
    rightDiv.classList.add("right_div");

    var detailDiv = document.createElement("div");
    detailDiv.classList.add("detail");

    var pName = document.createElement("h1");
    pName.classList.add("p_name");
    pName.innerText = data.name;

    var brand = document.createElement("h4");
    brand.classList.add("p_brand");
    brand.innerText = data.brand;

    var amount = document.createElement("div");
    amount.classList.add("p_brand");
    amount.innerText = "Price: Rs ";
    var pAmount = document.createElement("span");
    pAmount.classList.add("price");
    pAmount.innerText = data.price;
    amount.append(pAmount);

    var des = document.createElement("div");
    var title = document.createElement("h3");
    title.classList.add("p_brand");
    title.innerText = "Description";
    var para = document.createElement("p");
    para.classList.add("para");
    para.innerText = data.description;
    des.append(title, para);

    var productItem = document.createElement("div");
    productItem.classList.add("product_preview")
    var pHeading = document.createElement("h3");
    pHeading.classList.add("p_brand");
    pHeading.innerText = "Product Preview";

    var itemDiv = document.createElement("div");
    itemDiv.classList.add("item");
    var length = data.photos.length;

    for (var i = 0; i < length; i++) {
      var itemImage = document.createElement("img");
      itemImage.classList.add("itemImage");
      if (i == 0) {
        itemImage.classList.add("active");
      }
      itemImage.src = data.photos[i];
      itemImage.alt = "Preview Image";
      itemImage.addEventListener("click", showImage);

      itemDiv.append(itemImage);
    }
    var btn = document.createElement("button");
    btn.classList.add("button");
    btn.innerText = "Add to cart";
    btn.addEventListener("click", addItemToCart);

    productItem.append(pHeading, itemDiv);
    detailDiv.append(pName, brand, amount, des, productItem);
    rightDiv.append(detailDiv, btn);
    mainDiv.append(leftDiv, rightDiv);
    var mainSection = document.getElementById("main_div");
    mainSection.append(mainDiv);
    
    
    var index = localStorage.getItem("itemCount");
    var count = document.getElementById("cart_count");
    count.innerText = localStorage.getItem("itemCount");
    var cartItem = [];
    var iQuantity=0;
    cartItem.id = data.id
    cartItem.name = data.name
    cartItem.price = data.price
    cartItem.image = data.preview
    function addItemToCart(e)
     {
      index++;
      localStorage.setItem("itemCount", index);
      count.innerText = localStorage.getItem("itemCount");

      iQuantity+=1;
      cartItem.quantity=iQuantity;
      var cartData='product'+productId;
      localStorage.setItem(cartData,cartItem.quantity);
    
      
      
    
    }

    function showImage(e) 
    {
      var srcImage = e.target.src;
      image.src = srcImage;
      var imagesItem = itemDiv.childNodes;
      for (i = 0; i < imagesItem.length; i++) {
        imagesItem[i].classList.remove("active");
      }
      e.target.classList.add("active");
    }

    var cartAnchor = document.getElementById("cart");
    cartAnchor.href = "/checkout page/index.html";
  },
});
