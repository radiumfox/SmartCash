$(document).ready(function(){
  var currentTime = new Date();
  var thisYear = currentTime.getFullYear();
  var startYear = 1960;
  var x;
  for(x=thisYear; x>=startYear; x--){
      $(".years").append("<option value='" + x + "'>" + x + "</option>")
    };
});

$('.DateTextBox.NoYear').datepicker({
  beforeShow: function (input, inst) {
    inst.dpDiv.addClass('NoYearDatePicker');
  },
  onClose: function(dateText, inst){
      inst.dpDiv.removeClass('NoYearDatePicker');
  }
});

$('#datepicker').datepicker( { changeYear: false, dateFormat: 'dd/mm',});


$('#datepicker1').datepicker( { changeYear: true, dateFormat: 'dd/mm', });

$('#datepicker2').datepicker( { changeYear: false, dateFormat: 'dd/mm', });
