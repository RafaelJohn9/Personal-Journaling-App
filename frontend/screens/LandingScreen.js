import React from 'react';
import { View, Text, Pressable } from 'react-native';

const LandingScreen = ({ navigation }) => {
    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-3xl font-bold mb-4">Welcome to the Journal App</Text>
            <Pressable
                className="bg-blue-500 p-3 rounded mb-4"
                onPress={() => navigation.navigate('Login')}
            >
                <Text className="text-white text-center">Login</Text>
            </Pressable>
            <Pressable
                className="bg-green-500 p-3 rounded"
                onPress={() => navigation.navigate('Register')}
            >
                <Text className="text-white text-center">Register</Text>
            </Pressable>
        </View>
    );
};

export default LandingScreen;
