import React from 'react';
import { View, FlatList } from 'react-native';
import JournalItem from './JournalItem';

const JournalList = ({ journals, filter, onEdit, onDelete, navigator }) => {
    const filterJournals = (journals, filter) => {
        const currentDate = new Date();
        return journals.filter(journal => {
            const journalDate = new Date(journal.date);
            switch (filter) {
                case 'day':
                    return (
                        journalDate.getDate() === currentDate.getDate() &&
                        journalDate.getMonth() === currentDate.getMonth() &&
                        journalDate.getFullYear() === currentDate.getFullYear()
                    );
                case 'month':
                    return (
                        journalDate.getMonth() === currentDate.getMonth() &&
                        journalDate.getFullYear() === currentDate.getFullYear()
                    );
                case 'year':
                    return journalDate.getFullYear() === currentDate.getFullYear();
                case 'all':
                default:
                    return true;
            }
        });
    };

    const filteredJournals = filterJournals(journals, filter);

    return (
        <View className="flex-1 p-4 overflow-auto w-screen">
            <FlatList
                data={filteredJournals}
                renderItem={({ item }) => (
                    <JournalItem journal={item} onEdit={onEdit} onDelete={onDelete} navigator={navigator} />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default JournalList;
