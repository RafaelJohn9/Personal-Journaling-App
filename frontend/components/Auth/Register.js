import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

const Register = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = () => {
        // Implement register logic here
        onRegister(email);
    };

    return (
        <View className="flex-1 justify-center w-screen">
            <Text className="text-2xl font-bold mb-4 text-center uppercase text-slate-200">Register</Text>
            <TextInput
                className="border py-2 px-6 mb-4 text-slate-200 rounded-full w-3/4 mx-auto border-slate-400 text-lg placeholder:text-center shadow-md shadow-slate-400"
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                keyboardType="username"
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
            <Pressable className="bg-blue-500 p-3 mx-auto w-3/4 rounded-full" onPress={handleRegister}>
                <Text className="text-white text-center">Register</Text>
            </Pressable>
        </View>
    );
};

export default Register;
