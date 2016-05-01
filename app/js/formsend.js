$('.form').on('submit', function(event) {
  event.preventDefault();
  var form = $(this),
      data = form.serialize(),
      defObj = $.ajax({
        type : "POST",
        url : "../mailtest.php",
        dataType : "JSON",
        data: data});
        defObj.done(function(ans){
          if (ans.status == 'OK') {
            form.find('.form__button').val('Спасибо за заказ!');
            console.log(ans.msg);
          }
          if (ans.status == 'FAIL') {
            form.find('.form__button').val('Ошибка!');
            console.log(ans.msg);
          }  
          setTimeout(function(){
             form.find('.form__button').val('ЗАКАЗАТЬ!');
           }, 5000);
          form.find('input').val('');
      });
});