import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchEntries } from '../services/api';

const STORAGE_KEY = 'lifescore:entries';

export default function WeeklyReportScreen({ navigation }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    loadLocal();
    // try to load remote entries as well (non-blocking)
    fetchEntries().then(remote => {
      if (remote && remote.length) setEntries(remote);
    }).catch(() => {});
  }, []);

  async function loadLocal() {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      setEntries(arr);
    } catch (e) {
      console.warn('Load local error', e.message);
    }
  }

  const average = (key) => {
    if (!entries || entries.length === 0) return '--';
    const total = entries.reduce((s, e) => s + (e[key] || 0), 0);
    return (total / entries.length).toFixed(1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Report</Text>

      <Text style={styles.row}>Avg Stress: {average('stress')}</Text>
      <Text style={styles.row}>Avg Happiness: {average('happiness')}</Text>
      <Text style={styles.row}>Avg Health: {average('health')}</Text>

      <Text style={{ marginTop: 18, fontWeight: '700' }}>Recent Entries</Text>
      <FlatList
        style={{ width: '100%', marginTop: 8 }}
        data={entries.slice().reverse()}
        keyExtractor={(i, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={{ fontWeight: '600' }}>{item.date}</Text>
            <Text>H:{item.happiness}  S:{item.stress}  He:{item.health}</Text>
          </View>
        )}
      />

      <View style={{ marginTop: 10 }}>
        <Button title="Back Home" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 10, textAlign: 'center' },
  row: { marginTop: 6, fontSize: 16 },
  item: { padding: 10, borderBottomWidth: 1, borderColor: '#eee' }
});
