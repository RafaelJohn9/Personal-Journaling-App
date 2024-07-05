import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const JournalItem = ({ journal, onEdit, onDelete, navigator }) => {
    const journalDate = new Date(journal.date)
    const year = journalDate.getFullYear();
    const month = journalDate.getMonth();
    const day = journalDate.getDate();
    const date = `${day}/${month}/${year}`;
    return (
        <View className="p-2 border-b border-gray-200 flex flex-row justify-between  overflow-x-auto w-10/12">
            <Pressable
                onPress={() => navigator.navigate('EditJournal', { journal })}
            >
                <Text className="text-lg font-bold">{journal.title}</Text>
                <Text>{date}</Text>
                <Text className="uppercase text-xs font-extrabold">{journal.category}</Text>
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
