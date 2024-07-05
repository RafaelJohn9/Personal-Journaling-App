import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const EditJournal = ({ journal, onUpdate }) => {
    const [title, setTitle] = useState(journal.title);
    const [category, setCategory] = useState(journal.category || 'Personal');
    const [content, setContent] = useState(journal.content);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleUpdate = async () => {
        setLoading(true);
        setError('');
        try {
            await onUpdate({ ...journal, title, category, content });
        } catch (error) {
            setError('Failed to update journal entry. Please try again.');
            console.error('Error updating journal entry:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 justify-center w-11/12">
                <Text className="text-3xl font-bold mb-4 text-center uppercase text-slate-300">Edit Journal Entry</Text>
                <View className="mb-4">
                    <TextInput
                        className="p-2 border-b border-gray-300 text-lg"
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>
                <View className="mb-4">
                    <Picker
                        selectedValue={category}
                        onValueChange={(itemValue) => setCategory(itemValue)}
                        className="p-2 border-b border-gray-300 text-lg"
                    >
                        <Picker.Item label="Personal" value="Personal" />
                        <Picker.Item label="Work" value="Work" />
                        <Picker.Item label="Travel" value="Travel" />
                        <Picker.Item label="Others" value="Others" />
                    </Picker>
                </View>
                <View className="mb-4">
                    <TextInput
                        className="p-2 border-b border-gray-300 text-lg"
                        placeholder="Content"
                        value={content}
                        onChangeText={setContent}
                        multiline
                    />
                </View>
                {error ? <Text className="text-red-500 text-center mb-4">{error}</Text> : null}
                <Pressable className="bg-blue-500 p-3 rounded-full mx-6" onPress={handleUpdate} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text className="text-white text-center text-lg font-extrabold">Update</Text>
                    )}
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default EditJournal;
