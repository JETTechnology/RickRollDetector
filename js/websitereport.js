 
  function submit() {

    const req = new XMLHttpRequest();
    const baseUrl = "https://RickRollBackend.jerry2006.repl.co/newwebsitereport";
    const urlParams = JSON.stringify({
        "url": document.getElementById("url").value
    });

    req.open("POST", baseUrl, true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(urlParams);

    req.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            if(JSON.parse(this.response).error == false){
                alert("Success! This link has been submitted for review!")
                window.location.reload()
            }else{
                alert(JSON.parse(this.response).message)
                window.location.reload()
            }
        }
    }

}
  
  
  
  
    document.getElementById('submit').addEventListener('click', submit);