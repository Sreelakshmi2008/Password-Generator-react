
let passwordLength = 0;

export const setPasswordLength = length => {
    passwordLength = length;
    return passwordLength;
}

export const generatePasswordLength = () => {
    return passwordLength;
}



export const copyToClipBoard = elementRef => {
    elementRef.select();
    document.execCommand('copy');
}

export const base = 'http://127.0.0.1:8000/'
export const generate = 'generate'
export const register = 'signup'
export const login = 'login'