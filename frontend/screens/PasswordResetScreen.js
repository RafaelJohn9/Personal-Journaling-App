import React from 'react';
import { View, ImageBackground } from 'react-native';
import PasswordReset from '../components/Auth/PasswordReset';
import PasswordBackgroundImage from '../assets/images/landing.jpeg';
import { LinearGradient } from 'expo-linear-gradient';
import { register } from '../middlewares/authMiddleware';

const PasswordResetScreen = ({ navigation }) => {
    const handleReset = async (newPassword) => {
        let response = await register(newPassword)
        if (response) {
            navigation.navigate('JournalList');
            return true;
        };
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
        </ImageBackground>
    );
};

export default PasswordResetScreen;
