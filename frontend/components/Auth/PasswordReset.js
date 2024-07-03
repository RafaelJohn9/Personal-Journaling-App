import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

const PasswordReset = ({ onReset }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleReset = () => {
        if (newPassword === confirmPassword) {
            // Implement password reset logic here
            onReset(newPassword);
        } else {
            alert('Passwords do not match');
        }
    };

    return (
        <View className="flex-1 justify-center p-4">
            <Text className="text-2xl font-bold mb-4">Reset Password</Text>
            <TextInput
                className="border p-2 mb-4"
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
            />
            <TextInput
                className="border p-2 mb-4"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <Pressable className="bg-blue-500 p-3 rounded" onPress={handleReset}>
                <Text className="text-white text-center">Reset Password</Text>
            </Pressable>
        </View>
    );
};

export default PasswordReset;
