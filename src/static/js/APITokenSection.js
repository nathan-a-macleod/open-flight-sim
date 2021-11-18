let userAPIToken;

if (sessionStorage.getItem("userAPIToken") == null){
    document.getElementById("APITokenDiv").style.display = "block";

    document.getElementById("CheckAPIToken").addEventListener("click", function(){
        let APIToken = document.getElementById("APIToken").value;
        userAPIToken = APIToken;
        sessionStorage.setItem("userAPIToken", APIToken);
        document.getElementById("APITokenDiv").style.display = "none";
        document.getElementById("settingsDiv").style.display = "block";
        addScript("/static/js/UI.js");
    });
} else {
    userAPIToken = sessionStorage.getItem("userAPIToken");
    document.getElementById("settingsDiv").style.display = "block";
    addScript("/static/js/UI.js");
}
