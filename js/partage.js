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


// Function that validates email address through a regular expression.
function validateEmail(sEmail) {
    var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    if (filter.test(sEmail)) {
        return true;
    } else {
        return false;
    }
}

function renderUI() {
    //UI
    var shareId = getParameterByName('sId');
    if (shareId == 1) {
        $("<label>À qui souhaitez-vous partager l’article ?</label>").appendTo("#partage_title");
        $("<label>Texte partagé : </label><TextArea id='email_body'>L’appli et les services Wellogy https://workwell/article…. Téléchargez l'application Wellogy : https://play.google.com/wellogy</TextArea>").appendTo("#partage_body");
        
    } else {
        $("<label>À qui souhaitez-vous partager l’application Wellogy ?</label>").appendTo("#partage_title");
        $("<label>Texte partagé : </label><TextArea id='email_body'>Wellogy, l’application de Sophrologie et de bien-être qui vous accompagne au quotidien. Téléchargez l'application Wellogy : https://play.google.com/wellogy</TextArea>").appendTo("#partage_body");
    }
    
    let sharingCoachingButton = Workwell.ui.createButton("ENVOYER L'EMAIL");
    sharingCoachingButton.addClass("onboarding_button");
    sharingCoachingButton.onClick(function(){
        //Partage avec email
        var emails = "";
        var areEmailsValide = true;
        
        if (($("#first_email").val().length ==0) && ($("#second_email").val().length ==0) && ($("#third_email").val().length ==0)) {
            areEmailsValide = false;
        } else {
           if ($("#first_email").val().length !=0) {
                if (validateEmail($("#first_email").val()) == true) {
                    emails = $("#first_email").val();
                } else {
                    areEmailsValide = false;
                }
            }

            if ($("#second_email").val().length !=0) {
                if (validateEmail($("#second_email").val()) == true) {
                    if (emails.length > 0) emails = emails + ",";
                    emails = emails + $("#second_email").val();
                } else {
                    areEmailsValide = false;
                }
            }

            if ($("#third_email").val().length !=0) {
                if (validateEmail($("#third_email").val()) == true) {
                    if (emails.length > 0) emails = emails + ",";
                    emails = emails + $("#third_email").val();
                } else {
                    areEmailsValide = false;
                }
            } 
        }
        
        if (areEmailsValide == true) {
            if ($("#email_body").val().length > 0) {
                var data;
                if (window.localStorage.userEmail === "") {
                    data ='&recipientEmail='+emails+'&companyName=&contactFirstname=Well&contactName=Ogy&contactEmail=axel@wellogy.com&contactSubject=Découvrez%20Wellogy&contactMessage='+$("#email_body").val();
                } else {
                    data ='&recipientEmail='+emails+'&companyName=LALALA&contactFirstname='+window.localStorage.userFirstName+'&contactName='+window.localStorage.userLastName+'&contactEmail='+window.localStorage.userEmail+'&contactSubject=Découvrez%20Wellogy&contactMessage='+$("#email_body").val();
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
            } else {
                window.alert("Votre message est vide");
            }
        }
        else {
            window.alert("Vérifiez le format de vos emails");
        }
    });
    $("#partage_button").append(sharingCoachingButton.toHTMLElement());
}

$(document).ready(function () {
    getServiceToken()
        .then(renderUI)
        .catch(function (error) {
            console.log(error);
        });
});