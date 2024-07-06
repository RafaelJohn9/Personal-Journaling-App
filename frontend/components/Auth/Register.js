import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';

const Register = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleRegister = async () => {
        setError('');
        setEmailError('');

        if (!username.trim()) {
            setError('Username cannot be empty');
            return;
        }

        if (!email.trim()) {
            setError('Email cannot be empty');
            return;
        }

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        setLoading(true);
        try {
            await onRegister(email, username);
        } catch (error) {
            setError('Registration failed. Please try again.');
            console.error('Registration error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 justify-center w-screen">
            <Text className="text-2xl font-bold mb-4 text-center uppercase text-slate-200">Register</Text>
            {error ? <Text className="text-red-500 text-center mb-2">{error}</Text> : null}
            {emailError ? <Text className="text-red-500 text-center mb-2">{emailError}</Text> : null}
            <TextInput
                className="border py-2 px-6 mb-4 text-slate-200 rounded-full w-3/4 mx-auto border-slate-400 text-lg placeholder:text-center shadow-md shadow-slate-400"
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                className="border mb-4 w-3/4 mx-auto py-2 px-6 rounded-full border-slate-400 text-slate-200 text-lg placeholder:text-center shadow-md shadow-slate-400"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Pressable
                className="bg-blue-500 p-3 mx-auto w-3/4 rounded-full"
                onPress={handleRegister}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                    <Text className="text-white text-center text-lg font-extrabold">Register</Text>
                )}
            </Pressable>
        </View>
    );
};

export default Register;
