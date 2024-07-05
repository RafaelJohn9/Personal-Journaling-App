import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { readAllJournals, deleteJournal } from '../middlewares/journalMiddleware'; // Assuming these middleware functions exist
import { isLoggedIn, logout } from '../middlewares/authMiddleware'; // Assuming these middleware functions exist
import JournalList from '../components/Journal/JournalList';

const JournalListScreen = ({ navigation }) => {
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = await isLoggedIn();

            if (!token) {
                navigation.navigate('LoginScreen');
                return;
            }
        };

        const fetchJournals = async () => {
            try {
                await checkLoginStatus();
                const fetchedJournals = await readAllJournals(); // This should fetch all journals
                setJournals(fetchedJournals);
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch journals');
            } finally {
                setLoading(false);
            }
        };

        fetchJournals();
    }, []);

    const handleEditJournal = (journal) => {
        // Navigate to EditJournalScreen with the journal ID
        navigation.navigate('EditJournal', { journal });
    };

    const handleDeleteJournal = async (id) => {
        try {
            await deleteJournal(id);
            setJournals(journals.filter((journal) => journal.id !== id));
            Alert.alert('Success', 'Journal deleted successfully.');
        } catch (error) {
            Alert.alert('Error', 'Failed to delete journal. Please try again.');
            console.error('Error deleting journal:', error);
        }
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Yes', onPress: () => performLogout() },
            ],
            { cancelable: false }
        );
    };

    const performLogout = async () => {
        try {
            await logout(); // Assuming logout middleware function exists
            navigation.navigate('Personal Journal');
        } catch (error) {
            Alert.alert('Error', 'Failed to logout. Please try again.');
            console.error('Error logging out:', error);
        }
    };

    return (
        <SafeAreaView className="flex-1 mt-8">
            <View className="flex flex-row justify-between p-4 border-b border-gray-300">
                <Text className="text-lg uppercase font-extrabold">Journal List</Text>
                <View className="flex flex-row">
                    <Pressable onPress={() => navigation.navigate('CreateJournal')}>
                        <Ionicons name="add-circle-outline" size={30} color="blue" />
                    </Pressable>
                    <Pressable onPress={handleLogout} style={{ marginLeft: 20 }}>
                        <Ionicons name="log-out-outline" size={30} color="red" />
                    </Pressable>
                </View>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="blue" className="mt-4" />
            ) : journals.length === 0 ? (
                <View className="flex-1 justify-center items-center">
                    <Text className="text-xl">No journals added yet</Text>
                </View>
            ) : (
                <JournalList
                    journals={journals}
                    onEdit={handleEditJournal}
                    onDelete={handleDeleteJournal}
                    navigator={navigation}
                />
            )}
        </SafeAreaView>
    );
};

export default JournalListScreen;
