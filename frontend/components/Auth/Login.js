import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Implement login logic here
        onLogin(email, password);
    };

    return (
        <View className="flex-1 justify-center p-4">
            <Text className="text-2xl font-bold mb-4">Login</Text>
            <TextInput
                className="border p-2 mb-4"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                className="border p-2 mb-4"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Pressable className="bg-blue-500 p-3 rounded" onPress={handleLogin}>
                <Text className="text-white text-center">Login</Text>
            </Pressable>
        </View>
    );
};

export default Login;
