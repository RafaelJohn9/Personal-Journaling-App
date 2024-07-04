import React from 'react';
import { View, FlatList } from 'react-native';
import JournalItem from './JournalItem';

const JournalList = ({ journals, onEdit, onDelete }) => {
    return (
        <View className="flex-1 p-4">
            <FlatList
                data={journals}
                renderItem={({ item }) => (
                    <JournalItem journal={item} onEdit={onEdit} onDelete={onDelete} />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default JournalList;
