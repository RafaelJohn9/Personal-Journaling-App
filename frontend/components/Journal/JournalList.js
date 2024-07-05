import React from 'react';
import { View, FlatList } from 'react-native';
import JournalItem from './JournalItem';

const JournalList = ({ journals, onEdit, onDelete, navigator }) => {
    return (
        <View className="flex-1 p-4 overflow-auto w-screen">
            <FlatList
                data={journals}
                renderItem={({ item }) => (
                    <JournalItem journal={item} onEdit={onEdit} onDelete={onDelete} navigator={navigator} />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default JournalList;
