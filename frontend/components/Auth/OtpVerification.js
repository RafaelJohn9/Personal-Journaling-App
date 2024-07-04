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
            <Text className="text-2xl font-bold mb-4 text-center">OTP Verification</Text>
            <Text className="text-md font-bold mb-4 text-center">An OTP has been sent to your email, Please enter it to confirm your email.</Text>
            <TextInput
                className="border p-2 mb-4 rounded-xl placeholder:text-center text-slate-700 text-lg"
                placeholder="OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
                minLength={6}
            />
            <Pressable className="bg-blue-500 p-3 rounded-full" onPress={handleVerify}>
                <Text className="text-white text-center">Verify</Text>
            </Pressable>
        </View>
    );
};

export default OtpVerification;
