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
        //Récupération des infos utilisateurs
        Workwell.getUserInfo({
            success: function (data) {
                alerte(data);
                // You can then create a new user with the data you received,
                // or fetch an existing one in your db
            },
            error: function (error) {
                alerte(error);
            }
        });
        
        //Partage avec email
        var data ='&recipientEmail=axel@wellogy.fr&companyName=LALALA&contactFirstname=AXEL&contactName=de%20Sainte%20Marie&contactEmail=axeldesaintemarie@gmail.com&contactSubject=WHAT%20A%20GREAT%20APP&contactMessage=THIS%20IS%20THE%20COOLEST%20APP%20IN%20THE%20WORLD';
        console.log(data);
        $.ajax({
	      type: "POST",
	      url: "https://aotb.xyz/wellogy/site/inc/shareTheApp.php",
	      data: data,
	      success: function(msg) {

            // Message was sent
            if (msg == 'OK') {
               console.log("OK"); 
            }
            // There was an error
            else {
               console.log("error : "+msg); 
            }

	      }

      });
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