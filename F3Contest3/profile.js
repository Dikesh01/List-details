// Getting user details by getItem
let UserName = localStorage.getItem('userInfo');
let details = JSON.parse(UserName);


let fullName = document.getElementById('fullName');
let email = document.getElementById('email');
let password = document.getElementById('password');

// applying values to elements
fullName.innerText = `Full Name : ${details.fullName}`;
email.innerText = `Email : ${details.email}`;
password.innerText = `Password : ${details.password}`;

const logout = document.getElementById('logoutBtn');

logout.addEventListener('click', loggingOut);

// logging out
function loggingOut(){
    let prelink = document.createElement('a');
    prelink.href = "http://127.0.0.1:5500/F3Contest3/index.html?name=Kabir&email=kabir%40gmail.com&password=jdfkdjkdj&confiPassword=dfhdfkdfjd";
    prelink.target = '_blank';
    prelink.click();
}