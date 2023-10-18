// TODO make sure this is the right way to do this
window.addEventListener("DOMContentLoaded", domLoaded);

// TODO very bad; need to store this on the backend but this is only for testing
const userMap = new Map();

// TODO make sure this is the right way to do this
function domLoaded() {
   document.querySelector("#signupButton").addEventListener("click", signupHandler)
   document.querySelector("#loginButton").addEventListener("click", loginHandler)
   document.querySelector("#forgotPasswdButton").addEventListener("click", resetPasswdHandler)
}

function signupHandler(){
    console.log("here");
    // parse input
    let emailAddrInput = document.querySelector("#signupEmailInput");
    let passwdInput = document.querySelector("#signupPasswdInput");

    let emailAddr = emailAddrInput.value;
    let passwd= passwdInput.value;

    console.log(`Parsed Email: ${emailAddr}`);
    console.log(`Parsed Password: ${passwd}`);


    if (!validPasswd(passwd)){
        alert("Error: invalid password; could not create account");
        return;
    }

    if (!validEmailAddr(emailAddr)){
        // TODO display something to user instead
        alert("Error: invalid email address; could not create account");
        return;
    }


    if (userExists(emailAddr, passwd)){
        // TODO display something to user instead
        alert("Error: email address already in use; could not create account");
        return;
    }

    signupUser(emailAddr, passwd);
}

function loginHandler(){
    // parse user input
    let emailAddrInput = document.querySelector("#loginEmailInput");
    let passwdInput = document.querySelector("#loginPasswdInput");

    let emailAddr = emailAddrInput.value;
    let passwd= passwdInput.value;

    console.log(`Parsed Email: ${emailAddr}`);
    console.log(`Parsed Password: ${passwd}`);


    if (!userExists(emailAddr, passwd)){
        // TODO display something to user instead
        alert("Error: invalid username and/or password");
        return;
    }

    console.log("validated user");
    // TODO: admin check logic
    initiateLogin(emailAddr, passwd);
}

function resetPasswdHandler(emailAddr){
    alert("Warning: Reset password functionality is not yet implemented")
}

////// internal helper functions //////

// TODO limit the scope of these

function validEmailAddr(emailAddr){
    let emailPattern = /^[A-Z]+(?:\.[A-Z]+)*@[A-Z]+\.[A-Z]+$/i
    return emailPattern.test(emailAddr);
}

function validPasswd(passwd){
    let passwdPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
    return passwdPattern.test(passwd);
}

// TODO: change to interact with backend
function signupUser(emailAddr, passwd){
    userMap.set(emailAddr, passwd);

    alert("New account created succesfully!")

    return
}

// TODO: change to interact with backend
function userExists(emailAddr, passwd){
    if (userMap.has(emailAddr)){
        // true if entered password matches stored password; false otherwise
        return passwd === userMap.get(emailAddr);
    }

    // email address not found in the map; user doesn't exist
    else{
        return false;
    }
}

function initiateLogin(emailAddr, passwd){
    console.log("trying to log in");
    window.location.href="draw.html";
}