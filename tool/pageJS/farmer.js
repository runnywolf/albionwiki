function calc1(){
  var inLevel, e_inLevel = $("#calc1_inLevel");
  var outLevel, e_outLevel = $("#calc1_outLevel");

  if (calc_input_check(e_inLevel, 0, 100, true)) inLevel = parseInt(e_inLevel.val());
  else inLevel = 0;
  if (calc_input_check(e_outLevel, 0, 100, true)) outLevel = parseInt(e_outLevel.val());
  else outLevel = 0;

  $("#calc1_output").text(parseInt(1000/(2**((100*inLevel+200*outLevel)/10000))));
}
function calc1_clear(){
  $("#calc1_inLevel").val("");
  $("#calc1_outLevel").val("");
  $("#calc1_output").text("1000");
}

function calc2(){
  var plot, e_plot = $("#calc2_plot");
  var price, e_price = $("#calc2_price");
  var tax, e_tax = $("#calc2_tax");

  if (calc_input_check(e_plot, 1, 10000, true)) plot = parseInt(e_plot.val());
  else plot = 0;
  if (calc_input_check(e_price, 0, 100000, true)) price = parseInt(e_price.val());
  else price = 0;
  if (calc_input_check(e_tax, 0, 100, false)) tax = parseFloat(e_tax.val());
  else tax = 0;

  var output = parseInt((price*(1-tax/100)*9-2000)*9*plot);

  $("#calc2_output").text(albion_short_num(output));
}
function calc2_clear(){
  $("#calc2_plot").val("");
  $("#calc2_price").val("");
  $("#calc2_tax").val("");
  $("#calc2_output").text("0");
}

function calc3(){
  var p, e_p = $("#calc3_p");
  var dp, e_dp = $("#calc3_dp");
  var vip, e_vip = $("#calc3_vip");
  
  if (calc_input_check(e_p, 125, 1000, true)) p = parseInt(e_p.val());
  else p = 1000;
  if (calc_input_check(e_dp, 0, p10(6), true)) dp = parseInt(e_dp.val());
  else dp = 0;
  if (calc_input_check(e_vip, 0, p10(9), false)) vip = parseFloat(e_vip.val());
  else vip = 0;

  var output = parseInt(4000*parseInt(dp/p)-vip/300000*dp);

  $("#calc3_output").text(albion_short_num(output));
}
function calc3_clear(){
  $("#calc3_p").val("");
  $("#calc3_dp").val("");
  $("#calc3_vip").val("");
  $("#calc3_output").text("0");
}