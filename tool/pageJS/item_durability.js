function calc1(){
  var value, e_value = $("#calc1_value");
  var dur, e_dur = $("#calc1_dur");

  if (calc_input_check(e_value, 0, p10(9), true)) value = parseInt(e_value.val());
  else value = 0;
  if (calc_input_check(e_dur, 1, 100, false)) dur = parseFloat(e_dur.val());
  else dur = 100;

  $("#calc1_pay").text(albion_short_num(value*(100-dur)*0.165));
}

function calc2(){
  var value, e_value = $("#calc2_value");
  var situation = parseInt($("#calc2_situation").val());

  if (calc_input_check(e_value, 0, p10(9), true)) value = parseInt(e_value.val());
  else value = 0;

  var dur = (situation?30:5);

  $("#calc2_pay").text(albion_short_num(value*dur*0.165));
}