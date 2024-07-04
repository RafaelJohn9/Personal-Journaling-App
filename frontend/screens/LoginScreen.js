import React from 'react';
import { View, ImageBackground } from 'react-native';
import Login from '../components/Auth/Login';
import LoginBackgroundImage from '../assets/images/landing.jpeg';

const LoginScreen = ({ navigation }) => {
    const handleLogin = (email, password) => {
        // Implement login navigation logic here
        navigation.navigate('JournalList');
    };

    return (
        <ImageBackground source={LoginBackgroundImage} resizeMode='cover' className="flex-1 justify-center items-center">
            <View className="flex-1 justify-center items-center py-4 px-8">
                <Login onLogin={handleLogin} />
            </View>
        </ImageBackground>
    );
};

export default LoginScreen;
