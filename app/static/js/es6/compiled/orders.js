(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('body').on('change', '.menu', getMenu);
    $('body').on('click', '#add', addItem);
    $('body').on('click', '.remove', removeItem);
    $('body').on('click', '#submit', placeOrder);
    $('body').on('change', '.dish', changeTotal);
    $('body').on('change', 'input', changeTotal);
    $('body').on('blur', 'input', changeTotal);
  }
  function placeOrder(e) {
    $('#order').submit();
    var userId = $('#user').attr('data-id');
    e.preventDefault();
  }
  function changeTotal() {
    var total = 0;
    var itemCost = 0;
    var array = $('.item').toArray();
    array.forEach((function(i) {
      var element = $(i).find('.dish option:selected');
      if (element.attr('data-cost')) {
        var price = element.attr('data-cost');
        var qty = $(i).children().first().val() * 1;
        itemCost = qty * price;
        total = total + itemCost;
        $(i).find('.item-cost p').text('$' + itemCost.toFixed(2));
      }
    }));
    $('#total').text('$' + total.toFixed(2));
  }
  function removeItem(e) {
    if ($('.item').length > 1) {
      $(this).parent().parent().remove();
    }
    e.preventDefault();
    changeTotal();
  }
  function addItem() {
    var newItem = $('#order > .item:first-child').clone();
    newItem.children().first().val(1);
    newItem.find('.item-cost p').text('$0.00');
    $('#order').append(newItem);
  }
  function getMenu() {
    var menu = $(this).val();
    var next = $(this).next();
    ajax(("/dishes/" + menu), 'get', null, (function(html) {
      next.empty().append(html);
    }));
  }
})();

//# sourceMappingURL=orders.map
