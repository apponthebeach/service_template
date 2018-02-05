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
    $("#advice_popin").hide();
    
    //Gestion des videos
    document.getElementById("exercice_video_1").onclick = function() {
        Workwell.openWebPage(window.location.href + "../../video?vId=9TXPnBA7");
    };
    document.getElementById("exercice_video_2").onclick = function() {
        Workwell.openWebPage(window.location.href + "../../video?vId=asZwKFXK");
    };
    document.getElementById("exercice_video_3").onclick = function() {
        Workwell.openWebPage(window.location.href + "../../video?vId=xvDnyVUF");
    };
    document.getElementById("exercice_video_4").onclick = function() {
        Workwell.openWebPage(window.location.href + "../../video?vId=ingaUMZF");
    };
    document.getElementById("exercice_video_5").onclick = function() {
        Workwell.openWebPage(window.location.href + "../../video?vId=1l6VDoCx");
    };
    document.getElementById("coaching_video_1").onclick = function() {
        Workwell.openWebPage(window.location.href + "../../video?vId=9TXPnBA7");
    };
    document.getElementById("coaching_video_2").onclick = function() {
        Workwell.openWebPage(window.location.href + "../../video?vId=ingaUMZF");
    };
    document.getElementById("coaching_video_3").onclick = function() {
        Workwell.openWebPage(window.location.href + "../../video?vId=xvDnyVUF");
    };
    document.getElementById("coaching_video_4").onclick = function() {
        Workwell.openWebPage(window.location.href + "../../video?vId=ingaUMZF");
    };
    document.getElementById("coaching_video_5").onclick = function() {
        Workwell.openWebPage(window.location.href + "../../video?vId=9b1i3x6E");
    };
    
    //Gestion de l'ouverture des conseils
    document.getElementById("food").onclick = function() {
        $("#advice_image").html("<img src='/dist/images/ic_advice_big_nutrition.png' />");
        $("#advice_title").html("<label>Mon conseil nutrition</label>");
        $("#advice_description").html("<div><label><span class='pink_point'>•</span>Adapter votre alimentation pendant ces périodes peut vous aider à gérer vos émotions. Pour cela, privilégiez les aliments source d’<b>oméga 3</b> comme les poissons gras : sardines, maquereaux, saumons, thons... qui sont des alliés de votre équilibre émotionnel.<br /><br /><span class='pink_point'>•</span>Pensez également aux aliments source de <b>magnésium</b> pour diminuer le stress et la fatigue comme les oléagineux : amandes, noisettes, noix de cajou, noix de pécan, et pour les gourmands... le chocolat ! N’oubliez pas d'accompagner vos repas ou vos goûters de tisanes à camomille, au tilleul ou encore au thé vert. Et découvrez les bienfaits de l’aromathérapie pour se détendre : vous pouvez par exemple opter pour un diffuseur d’huiles essentielles de lavande ou de fleurs de Bach.</label></div>");
        
        $("#advice_popin").show();
    }
    document.getElementById("rh").onclick = function() {
        $("#advice_image").html("<img src='/dist/images/ic_advice_big_rh.png' />");
        $("#advice_title").html("<label>Le conseil RH</label>");
        $("#advice_description").html("<div><label><span class='pink_point'>•</span> N’hésitez pas à échanger avec votre manager de l’impact de ce déménagement sur votre vie personnelle : changement dans vos temps de transports, découverte de nouveaux collègues, adaptation à une nouvelle organisation…<br /><br /><span class='pink_point'>•</span>Les raisons de votre stress peuvent être multiples et nécessiter que vous en discutiez avec votre supérieur.</label></div>");
        
        $("#advice_popin").show();
    }
    document.getElementById("desk").onclick = function() {
        $("#advice_image").html("<img src='/dist/images/ic_advice_big_office.png' />");
        $("#advice_title").html("<label>Décorer mon nouveau bureau</label>");
        $("#advice_description").html("<div><label><span class='pink_point'>•</span>Et si le jaune devenait votre couleur pour égayer votre bureau ? :) <br /><br /><span class='pink_point'>•</span>Pensez également à mettre des plantes vertes dont la présence apporte tout simplement du calme et de la sérénité à votre pièce. Essayez de ne pas surcharger vos étagères et d’avoir un bureau rangé, cela aide à y voir plus clair ! <br /><br /><span class='pink_point'>•</span>Ensuite, pour créer un espace rassurant et inspirant, vous pouvez mettre un objet ou des images que vous aimez : par exemple un objet Feng Shui comme un arbre à pierre en cristal de roche. A la fois récepteur et amplificateur d’énergie, il est reconnu pour stimuler les énergies et lever les blocages.</label></div>");
        
        $("#advice_popin").show();
    }
    document.getElementById("team").onclick = function() {
        $("#advice_image").html("<img src='/dist/images/ic_advice_big_team.png' />");
        $("#advice_title").html("<label>Conseil d'équipe</label>");
        $("#advice_description").html("<div><label><span class='pink_point'>•</span>Prenez le temps de rencontrer les collaborateurs qui vous entourent : découvrez l’application mobile Never Est Alone que vous pouvez essayer directement dans Workwell, et programmez un déjeuner avec un de vos nouveaux collègues.</label></div>");
        
        $("#advice_popin").show();
    }
    document.getElementById("close").onclick = function() {
        $("#advice_popin").hide();
    }
    
    
    
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