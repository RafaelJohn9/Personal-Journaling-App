import React from 'react';
import { View } from 'react-native';
import Login from '../components/Auth/Login';

const LoginScreen = ({ navigation }) => {
    const handleLogin = (email, password) => {
        // Implement login navigation logic here
        navigation.navigate('JournalList');
    };

    return (
        <View style={{ flex: 1 }}>
            <Login onLogin={handleLogin} />
        </View>
    );
};

export default LoginScreen;
