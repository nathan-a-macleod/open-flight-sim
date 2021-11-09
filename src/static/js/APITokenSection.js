function addScript(src){
    let script = document.createElement("script");
    script.setAttribute("src", src);
    script.setAttribute("type", "text/javascript");
    document.body.appendChild(script);
}

let userAPIToken;

if (sessionStorage.getItem("userAPIToken") == null){
    document.getElementById("APITokenDiv").style.display = "block";

    document.getElementById("CheckAPIToken").addEventListener("click", function(){
        let APITokenResult = document.getElementById("APITokenResult");
        APITokenResult.innerHTML = "";
        
        let APIToken = document.getElementById("APIToken").value;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', "https://api.mapbox.com/v4/mapbox.satellite/1/0/0@2x.jpg90?access_token=" + APIToken);
        xhr.send();
        
        APITokenResult.innerHTML = "Something went wrong while validating your API key. Please ensure you have a valid API access token associated with a valid Mapbox account.";
        
        xhr.onreadystatechange = function(){    
            if (this.readyState == 4 && this.status == 200){
                APITokenResult.innerHTML = "Valid API access key, loading...";
                userAPIToken = APIToken;
                sessionStorage.setItem("userAPIToken", APIToken);
                document.getElementById("APITokenDiv").style.display = "none";
                document.getElementById("setupDiv").style.display = "block";
                addScript("/static/js/setupSection.js");
            }
        }
    });
} else {
    userAPIToken = sessionStorage.getItem("userAPIToken");
    document.getElementById("setupDiv").style.display = "block";
    addScript("/static/js/setupSection.js");
}