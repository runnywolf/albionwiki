function calc0(){
  var n, e_n = $("#calc0_n");
  
  if (calc_input_check(e_n, -99.99, p10(3), false)) n = parseFloat(e_n.val());
  else n = 0;

  $("#calc0_output").text(round_(1/(1+n/100), 3));
}

function calc1(){
  var point, e_point = $("#calc1_point");
  var type = parseInt($("#calc1_type").val());

  if (calc_input_check(e_point, 0, p10(5), true)) point = parseInt(e_point.val());
  else point = 0;
  
  $("#calc1_output_type").text(["魔法抗性","護甲","群體控制抗性"][type]);
  $("#calc1_output_point").text(point);
  $("#calc1_output_Dtype1").text(["魔法傷害","物理傷害","群體控制"][type]);
  $("#calc1_output_n").text(round_(100/(point+100)*100, 2)+"%");
  $("#calc1_output_Dtype2").text(["傷害","傷害","群控時間"][type]);
}

function calc2(){
  var p, e_p = $("#calc2_p");
  var dp, e_dp = $("#calc2_dp");

  if (calc_input_check($("#calc2_p"), 0, p10(5), true)) p = parseInt(e_p.val());
  else p = 0;
  if (calc_input_check($("#calc2_dp"), 0, p10(5), true)) dp = parseInt(e_dp.val());
  else dp = 0;
  if (dp > p){
    show_error($("#calc2_dp"), $("#main-error"), "輸入值必須 <= 敵人的傷害抗性");
    $("#calc2_p").val("");
    $("#calc2_dp").val("");
    p = 0;
    dp = 0;
  }

  $("#calc2_output").text(round_((100+p)/(100+p-dp), 3));
}
function calc2_clear(){
  $("#calc2_p").val("");
  $("#calc2_dp").val("");
  $("#calc2_output").text("1");
}