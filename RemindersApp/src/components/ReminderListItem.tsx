import { Reminder } from "@/types/types";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { completeReminder } from "@/services/reminderService";
import { Link } from "expo-router";

type ReminderListItemProps = {
  reminderItem: Reminder;
}

export default function ReminderListItem({ reminderItem }: ReminderListItemProps) {
  const [isCompleted, setIsCompleted] = useState<boolean>(reminderItem.completed);

  const {mutate: completedTask} = useMutation({
    mutationFn: async (isReminderCompleted: boolean) => completeReminder(reminderItem.id, isReminderCompleted),
    onSuccess: (data) => {
      setIsCompleted(data.completed);
    },
    onError: (error) => {
        Alert.alert('Error', `Failed to update reminder: ${error.message}`);
        }
  });

  return (
    <TouchableOpacity
      onPress={() => completedTask(isCompleted)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'grey',
        marginBottom: 20,
        paddingBottom: 10
      }}>
      {isCompleted
        ? <MaterialCommunityIcons name="circle-slice-8" size={22} color="#FF8C00" style={{ alignSelf: 'flex-start' }} />
        : <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={22} color="grey" style={{ alignSelf: 'flex-start' }} />
      }
      <View style={{ gap: 5, flexShrink: 1 }}>
        <Text>{reminderItem.reminder}</Text>
        {!!reminderItem.notes && (
          <Text style={{ fontSize: 12, color: 'grey' }}>{reminderItem.notes}</Text>
        )}
      </View>

      <Link href={`createUpdateReminder/?id=${reminderItem.id}`} asChild>
      <AntDesign
        name="infocirlceo"
        size={17}
        color="#FF8C00"
        style={{ alignSelf: 'flex-start', marginLeft: 'auto', marginRight: 5 }}
        onPress={() => console.log('Navigate to edit')}
      />
      </Link>
    </TouchableOpacity>
  )
}
