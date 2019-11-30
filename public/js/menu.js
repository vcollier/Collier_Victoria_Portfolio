(function() {
    console.log("fired!");

    var showMenu = document.getElementById("menuButton");

    function toggle() {
        document.getElementById("menuButton").classList.toggle("menu"); 
        document.getElementById("toggleList").classList.toggle("active");//when toggled display active toggleList div
    }

    showMenu.addEventListener("click", toggle);

}());