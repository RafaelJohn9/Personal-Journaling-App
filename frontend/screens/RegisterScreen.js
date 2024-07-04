import React from 'react';
import { View } from 'react-native';
import Register from '../components/Auth/Register';
import { ImageBackground } from 'react-native';
import RegisterBackgroundImage from '../assets/images/landing.jpeg';
import { LinearGradient } from 'expo-linear-gradient';


const RegisterScreen = ({ navigation }) => {
    const handleRegister = (email) => {
        // Implement registration navigation logic here
        navigation.navigate('OtpVerification');
    };

    return (
        <ImageBackground source={RegisterBackgroundImage} resizeMode='cover' style={{ flex: 1 }}>
            <LinearGradient
                colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)']}
                className="flex h-screen w-screen items-center justify-center"
            >

                <View className="flex-1">
                    <Register onRegister={handleRegister} />
                </View>
            </LinearGradient>
        </ImageBackground>
    );
};

export default RegisterScreen;
