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
    //Gestion de la barre de navigation
    var navbar = Workwell.getNavBar();
    navbar.beginUpdate();
    navbar.setTitle("Wellogy");
    navbar.commitUpdate();
    
    //UI
    document.getElementById("home_first_section").onclick = function() {
        Workwell.openWebPage(window.location.href + "../../video");
    };
    document.getElementById("home_second_section").onclick = function() {
        Workwell.openWebPage(window.location.href + "../../exercices");
    };
    document.getElementById("home_third_section").onclick = function() {
        Workwell.openWebPage(window.location.href + "../../article");
    };
}

$(document).ready(function () {
    getServiceToken()
        .then(renderUI)
        .catch(function (error) {
            console.log(error);
        });
});