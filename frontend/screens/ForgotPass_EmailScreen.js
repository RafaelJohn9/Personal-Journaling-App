import React from 'react';
import { View } from 'react-native';
import ForgotPasswordEmailRequest from '../components/Auth/ForgotPass_EmailRequest';
import { ImageBackground } from 'react-native';
import BackgroundImage from '../assets/images/landing.jpeg';
import { LinearGradient } from 'expo-linear-gradient';
import { requestOtp, storeObject } from '../middlewares/authMiddleware';


const ForgotPasswordEmailScreen = ({ navigation }) => {
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
        <ImageBackground source={BackgroundImage} resizeMode='cover' style={{ flex: 1 }}>
            <LinearGradient
                colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)']}
                className="flex h-screen w-screen items-center justify-center"
            >

                <View className="flex-1">
                    <ForgotPasswordEmailRequest onRegister={handleRegister} />
                </View>
            </LinearGradient>
        </ImageBackground>
    );
};

export default ForgotPasswordEmailScreen;
