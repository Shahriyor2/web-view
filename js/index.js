$(function () {
  //console.log('salom');
  $("#card_num").inputmask("9999  9999  9999  9999", { placeholder: "" });
  //$('#receiver_card_num').inputmask('9999  9999  9999  9999', {"placeholder": ""});
  $("#exp_date_month").inputmask("0|19", { placeholder: "" });
  $("#exp_date_year").inputmask("99", { placeholder: "" });
  $("#exp_date").inputmask("0|19/99", { placeholder: "" });
  $("#sender_cvv").inputmask("999", { placeholder: "" });
  //$('#phone').inputmask('+\\9\\92 999 99 99 99', {"placeholder": ""});
  $("#otp").inputmask("999999", { placeholder: "" });
  //$('#amount').inputmask('999999', {"placeholder": ""});
  $("#card_holder").bind("keyup", function () {
    $(this).val(
      $(this)
        .val()
        .replace(/[^A-Z ]/i, "")
    );
  });
  //$("#modal").hide();
});

function sendSMSOTP() {
  $("#error_span").text("").hide();
  $("#resend_otp").hide();

  if (validateSendSMSDatas()) {
    return;
  }

  //$.post("http:// 192.168.150.9:8080/mb/ws/v3/clients/6332/accounts")
  var card_num = $("#card_num").val().replace(/\s/g, "");
  var exp_date_month = $("#exp_date_month").val();
  var exp_date_year = $("#exp_date_year").val();
  var sender_cvv = $("#sender_cvv").val();
  var card_holder = $("#card_holder").val();
  var exp_date = $("#exp_date").val();
  //var exp_date = exp_date_month + exp_date_year;
  exp_date = exp_date.replace("/", "");
  $("#gsms").prop("disabled", true);
  $.post("/attach/sendSMS", {
    cardNumber: card_num,
    expDate: exp_date,
    cardHolder: card_holder,
    secureCode: sender_cvv,
  })
    .done(function (data) {
      $("#gsms").hide();

      $("#card_num").prop("disabled", true);
      $("#exp_date").prop("disabled", true);
      $("#sender_cvv").prop("disabled", true);
      $("#card_holder").prop("disabled", true);

      $("#send_data").show();
      $("#otp").show();
      /*var text = (new XMLSerializer()).serializeToString(data);
		alert("Data Loaded: " + text); */
      setTimeout(function () {
        $("#resend_otp").show("slow");
      }, 10000);
    })
    .fail(function (error) {
      $("#gsms").prop("disabled", false);
      if (error.responseJSON.errorCode == 100204) {
        $("#error_span").text("Карта была добавлена ранее").show();
      } else if (error.responseJSON.errorCode == 320) {
        $("#error_span")
          .text("Карта не определена. Проверьте введенные данные")
          .show();
      } else if (error.responseJSON.errorCode == 1320) {
        $("#error_span")
          .text("Номер не привязан к карте, обратитесь в банк")
          .show();
      } else if (error.responseJSON.errorText == 60) {
        $("#error_span")
          .text(
            "Превышен лимит на число попыток привязки карты. Попробуйте завтра"
          )
          .show();
      } else if (error.responseJSON.errorText == 40) {
        $("#error_span").text("Ошибка карты. Обратитесь в  банк").show();
      } else if (error.responseJSON.errorText == 81) {
        $("#error_span").text("Неверный CVV").show();
      } else {
        $("#error_span")
          .text(
            "Не удалось отправить запрос. Повторите позже (" +
              error.responseJSON.errorText +
              ")"
          )
          .show();
      }
    });
}

// forVisa
function sendVisaHumoSMSOTP() {
  $("#error_span").text("").hide();
  $("#resend_otp").hide();

  if (validateSendSMSDatas()) {
    return;
  }

  //$.post("http:// 192.168.150.9:8080/mb/ws/v3/clients/6332/accounts")
  var card_num = $("#card_num").val().replace(/\s/g, "");
  var exp_date_month = $("#exp_date_month").val();
  var exp_date_year = $("#exp_date_year").val();
  var sender_cvv = $("#sender_cvv").val();
  var card_holder = $("#card_holder").val();
  var exp_date = $("#exp_date").val();
  //var exp_date = exp_date_month + exp_date_year;
  exp_date = exp_date.replace("/", "");
  $("#gsms").prop("disabled", true);
  // $.post("/attach/sendSMS", {
  $.post("http://192.168.0.163:8860/web-check/attach/sendSMS", {
    cardNumber: card_num,
    expDate: exp_date,
    cardHolder: card_holder,
    secureCode: sender_cvv,
  })
    .done(function (data) {
      $("#gsms").hide();

      $("#card_num").prop("disabled", true);
      $("#exp_date").prop("disabled", true);
      $("#sender_cvv").prop("disabled", true);
      $("#card_holder").prop("disabled", true);

      $("#send_data").show();
      $("#otp").show();
      /*var text = (new XMLSerializer()).serializeToString(data);
		alert("Data Loaded: " + text); */
      setTimeout(function () {
        $("#resend_otp").show("slow");
      }, 45000);
    })
    .fail(function (error) {
      $("#gsms").prop("disabled", false);
      if (error.responseJSON.errorCode == 100204) {
        $("#error_span").text("Карта была добавлена ранее").show();
      } else if (error.responseJSON.errorCode == 320) {
        $("#error_span")
          .text("Карта не определена. Проверьте введенные данные")
          .show();
      } else if (error.responseJSON.errorCode == 1320) {
        $("#error_span")
          .text("Номер не привязан к карте, обратитесь в банк")
          .show();
      } else if (error.responseJSON.errorText == 60) {
        $("#error_span")
          .text(
            "Превышен лимит на число попыток привязки карты. Попробуйте завтра"
          )
          .show();
      } else if (error.responseJSON.errorText == 40) {
        $("#error_span").text("Ошибка карты. Обратитесь в  банк").show();
      } else if (error.responseJSON.errorText == 81) {
        $("#error_span").text("Неверный CVV").show();
      } else {
        $("#error_span")
          .text(
            "Не удалось отправить запрос. Повторите позже (" +
              error.responseJSON.errorText +
              ")"
          )
          .show();
      }
    });
}

function validateSendSMSDatas() {
  var card_num = $("#card_num").val();
  var exp_date_month = $("#exp_date_month").val();
  var exp_date_year = $("#exp_date_year").val();
  var cvv = $("#sender_cvv").val();
  var card_holder = $("#card_holder").val();
  var f = false;
  if (
    card_num == "" ||
    exp_date_month == "" ||
    exp_date_year == "" ||
    cvv == "" ||
    card_holder == ""
  ) {
    $("#error_span").text("Заполните все поля").show();
    return true;
  }

  var cardRegularExp = /^[0-9]{16}$/;
  card_num = card_num.replace(/\s/g, "");

  if (!cardRegularExp.exec(card_num)) {
    $("#card_num").css("border-color", "red");
    $("#sender_init_err_message").css("display", "block");
    $("#card_num").focus();
    f = true;
  } else {
    $("#card_num").css("border-color", "#66afe9");
    $("#sender_init_err_message").css("display", "none");
  }

  /*if (exp_date_month > 12 || exp_date_month == 0) {
		$('#exp_date_month').css('border-color', 'red');
		$('#err_exp_date_month').css('display', 'block');
		$('#exp_date_month').focus();
		f = true;	
	} else {
		$('#exp_date_month').css('border-color', '#66afe9');
		$('#err_exp_date_month').css('display', 'none');

	}*/

  /*if (exp_date_year < 19 ) {
		$('#exp_date_year').css('border-color', 'red');
		$('#err_exp_date_year').css('display', 'block');
		$('#exp_date_year').focus();
		f = true;
	} else {
		$('#err_exp_date_year').css('display', 'none');
		$('#exp_date_year').css('border-color', '#66afe9');
	}*/

  return f;
}

function verify() {
  var otp = $("#otp").val();
  $("#error_span").hide();
  if (otp == "") {
    $("#otp").css("border-color", "red");
    $("#error_span").text("Введите код").show();
  } else {
    $("#otp").css("border-color", "#66afe9");
    var card_num = $("#card_num").val().replace(/\s/g, "");
    var exp_date_month = $("#exp_date_month").val();
    var exp_date_year = $("#exp_date_year").val();
    var sender_cvv = $("#sender_cvv").val();
    var card_holder = $("#card_holder").val();
    var exp_date = $("#exp_date").val();
    exp_date = exp_date.replace("/", "");
    // var exp_date = exp_date_month + exp_date_year;
    $("#send_data").prop("disabled", true);
    $.post("/attach/verify", {
      cardNumber: card_num,
      expDate: exp_date,
      cardHolder: card_holder,
      secureCode: sender_cvv,
      otp: otp,
    })
      .done(function (data) {
        $("#send_data").prop("disabled", true);
        $("#unchor").remove();
        $("#attach").hide();
        $("#attached").show();
        $("#card_form").append(
          "<p style='color:green;'>Карта успешно добавлена и верифицирована</p>"
        );
        $("#modal").fadeIn();
        setTimeout(function () {
          window.location.replace(data.redirectURL);
        }, 2 * 1000 /*2 seconds*/);
      })
      .fail(function (error) {
        $("#send_data").prop("disabled", false);
        if (error.responseJSON.errorCode == 100205) {
          $("#error_span").text("Неверный код").show();
        }
      });
  }
}

// function verifyVisaHumo() {
//   var otp = $("#otp").val();
//   $("#error_span").hide();
//   if (otp == "") {
//     $("#otp").css("border-color", "red");
//     $("#error_span").text("Введите код").show();
//   } else {
//     $("#otp").css("border-color", "#66afe9");
//     var card_num = $("#card_num").val().replace(/\s/g, "");
//     var exp_date_month = $("#exp_date_month").val();
//     var exp_date_year = $("#exp_date_year").val();
//     var sender_cvv = $("#sender_cvv").val();
//     var card_holder = $("#card_holder").val();
//     // var exp_date = exp_date_month + exp_date_year;
//     var exp_date = $("#exp_date").val();
//     exp_date = exp_date.replace("/", "");
//     $("#send_data").prop("disabled", true);
//     $.post("http://192.168.0.163:8860/web-check/attach/verify", {
//       cardNumber: card_num,
//       expDate: exp_date,
//       cardHolder: card_holder,
//       secureCode: sender_cvv,
//       otp: otp,
//     })
//       .done(function (data) {
//         $("#send_data").prop("disabled", true);
//         $("#unchor").remove();
//         $("#attach").hide();
//         $("#attached").show();
//         $("#card_form").append(
//           "<p style='color:green;'>Карта успешно добавлена и верифицирована</p>"
//         );
//         $("#modal").fadeIn();
//         setTimeout(function () {
//           window.location.replace(data.redirectURL);
//         }, 2 * 1000 /*2 seconds*/);
//       })
//       .fail(function (error) {
//         $("#send_data").prop("disabled", false);
//         if (error.responseJSON.errorCode == 100205) {
//           $("#error_span").text("Неверный код").show();
//         }
//       });
//   }
// }

// Preloader

$(window).load(function () {
  $(".before-load-page").hide();
});
