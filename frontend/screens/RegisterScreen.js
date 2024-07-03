import React from 'react';
import { View } from 'react-native';
import Register from '../components/Auth/Register';

const RegisterScreen = ({ navigation }) => {
    const handleRegister = (email) => {
        // Implement registration navigation logic here
        navigation.navigate('OtpVerification');
    };

    return (
        <View style={{ flex: 1 }}>
            <Register onRegister={handleRegister} />
        </View>
    );
};

export default RegisterScreen;
