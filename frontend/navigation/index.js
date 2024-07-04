import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen';
import PasswordResetScreen from '../screens/PasswordResetScreen';
import JournalListScreen from '../screens/JournalListScreen';
import EditJournalScreen from '../screens/EditJournalScreen';
import CreateJournalScreen from '../screens/CreateJournalScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Personal Journal" options={{ headerShown: false }} component={LandingScreen} />
            <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
            <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterScreen} />
            <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
            <Stack.Screen name="PasswordReset" component={PasswordResetScreen} />
            <Stack.Screen name="JournalList" component={JournalListScreen} />
            <Stack.Screen name="EditJournal" component={EditJournalScreen} />
            <Stack.Screen name="CreateJournal" component={CreateJournalScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
