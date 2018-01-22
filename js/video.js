var Workwell = require("workwell");
var $ = require("jquery");

//Récupération de la valeur d'un paramètre en fonction de son nom dans une URL précise
function getParameterByName(aName, aUrl) {
    //S'il n'y a pas de variable aUrl définie, on la redéfinie avec l'URL du navigateur
    if (!aUrl) {
        aUrl = window.location.href;
    }
    aName = aName.replace(/[\[\]]/g,"\\$&");
    var regex = new RegExp("[?&]"+aName+"(=([^&#]*)|&|#|$)");
    var results = regex.exec(aUrl);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

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
    var videoId = getParameterByName('vId');
    //Construction de la balise video
    $("#videoPlayer").append('<video controls id="wellogy_video" style="width:100%;height:100%;z-index:200;" allowfullscreen="true" poster="http://content.jwplatform.com/thumbs/'+videoId+'-720.jpg">');
    $("#videoPlayer").append('<source src="https://content.jwplatform.com/manifests/'+videoId+'.m3u8" type="video/mp4"/>');
    $("#videoPlayer").append('</video>');
}

$(document).ready(function () {
    getServiceToken()
        .then(renderUI)
        .catch(function (error) {
            console.log(error);
        });
});