var jsonData = {};
$.ajax({
  url: "http://iribarrem.ddns.net:1880/info",
  type: "GET",
  data: { topic: "/Gladis" },
  success: (res) => {
    switch (res.Light) {
      case "ON":
        $("#light_Btn").data("bs.toggle").on(true);
        break;
      case "OFF":
        $("#light_Btn").data("bs.toggle").off(true);
        break;
    }
  }
});

$(() => {
  $("#light_Btn").change( () => {
    jsonData.topic = "/Gladis";
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