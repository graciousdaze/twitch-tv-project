var users =["ESL_SC2", "OgamingSC2", "thepetcollective", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "GeekandSundry"];

getChannelInformation();

function getChannelInformation(){
  users.forEach(function(user){
    $.getJSON("https://wind-bow.glitch.me/twitch-api/channels/" + user, function(json){
      $("#userGroup").append("<div class='col-md-3 userInfo' id='" + user + "'><a href='" + json.url + "' target='_blank'><div class='overlay users'><p class='userName'>" + user + "</p><div class='streamOverlay' id='streamOverlay"+ user + "'></div></div></a></div>");
      $("#" + user).css({"background": "url('" + json.logo + "') no-repeat no-repeat center"});
      isOnline(user);
     });
  });
}

function isOnline(user){
  users.forEach(function(){
    $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/" + user, function(json){
      if(json.stream){
        $("#" + user).addClass("onlineUser");
        $("#streamOverlay" + user).addClass("overlayOnline");
        $("#streamOverlay" + user).html("<p class='statusOnline'><span><em>Currently Streaming:</em></span>"+ json.stream.channel.status +"</p>");
      } else {
        $("#streamOverlay" + user).html("<p class='statusOffline'>Offline</p>")
      }
    });
  });
}

function addNewChannel(){
  var channelName = $("#channelName").val();
  $.getJSON("https://wind-bow.glitch.me/twitch-api/channels/" + channelName, function(json){
  if($("#" + channelName).text() != ""){
    $("#alreadySearched").removeClass("hidden");
    $("#errorMessage").addClass("hidden");
    } else if(!json.error){
      $("#searches").append("<div class='col-md-3 userInfo' id='" + channelName + "'><a href='" + json.url + "' target='_blank'><div class='overlay users'><p class='userName'>" + channelName + "</p><div class='streamOverlay' id='streamOverlay"+ channelName + "'></div></div></a></div>");
      $("#" + channelName).css({"background": "url('" + json.logo + "') no-repeat no-repeat center"});
      isOnline(channelName);
      $("#errorMessage, #alreadySearched").addClass("hidden");
      $("#searches").removeClass("hidden");
    } else {
      $("#errorMessage").removeClass("hidden");
      $("#alreadySearched").addClass("hidden");
    }
  });
}

$("#addChannel").on("click", function(){
  addNewChannel();
});

$("body").on("keypress", function(e){
  var key = e.which || e.keyword;
  if(key == 13){
    addNewChannel();
  }
});

$("#all").on("click", function(){
  $(".statusOnline, .statusOffline").closest(".userInfo").removeClass("hidden");
});

$("#online").on("click", function(){
  $(".statusOffline").closest(".userInfo").addClass("hidden");
  $(".statusOnline").closest(".userInfo").removeClass("hidden");
});

$("#offline").on("click", function(){
  $(".statusOnline").closest(".userInfo").addClass("hidden");
  $(".statusOffline").closest(".userInfo").removeClass("hidden");
});