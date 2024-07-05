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
import ForgotPasswordEmailScreen from '../screens/ForgotPass_EmailScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Personal Journal" options={{ headerShown: false }} component={LandingScreen} />
            <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
            <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterScreen} />
            <Stack.Screen name="OtpVerification" options={{ headerShown: false }} component={OtpVerificationScreen} />
            <Stack.Screen name="PasswordReset" options={{ headerShown: false }} component={PasswordResetScreen} />
            <Stack.Screen name="JournalList" options={{ headerShown: false }} component={JournalListScreen} />
            <Stack.Screen name="EditJournal" component={EditJournalScreen} />
            <Stack.Screen name="CreateJournal" component={CreateJournalScreen} />
            <Stack.Screen name="ForgotPassword" options={{ headerShown: false }} component={ForgotPasswordEmailScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
