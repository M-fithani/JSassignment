
var mainDiv=document.getElementById("main_div");


var cartListDiv=document.createElement("div");
  cartListDiv.classList.add("itemdetail_div");

  var count=document.getElementById("cart_count");
  count.innerText=localStorage.getItem("itemCount");
  



  
 
        $.ajax({
          
        url: "https://5d76bf96515d1a0014085cf9.mockapi.io/product/",
        method: "GET",
        success: function (data)
        {
            var finalAmount=0;
          for(var i=0;i<data.length;i++)
          {
              var itemInList="product"+data[i].id;
              if(localStorage.getItem(itemInList)!=undefined)
              {
          
                  var itemDetail=document.createElement("div");
                   itemDetail.classList.add("detail_div","border");
        
                var imgDiv=document.createElement("div");
                imgDiv.classList.add("item_image");
                var itemImg=document.createElement("img");
                itemImg.classList.add("image_class");
                itemImg.alt="item image";
                itemImg.src=data[i].preview;
              
                imgDiv.append(itemImg);
          
                var infoDiv=document.createElement("div");
               var itemName=document.createElement("h3");
               itemName.innerText=data[i].name;
              
               var itemCount = document.createElement('p');
          itemCount.innerText = 'x ' + localStorage.getItem(itemInList);


        var price = localStorage.getItem(itemInList)*data[i].price;  
         
        finalAmount+=price;
       
      
      var amountPara=document.createElement("p");
      amountPara.innerText = "Amount : Rs  " + price;
      
      
      infoDiv.append(itemName,itemCount,amountPara);
      
      itemDetail.append(imgDiv,infoDiv);
      cartListDiv.append(itemDetail);
      
      
       
              }
            }    

            var amountSpan=document.createElement("span");
            amountSpan.innerHTML= finalAmount;
          
            
            
            var para=document.createElement("p");
             para.innerHTML="Amount: Rs ";
             para.append(amountSpan);
            
             var amountDetailDiv=document.createElement("div");
            amountDetailDiv.classList.add("border","amount_deatil");
          var amoutHeading=document.createElement("h2");
          amoutHeading.innerText="Total Amount" ;

var placeOrderbtn=document.createElement("button");
placeOrderbtn.classList.add("placebtn");
placeOrderbtn.innerText="Place Order";
placeOrderbtn.addEventListener("click" , placeOrder);

amountDetailDiv.append(amoutHeading,para,placeOrderbtn);
    mainDiv.append(cartListDiv,amountDetailDiv);
function placeOrder(e)
{
    localStorage.clear();
    var postOrder={
      name:"Mamta Fithani",
    
    }
    $.ajax({
      url:'https://5d76bf96515d1a0014085cf9.mockapi.io/neworder',
      method:'POST',
      data:JSON.stringify(postOrder),
      success: function(data){

      },
    })
  
    
  location.href = "/order confirm/index.html";
  
}
        }})

var totalItem=document.getElementById("total_item_para");
totalItem.classList.add("total_item");
if(localStorage.length!=0)
{
  var tItem=localStorage.getItem('itemCount');
  totalItem.innerText="Total Item : "+ tItem;
}
else{
    totalItem.innerText="Total Item : 0";
}


