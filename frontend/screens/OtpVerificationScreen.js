import React from 'react';
import { View, ImageBackground } from 'react-native';
import OtpVerification from '../components/Auth/OtpVerification';
import OTPBackgroundImage from '../assets/images/landing.jpeg';
import { LinearGradient } from 'expo-linear-gradient';

const OtpVerificationScreen = ({ navigation }) => {
    const handleVerify = () => {
        // Navigate to the PasswordReset screen upon successful OTP verification
        navigation.navigate('PasswordReset');
    };

    return (
        <ImageBackground source={OTPBackgroundImage} resizeMode="cover" style={{ flex: 1 }}>
            <View className="flex-1 mx-4">
                <OtpVerification onVerify={handleVerify} />
            </View>
        </ImageBackground>
    );
};

export default OtpVerificationScreen;
