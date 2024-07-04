import React from 'react';
import { View } from 'react-native';
import Register from '../components/Auth/Register';
import { ImageBackground } from 'react-native';
import RegisterBackgroundImage from '../assets/images/landing.jpeg';
import { LinearGradient } from 'expo-linear-gradient';
import { requestOtp, storeObject } from '../middlewares/authMiddleware';


const RegisterScreen = ({ navigation }) => {
    const handleRegister = async (email, username) => {
        await storeObject("user", {
            username: username,
            email: email,
        }
        )
        await requestOtp(email)
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
