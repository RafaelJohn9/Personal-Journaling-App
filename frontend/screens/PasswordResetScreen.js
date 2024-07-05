import React from 'react';
import { View, ImageBackground } from 'react-native';
import PasswordReset from '../components/Auth/PasswordReset';
import PasswordBackgroundImage from '../assets/images/landing.jpeg';
import { LinearGradient } from 'expo-linear-gradient';
import { register, userExists, updatePassword, getObject } from '../middlewares/authMiddleware';

const PasswordResetScreen = ({ navigation }) => {
    const handleReset = async (newPassword) => {
        // Parsify the json string to an object
        const { email } = JSON.parse(await getObject('user'));

        const response = await userExists(email);
        let status = false;

        if (response.exists) {
            status = await updatePassword(email, newPassword)
        } else {
            status = await register(newPassword)
        }
        if (status) {
            navigation.navigate('JournalList');
        };
        return status;
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
