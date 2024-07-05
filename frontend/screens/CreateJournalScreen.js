import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createJournal } from '../middlewares/journalMiddleware'; // Assuming this function exists

const CreateJournalScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Personal'); // Default category
    const [loading, setLoading] = useState(false);

    const handleCreateJournal = async () => {
        if (!title || !content) {
            Alert.alert('Error', 'Title and content cannot be empty.');
            return;
        }

        setLoading(true);

        try {
            const newJournal = await createJournal(title, category, content);
            Alert.alert('Success', 'Journal created successfully.');

            // enable rerendering of JournalList
            navigation.navigate({
                name: 'JournalList',
                key: Date.now().toString() // Unique key for every navigation
            });
            setTitle('');
            setCategory('')
            setContent('')

        } catch (error) {
            Alert.alert('Error', 'Failed to create journal. Please try again.');
            console.error('Error creating journal:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 mt-8">
            <View className="flex-1 justify-center p-4 w-screen mx-2">
                <Text className="text-3xl font-bold mb-4 text-center uppercase text-slate-300">Create Journal</Text>
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
                <Pressable className="bg-blue-500 p-3 rounded-full mx-6" onPress={handleCreateJournal}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text className="text-white text-center text-lg font-extrabold">Create</Text>
                    )}
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default CreateJournalScreen;
