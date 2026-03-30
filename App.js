import React, { useState } from 'react';
import { FlatList, View, Text, Pressable } from 'react-native';
import { Input, Button, ThemeProvider } from '@rneui/themed';

export default function App() {
const [tasks, setTasks] = useState([
{ key: "1", description: "Buy groceries", completed: false },
{ key: "2", description: "Walk the dog", completed: true },
]);

const [newTask, setNewTask] = useState("");

const addTask = () => {
if (newTask.trim() === "") return;

const newItem = {
key: Date.now().toString(),
description: newTask,
completed: false,
};

setTasks([...tasks, newItem]);
setNewTask("");
};

const toggleTask = (key) => {
setTasks(
tasks.map((task) =>
task.key === key ? { ...task, completed: !task.completed } : task
)
);
};

const renderItem = ({ item }) => (
<Pressable onPress={() => toggleTask(item.key)}>
<View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
<Text style={{ fontSize: 22, marginRight: 10 }}>
{item.completed ? '☑' : '☐'}
</Text>

<Text
style={{
fontSize: 18,
textDecorationLine: item.completed ? 'line-through' : 'none',
}}
>
{item.description}
</Text>
</View>
</Pressable>
);

return (
<ThemeProvider>
<View style={{ flex: 1, padding: 20 }}>
<Input
placeholder="Add a task..."
value={newTask}
onChangeText={setNewTask}
onSubmitEditing={addTask}
/>
<Button title="Add Task" onPress={addTask} />
<FlatList
data={tasks}
renderItem={renderItem}
keyExtractor={(item) => item.key}
/>
</View>
</ThemeProvider>
);
}
