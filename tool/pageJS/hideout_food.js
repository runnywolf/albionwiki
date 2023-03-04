function calc1(){
  var l_f = [756, 756, 799, 690, 785, 817, 730];

  var l_fp = [null, null, null, null, null, null, null];
  for (var i = 0; i <= 6; i++){
    var e_fp = $("#calc1_f"+i+"p");
    if (calc_input_check(e_fp, 0, p10(5), true)) l_fp[i] = parseInt(e_fp.val());
  }
  
  var min_fp = 1e6, min_fp_i = null;
  for (var i = 0; i <= 6; i++){
    if (l_fp[i] == null) continue;
    if (l_fp[i] < min_fp){
      min_fp = l_fp[i];
      min_fp_i = i;
    }
  }

  for (var i = 0; i <= 6; i++){
    if (l_fp[i] == null) $("#calc1_f"+i).text("-");
    else $("#calc1_f"+i).text(round_(l_fp[i]/l_f[i], 2));
    $("#calc1_f"+i).css("color", "#000");
  }
  if (min_fp_i != null) $("#calc1_f"+min_fp_i).css("color", "#f00");
}