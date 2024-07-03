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

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
            <Stack.Screen name="PasswordReset" component={PasswordResetScreen} />
            <Stack.Screen name="JournalList" component={JournalListScreen} />
            <Stack.Screen name="EditJournal" component={EditJournalScreen} />
            <Stack.Screen name="CreateJournal" component={CreateJournalScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
