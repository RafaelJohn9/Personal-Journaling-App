import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';

const EditJournal = ({ journal, onUpdate }) => {
    const [title, setTitle] = useState(journal.title);
    const [content, setContent] = useState(journal.content);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleUpdate = async () => {
        setLoading(true);
        setError('');
        try {
            await onUpdate({ ...journal, title, content });
        } catch (error) {
            setError('Failed to update journal entry. Please try again.');
            console.error('Error updating journal entry:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 justify-center p-4">
            <Text className="text-2xl font-bold mb-4 text-center">Edit Journal Entry</Text>
            <TextInput
                className="border p-2 mb-4 rounded-xl placeholder:text-center text-slate-700 text-lg"
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                className="border p-2 mb-4 rounded-xl placeholder:text-center text-slate-700 text-lg"
                placeholder="Content"
                value={content}
                onChangeText={setContent}
                multiline
            />
            {error ? <Text className="text-red-500 text-center mb-4">{error}</Text> : null}
            <Pressable className="bg-blue-500 p-3 rounded-full" onPress={handleUpdate} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white text-center">Update</Text>
                )}
            </Pressable>
        </View>
    );
};

export default EditJournal;
