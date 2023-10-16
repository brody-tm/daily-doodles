// TODO make sure this is the right way to do this
window.addEventListener("DOMContentLoaded", domLoaded);

// TODO very bad; need to store this on the backend but this is only for testing
const userMap = new Map();

// TODO make sure this is the right way to do this
function domLoaded() {
   document.querySelector("#createUserButton").addEventListener("click", createUserHandler)
   document.querySelector("#loginUserButton").addEventListener("click", loginUserHandler)
   document.querySelector("#resetPasswdButton").addEventListener("click", resetPasswdHandler)
}

function createUserHandler(){
    // parse input
    let emailAddrInput = document.querySelector("#createUserInput");
    let passwdInput = document.querySelector("#createPasswdInput");

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

    createNewUser(emailAddr, passwd);
}

function loginUserHandler(){
    // parse user input
    let emailAddrInput = document.querySelector("#loginUserInput");
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
function createNewUser(emailAddr, passwd){
    userMap.set(emailAddr, passwd);

    alert("New user created succesfully!")

    return
}

// TODO: change to interact with backend
function userExists(emailAddr, passwd){
    let storedPasswd = userMap.get(emailAddr);

    // either the user email was not found in the map, or the given password did not match
    if (storedPasswd === undefined || storedPasswd != passwd) {
        return false
    }

    else {
        return true
    }
}

function initiateLogin(emailAddr, passwd){
    alert("Successful Login!");
}