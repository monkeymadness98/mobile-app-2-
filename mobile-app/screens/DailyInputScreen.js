import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postEntry } from '../services/api';

const STORAGE_KEY = 'lifescore:entries';

export default function DailyInputScreen({ navigation }) {
  const [stress, setStress] = useState(5);
  const [happiness, setHappiness] = useState(5);
  const [health, setHealth] = useState(5);

  const saveLocal = async (entry) => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      arr.push(entry);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch (e) {
      console.warn('Local save error', e.message);
    }
  };

  const onSave = async () => {
    const entry = {
      date: new Date().toISOString().split('T')[0],
      stress,
      happiness,
      health
    };

    // Save locally (persistence on device)
    await saveLocal(entry);

    // Try to push to backend (non-blocking)
    try {
      await postEntry(entry);
    } catch (e) {
      // ignore if offline
    }

    Alert.alert('Saved', 'Your daily scores are saved.');
    navigation.navigate('WeeklyReport');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Check-In</Text>

      <Text style={styles.label}>Stress: {stress}</Text>
      <Slider minimumValue={0} maximumValue={10} step={1} value={stress} onValueChange={setStress} />

      <Text style={styles.label}>Happiness: {happiness}</Text>
      <Slider minimumValue={0} maximumValue={10} step={1} value={happiness} onValueChange={setHappiness} />

      <Text style={styles.label}>Health: {health}</Text>
      <Slider minimumValue={0} maximumValue={10} step={1} value={health} onValueChange={setHealth} />

      <View style={{ marginTop: 20 }}>
        <Button title="Save Today" onPress={onSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  label: { marginTop: 12, fontSize: 18 }
});
