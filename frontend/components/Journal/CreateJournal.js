import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';

const CreateJournal = ({ onCreate }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCreate = async () => {
        setLoading(true);
        setError('');
        try {
            await onCreate({ title, content });
            setTitle('');
            setContent('');
        } catch (error) {
            setError('Failed to create journal entry. Please try again.');
            console.error('Error creating journal entry:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 justify-center p-4">
            <Text className="text-2xl font-bold mb-4 text-center">Create Journal Entry</Text>
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
            <Pressable className="bg-blue-500 p-3 rounded-full" onPress={handleCreate} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white text-center">Create</Text>
                )}
            </Pressable>
        </View>
    );
};

export default CreateJournal;
