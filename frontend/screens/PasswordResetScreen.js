import React from 'react';
import { View } from 'react-native';
import PasswordReset from '../components/Auth/PasswordReset';

const PasswordResetScreen = ({ navigation }) => {
    const handleReset = (newPassword) => {
        // Implement password reset navigation logic here
        navigation.navigate('Login');
    };

    return (
        <View style={{ flex: 1 }}>
            <PasswordReset onReset={handleReset} />
        </View>
    );
};

export default PasswordResetScreen;
