import React from 'react';
import { View, Text, Pressable } from 'react-native';

const JournalItem = ({ journal, onEdit, onDelete }) => {
    return (
        <View className="border p-4 mb-4 rounded-xl bg-white shadow-md shadow-slate-400">
            <Text className="text-xl font-bold mb-2">{journal.title}</Text>
            <Text className="text-slate-700 mb-4">{journal.content}</Text>
            <View className="flex-row justify-between">
                <Pressable className="bg-blue-500 p-2 rounded-full" onPress={() => onEdit(journal)}>
                    <Text className="text-white text-center">Edit</Text>
                </Pressable>
                <Pressable className="bg-red-500 p-2 rounded-full" onPress={() => onDelete(journal.id)}>
                    <Text className="text-white text-center">Delete</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default JournalItem;
