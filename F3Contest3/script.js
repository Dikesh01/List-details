
const fname = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPass = document.getElementById('confiPassword');
const submitButton = document.getElementById('signupBtn');

submitButton.addEventListener('click', getUserDetails);
// when we click on signup
function getUserDetails(){
    
    let nameValue = fname.value;
    let emailValue = email.value;
    let passwordValue = password.value;
    let confiPasswordValue = confirmPass.value;
// If input values are empty
    if(!(nameValue && emailValue && passwordValue && confiPasswordValue)){
        event.preventDefault();
        document.getElementById('error').innerText = 'Error: All the fields are mandatory';
        document.getElementById('success').style.display = 'none';
    }

    else{
        event.preventDefault();
        document.getElementById('error').style.display = 'none';
        document.getElementById('success').innerText = 'Successfully Signed Up!';
// storing user details in object
        userinfo = {
            fullName : nameValue,
            email: emailValue,
            password : passwordValue,
        }

        localStorage.setItem('userInfo',JSON.stringify(userinfo));
// path to jump after sign up
        let linkItem = document.createElement("a");
        linkItem.href = "http://127.0.0.1:5500/F3Contest3/profile.html";
        linkItem.target = "_blank";
        linkItem.click();
    }
}

