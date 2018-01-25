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

function changePage() {
    window.setTimeout(function() {
        var imageToFadeOut = document.getElementById('index');
        imageToFadeOut.className = imageToFadeOut.className ? '' : 'fadeOut';
        setTimeout(function () {
            imageToFadeOut.className = 'hidden';
        }, 1000);
        var imageToFadeIn = document.getElementById('onboarding');
        imageToFadeIn.className = imageToFadeIn.className ? '' : 'fadeIn';
    }, 3000);   
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
        .then(changePage)
        .catch(function (error) {
            console.log(error);
        });
});