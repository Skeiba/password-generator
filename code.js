let passwordText= document.getElementById("password-text");
let generateBtn = document.getElementById("generate-button");
let copyBtn = document.getElementById("copy-button");
let passwordStrength = document.getElementById("strenght-label");

let passwordLengthText = document.getElementById("passwordLengthValue");

let passwordLength_sld = document.getElementById("passwordLength");
let symbols_chk = document.getElementById("specialCharacters");
let numbers_chk = document.getElementById("numbers");
let lowercase_chk = document.getElementById("lowercaseLetters");
let uppercase_chk = document.getElementById("uppercaseLetters");



const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const numbers = '0123456789';
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function getPassword(){
    let password = "";
    let passwordLength = passwordLength_sld.value; 
    let chars = "";
    
    chars += uppercase_chk.checked ? upperCase : ""; 
    chars += lowercase_chk.checked ? lowerCase : "";
    chars += numbers_chk.checked ? numbers : "";
    chars += symbols_chk.checked ? specialChars : "";
    
    for (let index = 0; index < passwordLength; index++) {
        let rand = Math.floor(Math.random() * chars.length);
        password += chars.substring(rand, rand + 1);
    }
    return password;
}

function generatePassword(){
    let password = getPassword();
    passwordText.value = password;
}

function displayPasswordLength() {
    passwordLengthText.textContent = passwordLength_sld.value;
}

/*Copy button*/
copyBtn.addEventListener('click',async ()=>{
    const textToCopy = passwordText.value;
    const copyMessage = document.getElementById("copy-message");

    try {
        await navigator.clipboard.writeText(textToCopy);
        textCopiedMessage();
    } catch (err) {
        console.error('Failed to copy: ', err);
        alert("Failed to copy text to clipboard");
    }
    function textCopiedMessage() {
        copyMessage.style.display = "inline";
        setTimeout(() => {
            copyMessage.style.display = "none";
        }, 2000);
    }
});

passwordLength_sld.addEventListener('input', ()=>{
    displayPasswordLength();
    generatePassword();
    displayPasswordStrength();
    changeStrengthColor();
});

generateBtn.addEventListener('click', generatePassword);



function getPasswordStrength(){
    let password = getPassword();
    let strength = 0;

    let chars = {
        numbers: /\d/,
        lowerCase: /[a-z]/,
        upperCase: /[A-Z]/,
        specialChars : /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
    };

    if (password.length >= 8 && password.length <= 20) {
        strength += 1;
    } 
    else if (password.length > 20) {
        strength += 1;
    }

    let count = 0;
    for (let key in chars){
        if(chars[key].test(password)){
            count++; 
        }
    }
    strength += count;

    return strength;
}

function displayPasswordStrength(){
    const strength = getPasswordStrength();
    let text = "";

    switch (strength) {
        case 1: 
            text = 'Very Weak'; 
            break;
        case 2: 
            text = 'Weak'; 
            break;
        case 3: 
            text = 'Medium'; 
            break;
        case 4: 
            text = 'Strong'; 
            break;
        case 5: 
            text = 'Very Strong'; 
            break;
        default:
            text = "";
            break;
    }
    passwordStrength.textContent = text;
}

function changeStrengthColor(){
    let pwd = passwordStrength.textContent;
    switch (pwd) {
        case 'Very Weak': 
            passwordStrength.style.color = 'var(--red)'; 
            break;
        case 'Weak': 
            passwordStrength.style.color = 'var(--bruh)';  
            break;
        case 'Medium': 
            passwordStrength.style.color = 'var(--purple)'; 
            break;
        case 'Strong': 
            passwordStrength.style.color = 'var(--green)'; 
            break;
        case 'Very Strong': 
            passwordStrength.style.color = 'var(--dark-green)'; 
            break;
        default:
            passwordStrength.style.color = 'var(--red)';
            break;
    }
}

displayPasswordLength();
generatePassword();