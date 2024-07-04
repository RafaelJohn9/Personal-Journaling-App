import React from 'react';
import { View, Text, Pressable, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BackgroundImage from '../assets/images/landing.jpeg';
import { isLoggedIn } from '../middlewares/authMiddleware';

const LandingScreen = ({ navigation }) => {
    const loginValidation = async (screen) => {
        try {
            const loggedIn = await isLoggedIn(); // Wait for isLoggedIn() to resolve
            if (loggedIn) {
                navigation.navigate(screen);
            } else {
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error('Login validation error:', error);
            navigation.navigate('Login'); // Handle error by navigating to Login screen
        }
    };

    return (
        <ImageBackground source={BackgroundImage} resizeMode='cover' style={{ flex: 1 }}>
            <LinearGradient
                colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)']}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
                <Text className="text-4xl font-thin text-white mb-6 text-center">
                    Personal Journal
                </Text>
                <Pressable
                    onPress={() => loginValidation('JournalList')}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? 'rgba(59, 130, 246, 0.7)' : '#3B82F6',
                            padding: 16,
                            borderRadius: 50,
                            marginBottom: 16,
                            width: '80%',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        },
                    ]}
                >
                    <Text className="text-white text-xl font-semibold text-center">Login</Text>
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate('Register')}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? 'rgba(34, 197, 94, 0.7)' : '#22C55E',
                            padding: 16,
                            borderRadius: 50,
                            width: '80%',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        },
                    ]}
                >
                    <Text className="text-white text-xl font-semibold text-center">Register</Text>
                </Pressable>
                <Text className="text-md p-4 font-bold text-white mb-6 text-center">
                    "If you wish to remember, record it in writing." — Marcus Tullius Cicero
                </Text>
            </LinearGradient>
        </ImageBackground>
    );
};

export default LandingScreen;
