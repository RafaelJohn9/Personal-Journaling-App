import React from 'react';
import { View, Text } from 'react-native';
import EditJournal from '../components/Journal/EditJournal';
import { updateJournal } from '../middlewares/journalMiddleware'; // Adjust the path as necessary

const EditJournalScreen = ({ navigation, route }) => {
    const { journal } = route.params;

    const handleUpdate = async (updatedJournal) => {
        try {
            await updateJournal(journal.id, updatedJournal.title, updatedJournal.category, updatedJournal.content);

            // enable rerendering of JournalList
            navigation.navigate({
                name: 'JournalList',
                key: Date.now().toString() // Unique key for every navigation
            });

        } catch (error) {
            console.error('Error updating journal:', error);
            // Optionally show an error message to the user
        }
    };

    return (
        <View className="flex-1 px-4">
            <EditJournal journal={journal} onUpdate={handleUpdate} />
        </View>
    );
};

export default EditJournalScreen;
