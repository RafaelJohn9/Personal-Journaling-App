import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const JournalItem = ({ journal, onEdit, onDelete, navigator }) => {
    return (
        <View className="p-2 border-b border-gray-200 flex flex-row justify-between  overflow-x-auto w-11/12">
            <Pressable
                onPress={() => navigator.navigate('EditJournal', { journal })}
            >
                <Text className="text-lg font-bold">{journal.title}</Text>
                <Text>{journal.date}</Text>
            </Pressable>
            <View className="flex flex-row justify-between">
                <Pressable onPress={() => onEdit(journal)}>
                    <Ionicons name="create-outline" size={24} color="blue" />
                </Pressable>
                <Pressable onPress={() => onDelete(journal.id)}>
                    <Ionicons name="trash-outline" size={24} color="red" />
                </Pressable>
            </View>
        </View>
    );
};

export default JournalItem;
