import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native';
import { otpVerification, getObject } from '../../middlewares/authMiddleware';

const OtpVerification = ({ onVerify }) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchEmail = async () => {
            try {
                let user = await getObject('user'); // Retrieves the user object string
                user = JSON.parse(user) || ''; // Convert user string to Object
                setEmail(user.email);
            } catch (error) {
                console.error('Error fetching email:', error);
            }
        };
        fetchEmail();
    }, []);

    const handleVerify = async () => {
        if (otp.length !== 6) {
            setError('OTP must be exactly 6 digits');
            return;
        }

        setLoading(true);
        setError(''); // Clear previous error messages
        try {
            const response = await otpVerification(otp, email);
            if (response.status === 200) {
                onVerify();
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (error) {
            setError('OTP verification failed. Please try again.');
            console.error('OTP verification error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 justify-center p-4">
            <Text className="text-2xl font-bold mb-4 text-center">OTP Verification</Text>
            <Text className="text-md font-bold mb-4 text-center">
                An OTP has been sent to your email. Please enter it to confirm your email.
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
