var container = $("#container");
var footer = $("#footer");
var on = 1;
function resizeContent(){
    $("#homePageDiv").css("height", 0);
    $("#homePageDiv").css("height", container.height()-footer.height());
}
$(document).ready(function(){
    resizeContent();
    muteMusic();
});
$(window).resize(function() {
    resizeContent();
});
function muteMusic() {
    if (on == 1) {
        document.getElementById("MusicBoxON").src = "/static/images/VolumeOFF.png"
        document.getElementById("MusicPlayer").pause();
        on = 0;
    }
    else {
        document.getElementById("MusicBoxON").src = "/static/images/VolumeON.png"
        document.getElementById("MusicPlayer").play();
        on = 1;
    }
}
