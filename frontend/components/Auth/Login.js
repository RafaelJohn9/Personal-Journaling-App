import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the eye icon

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const handleLogin = () => {
        // Implement login logic here
        onLogin(email, password);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View className="flex-1 justify-center py-4 px-6 min-w-full w-screen">
            <Text className="text-2xl font-extrabold uppercase text-center mb-4 py-4 px-8">Login</Text>
            <TextInput
                className="border p-2 mb-4 rounded-2xl text-xl placeholder:text-center"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <View className="flex flex-row items-center justify-between border rounded-2xl mt-2 mx-2 mb-6">
                <TextInput
                    className=" text-xl placeholder:text-center flex-1"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
                />
                <Pressable
                    style={{ padding: 10 }}
                    onPress={togglePasswordVisibility}
                >
                    <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="black" />
                </Pressable>
            </View>
            <Pressable className="bg-blue-500 p-3 rounded-full" onPress={handleLogin}>
                <Text className="text-white text-center font-bold text-lg">Login</Text>
            </Pressable>
        </View>
    );
};

export default Login;
