$.ajax({
  url: "http://iribarrem.ddns.net:1880/info",
  type: "GET",
  data: { topic: "/Gustavo/Data" },
  success: (res) => {
    $("#actual-temp").html(res.Room_Temperature.toFixed(1) + " °C");
  }
});

$.ajax({
  url: "http://iribarrem.ddns.net:1880/info",
  type: "GET",
  data: { topic: "/Gustavo" },
  success: (res) => {
    $("#ac_Temp_Label").html(res.AC.Temperature);

    switch (res.AC.Power) {
      case "ON":
        $("#ac_Power_Btn").data("bs.toggle").on(true);
        break;
      case "OFF":
        $("#ac_Power_Btn").data("bs.toggle").off(true);
        break;
    }

    switch (res.AC.Mode) {
      case "HEAT":
        $("#ACMode_Label").html("<i class='fas fa-sun mr-1'></i> Aquecer");
        break;
      case "COOL":
        $("#ACMode_Label").html("<i class='fas fa-snowflake mr-1'></i> Esfriar");
        break;
      case "DRY":
        $("#ACMode_Label").html("<i class='fas fa-tint-slash mr-1'></i> Secar");
        break;
      case "FAN":
        $("#ACMode_Label").html("<i class='fas fa-fan mr-1'></i> Ventilar");
        break;
    }

    switch (res.AC.Turbo) {
      case "ON":
        $("#ac_Turbo_Btn").data("bs.toggle").on(true);
        break;
      case "OFF":
        $("#ac_Turbo_Btn").data("bs.toggle").off(true);
        break;
    }

    switch (res.AC.LED) {
      case "ON":
        $("#ac_LED_Btn").data("bs.toggle").on(true);
        break;
      case "OFF":
        $("#ac_LED_Btn").data("bs.toggle").off(true);
        break;
    }

    switch (res.AC.Swing) {
      case "ON":
        $("#ac_Swing_Btn").data("bs.toggle").on(true);
        break;
      case "OFF":
        $("#ac_Swing_Btn").data("bs.toggle").off(true);
        break;
    }

    switch (res.AC.Speed) {
      case "0":
        $("#ac_Fan_Label").html("Auto");
        break;  

      case "1":
        $("#ac_Fan_Label").html("Velocidade 1");
        break;
      
      case "2":
        $("#ac_Fan_Label").html("Velocidade 2");
        break;

      case "3":
        $("#ac_Fan_Label").html("Velocidade 3");
        break;
    }

    switch (res.Switch.Light) {
      case "ON":
        $("#light_Btn").data("bs.toggle").on(true);
        break;
      case "OFF":
        $("#light_Btn").data("bs.toggle").off(true);
        break;
    }
  }
});

var jsonData = {};

function buttonClick(elem) {
  switch (elem.id) {
    case "heat_Btn":
      $("#ACMode_Label").html("<i class='fas fa-sun mr-1'></i> Aquecer");
      jsonData.topic = "/Gustavo/AC";
      jsonData.payload = { Mode: "HEAT" };
      break;
    case "cool_Btn":
      $("#ACMode_Label").html("<i class='fas fa-snowflake mr-1'></i> Esfriar");
      jsonData.topic = "/Gustavo/AC";
      jsonData.payload = { Mode: "COOL" };
      break;

    case "dry_Btn":
      $("#ACMode_Label").html("<i class='fas fa-tint-slash mr-1'></i> Secar");
      jsonData.topic = "/Gustavo/AC";
      jsonData.payload = { Mode: "DRY" };
      break;

    case "fan_Btn": 
      $("#ACMode_Label").html("<i class='fas fa-fan mr-1'></i> Ventilar");
      jsonData.topic = "/Gustavo/AC";
      jsonData.payload = { Mode: "FAN" };
      break;

    case "ac_Temp_Dec":
      temp = parseInt($("#ac_Temp_Label").html()) - 1;
      jsonData.topic = "/Gustavo/AC";
      jsonData.payload = { Temperature: temp }
      $("#ac_Temp_Label").html(temp);
      break;

    case "ac_Temp_Inc":
      temp = parseInt($("#ac_Temp_Label").html()) + 1;
      jsonData.topic = "/Gustavo/AC";
      jsonData.payload = { Temperature: temp }
      $("#ac_Temp_Label").html(temp);
      break;

    case "ac_Fan_Btn": 
      switch($("#ac_Fan_Label").html()){
        case "Auto":
          $("#ac_Fan_Label").html("Velocidade 1");
          jsonData.topic = "/Gustavo/AC";
          jsonData.payload = { Speed: 1 };
          break;
        
        case "Velocidade 1":
          $("#ac_Fan_Label").html("Velocidade 2");
          jsonData.topic = "/Gustavo/AC";
          jsonData.payload = { Speed: 2 };
          break;

        case "Velocidade 2":
          $("#ac_Fan_Label").html("Velocidade 3");
          jsonData.topic = "/Gustavo/AC";
          jsonData.payload = { Speed: 3 };
          break;

        case "Velocidade 3":
          $("#ac_Fan_Label").html("Auto");
          jsonData.topic = "/Gustavo/AC";
          jsonData.payload = { Speed: 0 };
          break;   
      }
  }

  jsonSend(jsonData);
}

$(() => {
  $("#ac_Power_Btn").change( () => {
    jsonData.topic = "/Gustavo/AC";
    if($("#ac_Power_Btn").prop('checked'))
      jsonData.payload = { Power: "ON" };
    else
      jsonData.payload = { Power: "OFF" };
    jsonSend(jsonData);
  });

  $("#ac_Turbo_Btn").change( () => {
    jsonData.topic = "/Gustavo/AC";
    if($("#ac_Turbo_Btn").prop('checked'))
      jsonData.payload = { Turbo: "ON" };
    else
      jsonData.payload = { Turbo: "OFF" };
    jsonSend(jsonData);
  });

  $("#ac_LED_Btn").change( () => {
    jsonData.topic = "/Gustavo/AC";
    if($("#ac_LED_Btn").prop('checked'))
      jsonData.payload = { LED: "ON" };
    else
      jsonData.payload = { LED: "OFF" };
    jsonSend(jsonData);
  });

  $("#ac_Swing_Btn").change( () => {
    jsonData.topic = "/Gustavo/AC";
    if($("#ac_Swing_Btn").prop('checked'))
      jsonData.payload = { Swing: "ON" };
    else
      jsonData.payload = { Swing: "OFF" };
    jsonSend(jsonData);
  });

  $("#light_Btn").change( () => {
    jsonData.topic = "/Gustavo/Switch";
    if($("#light_Btn").prop('checked'))
      jsonData.payload = { Light: "ON" };
    else
      jsonData.payload = { Light: "OFF" };
    jsonSend(jsonData);
  });
});

function jsonSend(sendJSON) {
  $.ajax({
    url: "http://iribarrem.ddns.net:1880/control",
    type: "POST",
    data: sendJSON,
    dataType: 'json',
    success: (data) => {
      console.log(data)
    },
    error: (err) => {
      console.log(err);
    }
  });
}