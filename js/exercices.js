var Workwell = require("workwell");
var $ = require("jquery");

function getServiceToken() {
    return $.ajax({
        type: 'GET',
        url: './service_token',
        success: function (res) {
            console.log("success fetching service token");
            window.localStorage.serviceToken = res.service_token; // so that we can use it again in other pages
            Workwell.setServiceToken(res.service_token);
            return res;
        },
        error: function (data) {
            return data;
        }
    });
}

function getUserInfo(data_) {
    return new Promise(function (resolve, reject) {
        Workwell.getUserInfo({
            success: function (res) {
                window.localStorage.userEmail = res.user.email; 
                window.localStorage.userFirstName = res.user.first_name;
                window.localStorage.userLastName = res.user.last_name;
                resolve(res);
            },
            error: function (data) {
                window.localStorage.userEmail = "";
                reject(data);
            }
        });
    });
}

function renderUI() {
    //UI
    
    //Gestion des videos
    document.getElementById("first_video").onclick = function() {
        Workwell.openWebPage(window.location.href + "../../video?vId=9TXPnBA7");
    };
    document.getElementById("second_video").onclick = function() {
        Workwell.openWebPage(window.location.href + "../../video?vId=asZwKFXK");
    };
    document.getElementById("third_video").onclick = function() {
        Workwell.openWebPage(window.location.href + "../../video?vId=6yS40hC6");
    };
    document.getElementById("fourth_video").onclick = function() {
        Workwell.openWebPage(window.location.href + "../../video?vId=E3ufSerK");
    };
    document.getElementById("fifth_video").onclick = function() {
        Workwell.openWebPage(window.location.href + "../../video?vId=3L9PTYmJ");
    };
    
    
    //Gestion du bouton partager
    let sharingProgramButton = Workwell.ui.createButton("PARTAGER WELLOGY !");
    sharingProgramButton.addClass("onboarding_button");
    sharingProgramButton.onClick(function(){
        //Partage avec email
        Workwell.openWebPage(window.location.href + "../../partage?sId=0");
    });
    $("#program_share").append(sharingProgramButton.toHTMLElement());
    let sharingCoachingButton = Workwell.ui.createButton("PARTAGER WELLOGY !");
    sharingCoachingButton.addClass("onboarding_button");
    sharingCoachingButton.onClick(function(){
        Workwell.openWebPage(window.location.href + "../../partage?sId=0");
    });
    $("#coaching_share").append(sharingCoachingButton.toHTMLElement());
}

$(document).ready(function () {
    getServiceToken()
        .then(renderUI)
        .catch(function (error) {
            console.log(error);
        });
});