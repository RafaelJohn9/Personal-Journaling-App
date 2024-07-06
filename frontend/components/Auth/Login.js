import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { login } from '../../middlewares/authMiddleware'; // Import the login function
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Email and password cannot be empty.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await login(email, password);
            if (response) {
                navigation.navigate('JournalList'); // Navigate to JournalList on successful login
            } else {
                setError('Login failed. Please check your credentials and try again.');
            }
        } catch (error) {
            setError('Login failed. Please check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View className="flex-1 justify-center py-4 px-6 min-w-full w-screen">
            <Text className="text-2xl font-extrabold uppercase text-center mb-4 py-4 px-8">Login</Text>
            <TextInput
                className="border p-2 mb-4 rounded-2xl text-xl placeholder:text-center text-center"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <View className="flex-row items-center justify-between border rounded-2xl px-3 mb-4">
                <TextInput
                    className="flex-1 text-xl placeholder:text-center text-center"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                />
                <Pressable className="p-2" onPress={togglePasswordVisibility}>
                    <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="black" />
                </Pressable>
            </View>
            {error && <Text className="text-red-500 text-center mb-4">{error}</Text>}
            <Pressable className="bg-blue-500 p-3 rounded-full flex items-center justify-center" onPress={handleLogin} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white text-center font-bold text-lg">Login</Text>
                )}
            </Pressable>
            <Pressable className="p-2" onPress={() => navigation.navigate('ForgotPassword')}>
                <Text className="text-blue-800 text-center text-lg">Forgot password?</Text>
            </Pressable>
        </View>
    );
};

export default Login;
