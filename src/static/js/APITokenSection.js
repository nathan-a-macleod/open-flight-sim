let userAPIToken;

if (sessionStorage.getItem("userAPIToken") == null){
    document.getElementById("APITokenDiv").style.display = "block";

    document.getElementById("CheckAPIToken").addEventListener("click", function(){
        let APIToken = document.getElementById("APIToken").value;
        userAPIToken = APIToken;
        sessionStorage.setItem("userAPIToken", APIToken);
        document.getElementById("APITokenDiv").style.display = "none";
        document.getElementById("setupDiv").style.display = "block";
        addScript("/static/js/setupSection.js");
    });
} else {
    userAPIToken = sessionStorage.getItem("userAPIToken");
    document.getElementById("setupDiv").style.display = "block";
    addScript("/static/js/setupSection.js");
}
