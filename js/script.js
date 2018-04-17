// code implemented from https://www.udemy.com/shopping-cart/learn/v4/
var shopcart = [];

$(document).ready(function() {
  $(".button-collapse").sideNav({
    closeOnClick: true
  });

  $(".slider").slider({
    indicators: true,
    height: 400,
    transition: 500,
    interval: 6000
  });

  $(".carousel.carousel-slider").carousel({
    fullWidth: true,
    indicators: true
  });

  $(".modal").modal();

  $(".scrollspy").scrollSpy();

  outputCart();

  // remove items from shopping cart
  $("#output").on("click", ".remove-item", function() {
    var itemToDelete = $(".remove-item").index(this);
    shopcart.splice(itemToDelete, 1);
    sessionStorage["sca"] = JSON.stringify(shopcart);
    outputCart();
  });

  $(".productItem").click(function(e) {
    e.preventDefault();

    //to hold dataset-object
    var iteminfo = $(this.dataset)[0];
    iteminfo.qty = 1;

    var itemincart = false;
    //check if item actually exists before adding a new item
    $.each(shopcart, function(index, value) {
      if (value.id == iteminfo.id) {
        value.qty = parseInt(value.qty) + parseInt(iteminfo.qty);
        itemincart = true;
      }
    });

    if (!itemincart) {
      shopcart.push(iteminfo);
    }

    //'.stringify' string what's contained within shopcart-variable
    sessionStorage["sca"] = JSON.stringify(shopcart);
    outputCart();
  });

  function outputCart() {
    //whenever page loads - has session storage already a value?
    if (sessionStorage["sca"] != null) {
      //'.parse'  JSON-data back into usable object format
      shopcart = JSON.parse(sessionStorage["sca"].toString());
    }

    var holderHTML = "";
    var total = 0;
    var itemCnt = 0;

    $.each(shopcart, function(index, value) {
      var stotal = value.qty * value.price;
      total += stotal;
      itemCnt += parseInt(value.qty);

      holderHTML +=
        "<tr><td>" +
        value.qty +
        "</td><td>" +
        " " +
        value.name +
        "</td><td> " +
        formatMoney(value.price) +
        " </td><td> " +
        formatMoney(stotal) +
        '</td><td><a class="btn-floating btn-small waves-effect waves-light red remove-item"><i class="material-icons">remove_shopping_cart</i></a></td></tr>';
    });

    holderHTML +=
      '<tr style="font-weight: bold"><td class="col s1">Razem:</td><td><td></td><td>' +
      formatMoney(total) +
      "</td></tr>";

    $("#output").html(holderHTML);
    $(".total").html(formatMoney(total));
    $(".items").html(itemCnt);
  }

  function formatMoney(n) {
    return "&euro;" + (n / 100).toFixed(2);
  }
});
