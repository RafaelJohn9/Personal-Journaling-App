import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

const Register = ({ onRegister }) => {
    const [email, setEmail] = useState('');

    const handleRegister = () => {
        // Implement register logic here
        onRegister(email);
    };

    return (
        <View className="flex-1 justify-center p-4">
            <Text className="text-2xl font-bold mb-4">Register</Text>
            <TextInput
                className="border p-2 mb-4"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Pressable className="bg-blue-500 p-3 rounded" onPress={handleRegister}>
                <Text className="text-white text-center">Register</Text>
            </Pressable>
        </View>
    );
};

export default Register;
