if (sessionStorage.getItem("APIToken") == null){
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
                sessionStorage.setItem("APIToken", APIToken);
                document.getElementById("APITokenDiv").style.display = "none";
            }
        }
    });
} else {
    document.getElementById("APITokenDiv").style.display = "none";
}
