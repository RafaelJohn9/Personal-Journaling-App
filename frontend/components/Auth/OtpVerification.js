import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { otpVerification, getObject } from '../../middlewares/authMiddleware';

const OtpVerification = ({ onVerify }) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchEmail = async () => {
            const user = await getObject('user');
            setEmail(user?.email || '');
        };
        fetchEmail();
    }, []);

    const handleVerify = async () => {
        setLoading(true);
        setError(''); // Clear previous error messages
        try {
            const response = await otpVerification(otp, email);
            if (response.status === 200) {
                onVerify();
            } else {
                setError('Wrong OTP provided. Please try again.');
            }
        } catch (error) {
            setError('Wrong OTP provided. Please try again.');
            console.error('OTP verification error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 justify-center p-4">
            <Text className="text-2xl font-bold mb-4 text-center">OTP Verification</Text>
            <Text className="text-md font-bold mb-4 text-center">
                An OTP has been sent to your email, Please enter it to confirm your email.
            </Text>
            <TextInput
                className="border p-2 mb-4 rounded-xl placeholder:text-center text-slate-700 text-lg"
                placeholder="OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
            />
            {error ? <Text className="text-red-500 text-center mb-4">{error}</Text> : null}
            <Pressable className="bg-blue-500 p-3 rounded-full" onPress={handleVerify} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white text-center">Verify</Text>
                )}
            </Pressable>
        </View>
    );
};

export default OtpVerification;
