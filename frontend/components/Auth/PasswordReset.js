import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PasswordReset = ({ onReset }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // State to manage loading indicator

    const handleReset = async () => {
        if (newPassword === confirmPassword) {
            setLoading(true); // Start loading indicator

            try {
                const success = await onReset(newPassword);

                setLoading(false); // Stop loading indicator

                if (success) {
                    Alert.alert('Success', 'Password set is successful.');
                } else {
                    Alert.alert('Error', 'Password reset failed. Please try again.');
                }
            } catch (error) {
                setLoading(false); // Stop loading indicator on error
                Alert.alert('Error', 'Password reset failed. Please try again.');
            }
        } else {
            Alert.alert('Error', 'Passwords do not match');
        }
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View className="flex-1 justify-center p-4 w-screen mx-8">
            <Text className="text-2xl font-bold mb-4 text-center uppercase text-slate-300">Set Password</Text>
            <View className="flex flex-row items-center justify-between border mt-2 mx-2 mb-6 border-slate-300 rounded-full">
                <TextInput
                    className="w-5/6 p-2 placeholder:text-center text-slate-300 text-lg rounded-full shadow-md shadow-slate-400"
                    placeholder="Enter Password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={!showPassword}
                />
                <Pressable style={{ padding: 10 }} onPress={togglePasswordVisibility}>
                    <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="black" />
                </Pressable>
            </View>
            <View className="flex flex-row items-center justify-between border mt-2 mx-2 mb-6 border-slate-300 rounded-full">
                <TextInput
                    className="w-5/6 p-2 placeholder:text-center text-slate-300 text-lg rounded-full shadow-md shadow-slate-400"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showPassword}
                />
                <Pressable style={{ padding: 10 }} onPress={togglePasswordVisibility}>
                    <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="black" />
                </Pressable>
            </View>
            <Pressable className="bg-blue-500 p-3 rounded-full mx-6" onPress={handleReset} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white text-center text-lg font-extrabold">Set Password</Text>
                )}
            </Pressable>
        </View>
    );
};

export default PasswordReset;
