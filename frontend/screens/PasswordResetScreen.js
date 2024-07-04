import React from 'react';
import { View, ImageBackground } from 'react-native';
import PasswordReset from '../components/Auth/PasswordReset';
import PasswordBackgroundImage from '../assets/images/landing.jpeg';
import { LinearGradient } from 'expo-linear-gradient';



const PasswordResetScreen = ({ navigation }) => {
    const handleReset = (newPassword) => {
        // Implement password reset navigation logic here
        navigation.navigate('Login');
    };

    return (
        <ImageBackground source={PasswordBackgroundImage} resizeMode='cover' style={{ flex: 1 }}>
            <LinearGradient
                colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)']}
                className="flex h-screen w-screen items-center justify-center"
            >

                <View style={{ flex: 1 }}>
                    <PasswordReset onReset={handleReset} />
                </View>
            </LinearGradient>
        </ ImageBackground>
    );
};

export default PasswordResetScreen;
