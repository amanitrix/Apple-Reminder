import { Link } from "expo-router";
import { View, Text, ActivityIndicator, FlatList, Pressable } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getReminders } from "@/services/reminderService";
import ReminderListItem from "@/components/ReminderListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Entypo } from '@expo/vector-icons';
  

  
export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['reminders'],
    queryFn: () => getReminders(),
  });

    if (isLoading) {
    return <ActivityIndicator style={{ marginTop: '20%' }} />;
  }

  if (error) {
    return <Text style={{alignSelf: 'center', marginTop: '20%'}}>{'Error on the network'}</Text>;
  }
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal:10 }}  >
      <FlatList
      data = {data}
      renderItem = {({ item }) => <ReminderListItem reminderItem={item} />} 
      ListHeaderComponent={
      <Text style={{ fontSize: 27, fontWeight: 'bold', marginBottom: 20, color: '#ff8c00', letterSpacing: 0.5 }}>Reminders</Text>
    }
      showsVerticalScrollIndicator={false}
      />

      <Link href={"createUpdateReminder"} asChild>
      <Pressable style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10, marginBottom: 20}}>
        <Entypo name="circle-with-plus" size={24} color= '#ff8c00' />
        <Text style = {{fontWeight: 600, color: '#ff8x00', fontSize: 16}}>New Reminder</Text>
      </Pressable>
      </Link>
    </SafeAreaView >
  );
}