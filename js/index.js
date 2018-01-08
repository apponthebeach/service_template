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
    let startButton = Workwell.ui.createButton("COMMENCER L'EXPÉRIENCE");
    startButton.addClass("onboarding_button");
    startButton.onClick(function(){
        Workwell.openWebPage(window.location.href + "../../home");
    });
    $("#start_button").append(startButton.toHTMLElement());
}

$(document).ready(function () {
    getServiceToken()
        .then(renderUI)
        .catch(function (error) {
            console.log(error);
        });
});