var buttonReset =  document.querySelector("#reset");
buttonReset.addEventListener("click", returnListItems);
var inputText = document.querySelector("#text");
inputText.addEventListener("keypress", function(e){
	search(e.keyCode);
});
var buttonSearch =  document.querySelector("#button-search");
buttonSearch.addEventListener("click", function() {
	search(13);
});

var addressInfo = document.querySelector("#address-info");
var clientInfo = document.querySelector("#client-info");

function search(e) {
	if (e == 13) {
		var searchRequest = document.getElementById('text').value;
		 	if (searchRequest == "") return;
			returnListItems();
			for(var i = 0; i < Orders.length; i++) {
				var flexFlag = false;
				ArrOrderInfoGenerator(i);

				for (var k = 0; k < ArrOrderInfo.length; k++) {
					if(~ArrOrderInfo[k].toLowerCase().indexOf(searchRequest.toLowerCase()) ){
						// console.log('Найдено ' + Orders[i].id);
						flexFlag = true;
					} 
		 	}
		 	if (flexFlag == false) {
		 		document.querySelector("#li" + (i + 1)).style.display = "none";
	 		}
		 	ArrOrderInfo = [];
		} 
	}
}
function returnListItems() {
	for(var i = 1; i <= Orders.length; i++) {
		document.querySelector("#li" + i).style.display = "flex";
	}
}
var ArrOrderInfo = [];
function ArrOrderInfoGenerator(i) {
	ArrOrderInfo.push("Order " + Orders[i].id);
	for (var key in Orders[i].OrderInfo) {
		
		if (key == "shippedAt") {
			ArrOrderInfo.push("Shipped: " + Orders[i].OrderInfo[key]);
			continue;
		}
  		ArrOrderInfo.push(Orders[i].OrderInfo[key]);
	}
	return ArrOrderInfo;
}
var ClassesForPreview = ["order-number","order-data","order-company","order-time","order-shipped-time"];
var IdsForMain = ['main-order',"customer","ordered-days","shipped-days"];
var ul = document.querySelector("#orders-list");
function OrderPreviewGenerator() {
	for(var j = 0; j < Orders.length; j++) {
		ArrOrderInfoGenerator(j);
		var li = document.createElement("li");
		li.className = 'order-preview';
		li.id = "li" + Orders[j].id;
		li.dataset.extraData = "Some Extra data for " + j;
		ul.appendChild(li);
		for(var i = 0; i < 5; i++) {
			var span = document.createElement("span");
			span.className = ClassesForPreview[i];
			span.innerHTML = ArrOrderInfo[i];
			li.appendChild(span);
		}
		ArrOrderInfo = [];
	}
}
OrderPreviewGenerator();
var backgroundColorFlag = 0;
function fullInformation(i) {

	addressInfo.style.backgroundColor = "#6cbeff";
	clientInfo.style.backgroundColor = 'transparent';

	document.querySelector("#li" + (backgroundColorFlag + 1)).style.backgroundColor = "#FFF";
	backgroundColorFlag = i;
	document.querySelector("#li" + (i + 1)).style.backgroundColor = "#e8eff7";
	ArrOrderInfoGenerator(i);

	var shipped = ArrOrderInfo.pop();
	ArrOrderInfo[3] = shipped;
	var x = ArrOrderInfo[1];
	ArrOrderInfo[1] = ArrOrderInfo[2];
	ArrOrderInfo[2] = x;
	for (var k = 0; k < IdsForMain.length; k++) {

		// console.log(ArrOrderInfo[k]);
		document.querySelector('#' + IdsForMain[k]).innerHTML = ArrOrderInfo[k];
	}

	ArrOrderInfo = [];

	var shippingOrderInfo = ["name", "street","zip-code","region","country"];
	var customerOrderInfo = ["firstName","lastName","address","phone","email"];
	var z = 0;
	for (var key in Orders[i].ShipTo) {
		document.querySelector("#" + shippingOrderInfo[z]).innerHTML = Orders[i].ShipTo[key];
	  	z++;
	}
	z = 0;
	for (var key in Orders[i].CustomerInfo) {
	  	document.querySelector("#" + customerOrderInfo[z]).innerHTML = Orders[i].CustomerInfo[key];
	  	z++;
	}
	z = 0;
		document.querySelector("#shippind-info").style.display = "block";
	document.querySelector("#customer-info").style.display = "none";

	console.log(Orders[i].products.length);

	var lineItems = document.querySelector("#lineItems");
	lineItems.innerHTML =  Orders[i].products.length;

	var tableBody = document.querySelector("#table-body"); 
	tableBody.innerHTML = "";
	
	for (var t = 0; t < Orders[i].products.length; t++) {

		var div = document.createElement("div");
		tableBody.appendChild(div);
		
		for(vv = 0; vv < 4; vv++) {

			var p = document.createElement("p");
			div.appendChild(p);
			if (vv == 2) {
				var span = document.createElement("span");
				span.innerHTML = Orders[i].products[t].quantity;
				p.appendChild(span);
				continue;
			}
			var span1 = document.createElement("span");
			span1.className = "font-bold";
			var span2 = document.createElement("span");
			span2.className = "currency";
			if(vv == 0) {
				span2.className = "";
				span1.innerHTML = Orders[i].products[t].name;
				span2.innerHTML = Orders[i].products[t].id;
			}
			if (vv == 1) {
				span1.innerHTML = Orders[i].products[t].price + " ";
				span2.innerHTML = Orders[i].products[t].currency;
			}
			if (vv == 3) {
				span1.innerHTML = Orders[i].products[t].totalPrice + " ";
				span2.innerHTML = Orders[i].products[t].currency;
			}
			p.appendChild(span1);
			p.appendChild(span2);
		}	
		console.log(Orders[i].products[0].name);
	}
}

fullInformation(0);

var ul = document.querySelector("ul");
ul.addEventListener("click", function (event) {
 	if (event.target.tagName == "SPAN") {
 		
 		var arr = event.path[1].id.split('i')[1];
		fullInformation(arr - 1);
 	} else {
 		
 		var arr = event.target.id.split('i')[1];
		fullInformation(arr - 1);
 	}
 	
 }, true);



addressInfo.addEventListener("click", function () {
	addressInfo.style.backgroundColor = "#6cbeff";
	clientInfo.style.backgroundColor = 'transparent';
	document.querySelector("#shippind-info").style.display = "block";
	document.querySelector("#customer-info").style.display = "none";
});
clientInfo.addEventListener("click", function () {
	addressInfo.style.backgroundColor = 'transparent';
	clientInfo.style.backgroundColor = "#6cbeff";
	document.querySelector("#customer-info").style.display = "block";
	document.querySelector("#shippind-info").style.display = "none";
});