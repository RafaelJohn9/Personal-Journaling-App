import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

const OtpVerification = ({ onVerify }) => {
    const [otp, setOtp] = useState('');

    const handleVerify = () => {
        // Implement OTP verification logic here
        onVerify(otp);
    };

    return (
        <View className="flex-1 justify-center p-4">
            <Text className="text-2xl font-bold mb-4">OTP Verification</Text>
            <TextInput
                className="border p-2 mb-4"
                placeholder="OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
            />
            <Pressable className="bg-blue-500 p-3 rounded" onPress={handleVerify}>
                <Text className="text-white text-center">Verify</Text>
            </Pressable>
        </View>
    );
};

export default OtpVerification;
