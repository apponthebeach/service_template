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

function renderUI() {
    //UI
    var articleId = getParameterByName('aId');
    
    $.getJSON( "../dist/content/articles.json", function( data ) {
        var items = [];
        $.each( data, function( key, val ) {
            items.push( "<li>" + val.t + "</li>" );
        });
 
        $( "<ul/>", {
            "class": "my-new-list",
            html: items.join( "" )
        }).appendTo( "#test" );
    });
    
    let sharingProgramButton = Workwell.ui.createButton("PARTAGER WELLOGY !");
    sharingProgramButton.addClass("onboarding_button");
    sharingProgramButton.onClick(function(){
        //Partage avec email
        window.location.href("mailto:axeldesaintemarie@gmail.com");
    });
    $("#sharing_content").append(sharingProgramButton.toHTMLElement());
}

$(document).ready(function () {
    getServiceToken()
        .then(renderUI)
        .catch(function (error) {
            console.log(error);
        });
});