document.getElementById('btn-login')
.addEventListener('click', function(){
    const userNameInput = document.getElementById('input-username');
    const userName = userNameInput.value;
    
    const inputPassword = document.getElementById('input-password');
    const password = inputPassword.value;

    if(userName == "admin" && password == "admin123"){
        // alert("login success");

        window.location.assign("/home.html");
    } else{
        alert('login failed');
        return;
    }
    })