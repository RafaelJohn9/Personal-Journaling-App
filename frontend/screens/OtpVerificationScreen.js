import React from 'react';
import { View } from 'react-native';
import OtpVerification from '../components/Auth/OtpVerification';

const OtpVerificationScreen = ({ navigation }) => {
    const handleVerify = (otp) => {
        // Implement OTP verification navigation logic here
        navigation.navigate('PasswordReset');
    };

    return (
        <View style={{ flex: 1 }}>
            <OtpVerification onVerify={handleVerify} />
        </View>
    );
};

export default OtpVerificationScreen;
