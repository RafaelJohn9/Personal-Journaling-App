import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const JournalItem = ({ journal, onEdit, onDelete }) => {
    return (
        <View className="p-2 border-b border-gray-200 flex flex-row justify-between m-2">
            <View>
                <Text className="text-lg font-bold">{journal.title}</Text>
                <Text>{journal.date}</Text>
            </View>
            <View className="flex flex-row justify-between">
                <Pressable onPress={() => onEdit(journal.id)}>
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
