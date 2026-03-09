document.getElementById('btn-login')
.addEventListener('click', function(){
    const userNameInput = document.getElementById('input-username');
    const userName = userNameInput.value;
    
    const inputPassword = document.getElementById('input-password');
    const password = inputPassword.value;

    if(userName == "admin" && password == "admin123"){
        // alert("login success");
        localStorage.setItem("loggedIn", "true");
        window.location.href = "home.html";
    } else{
        alert("Invalid username or password");
        return;
    }
    })