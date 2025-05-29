import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

type Event = {
  title: string;
  venue: string;
  price: number;
  timestamp: number;
  tickets: {
    sold: number;
    total: number;
  };
};

export default function HomeScreen() {
  const color = useThemeColor({}, 'text');

  const [events, setEvents] = useState<Event[]>([
    {
      title: 'Emo Night',
      venue: 'Workmans',
      price: 50,
      timestamp: 1748466104473,
      tickets: {
        total: 50,
        sold: 32,
      },
    },
    {
      title: 'Indie Rock Live',
      venue: 'The Academy',
      price: 35,
      timestamp: 1749057300000,
      tickets: {
        total: 100,
        sold: 78,
      },
    },
    {
      title: 'Techno Basement Session',
      venue: 'Wigwam',
      price: 25,
      timestamp: 1749143700000,
      tickets: {
        total: 80,
        sold: 64,
      },
    },
    {
      title: 'Open Mic Night',
      venue: 'The International Bar',
      price: 10,
      timestamp: 1749230100000,
      tickets: {
        total: 40,
        sold: 20,
      },
    },
    {
      title: 'Jazz & Cocktails',
      venue: 'The Grand Social',
      price: 40,
      timestamp: 1749316500000,
      tickets: {
        total: 60,
        sold: 45,
      },
    },
  ]);

  const [count, setCount] = useState<{ [key: number]: number }>({});

  const clickHandler = (idx: number) => {
    setCount((prev) => {
      return { ...prev, [idx]: idx in prev ? prev[idx] + 1 : 1 };
    });
  };

  return (
    <ThemedView style={styles.container}>
      <View>
        {events.map(({ title, venue, price, timestamp, tickets }, idx) => (
          <View key={idx} style={styles.eventWrapper}>
            <ThemedText type="title">{title}</ThemedText>
            <ThemedText type="subtitle">{venue}</ThemedText>
            <ThemedText type="default">{tickets.sold} tickets left</ThemedText>
            {/* <Button title="Buy Ticket" onPress={() => clickHandler(idx)} /> */}
          </View>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 10,
  },
  eventWrapper: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});
