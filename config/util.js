import { Alert } from 'react-native';

export const _validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const _checkPasswordStrength = (password) => {
    return password.length >= 6;
}

export const _showAlert = (msg) => {
    Alert.alert(
        'Notice',
        msg,
        [
            {text: 'OK', onPress: () => console.log('Got it.')}
        ],
        {cancelable: true}
    );
}