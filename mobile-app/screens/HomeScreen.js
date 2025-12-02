import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg' }}
      />
      <Text style={styles.title}>LifeScore</Text>

      <View style={{ marginVertical: 8, width: '60%' }}>
        <Button title="Daily Check-In" onPress={() => navigation.navigate('DailyInput')} />
      </View>
      <View style={{ marginVertical: 8, width: '60%' }}>
        <Button title="Weekly Report" onPress={() => navigation.navigate('WeeklyReport')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  logo: { width: 120, height: 120, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 20 }
});
