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
                console.log("success get user info");   
                resolve(res);
            },
            error: function (data) {
                console.log("error get user info");
                reject(data);
            }
        });
    });
}

function renderUI() {
    //UI
    let sharingProgramButton = Workwell.ui.createButton("PARTAGER WELLOGY !");
    sharingProgramButton.addClass("onboarding_button");
    sharingProgramButton.onClick(function(){
        //Partage avec email
        window.location.href("mailto:axeldesaintemarie@gmail.com");
    });
    $("#program_share").append(sharingProgramButton.toHTMLElement());
    let sharingCoachingButton = Workwell.ui.createButton("PARTAGER WELLOGY !");
    sharingCoachingButton.addClass("onboarding_button");
    sharingCoachingButton.onClick(function(){
        //Partage avec email
        window.location.href("mailto:axeldesaintemarie@gmail.com");
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