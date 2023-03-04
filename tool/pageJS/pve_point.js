function calc1(){
  var type_percent = {"head":0.025, "armor":0.05, "shoe":0.025, "weapon":0.1, "offhand":0.005};
  var b_auto = checkbox_checked($("#calc1_auto"));
  var fame, e_fame = $("#calc1_fame");
  
  if (calc_input_check(e_fame, 0, p10(12), true)) fame = parseInt(e_fame.val());
  else fame = 0;

  var percent = 0;
  ["head", "armor", "shoe", "weapon", "offhand"].map(function (i){
    if (checkbox_checked($("#calc1_"+i+"_in"))) percent += type_percent[i];
    if (checkbox_checked($("#calc1_"+i+"_out"))) percent += type_percent[i];
  });
  
  var point = parseInt(fame*percent);
  var sliver = 0;
  if (b_auto){
    point *= 4;
    sliver = parseInt(point*0.9);
  }
  
  $("#calc1_output_point").text(albion_short_num(point));
  $("#calc1_output_silver").text(albion_short_num(sliver));
}