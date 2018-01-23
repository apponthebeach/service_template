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
    var shareId = getParameterByName('sId');
    
    let sharingCoachingButton = Workwell.ui.createButton("ENVOYER L'EMAIL");
    sharingCoachingButton.addClass("onboarding_button");
    sharingCoachingButton.onClick(function(){
        //Partage avec email
        var data;
        if (window.localStorage.userEmail === "") {
            data ='&recipientEmail=axel@wellogy.fr&companyName=LALALA&contactFirstname=AXEL&contactName=de%20Sainte%20Marie&contactEmail=axeldesaintemarie@gmail.com&contactSubject=WHAT%20A%20GREAT%20APP&contactMessage=THIS%20IS%20THE%20COOLEST%20APP%20IN%20THE%20WORLD';
        } else {
            data ='&recipientEmail=axel@wellogy.fr&companyName=LALALA&contactFirstname='+window.localStorage.userFirstName+'&contactName='+window.localStorage.userLastName+'&contactEmail='+window.localStorage.userEmail+'&contactSubject=WHAT%20A%20GREAT%20APP&contactMessage=THIS%20IS%20THE%20COOLEST%20APP%20IN%20THE%20WORLD';
        }

        $.ajax({
	       type: "POST",
	       url: "https://aotb.xyz/wellogy/site/inc/shareTheApp.php",
	       data: data,
	       success: function(msg) {
                // Message was sent
                if (msg == 'OK') {
                    window.alert("Message envoyé");
                }
                // There was an error
                else {
                    window.alert("Erreur lors de l'envoie du message"); 
                }
            }
        });
    });
    $("#partage_button").append(sharingCoachingButton.toHTMLElement());
}

$(document).ready(function () {
    getServiceToken()
        .then(getUserInfo)
        .then(renderUI)
        .catch(function (error) {
            console.log(error);
        });
});