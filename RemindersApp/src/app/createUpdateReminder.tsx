import { createReminder, deleteReminder, getReminderById, updateOldReminder } from "@/services/reminderService";
import { InsertReminder } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, ActivityIndicator, Pressable } from "react-native";

export default function CreateUpdateReminder() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const reminderId = useMemo(() => Number(id), [id]);
  const isEditing = Number.isFinite(reminderId);

  const [reminder, setReminder] = useState("");
  const [notes, setNotes] = useState("");

  // Use the existing QueryClient from your app provider
  const queryClient = useQueryClient();

  // Fetch for edit mode only
  const { data, isLoading, error } = useQuery({
    queryKey: ["reminder", reminderId],
    queryFn: () => getReminderById(reminderId as number),
    enabled: isEditing, // fetch only if we have an id
  });

  console.log("Fetched reminder data:", id, data);

  useEffect(() => {
    if (data) {
      setReminder(data.reminder ?? "");
      setNotes(data.notes ?? "");
    }
  }, [data]);

  const { mutate: saveReminder, isPending: isSaving } = useMutation({
    mutationFn: async () => {
      const payload: InsertReminder = { reminder, userId: 3 };
      if (notes) payload.notes = notes;
      return createReminder(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      router.back();
    },
    onError: () => {
      Alert.alert("Error", "Failed to create reminder");
    },
  });

  const { mutate: updateReminder, isPending: isUpdating } = useMutation({
    mutationFn: async () => {
      return updateOldReminder(reminderId as number, {
        reminder,
        notes: notes || null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      router.back();
    },
    onError: () => {
      Alert.alert("Error", "Failed to update reminder");
    },
  });

  const { mutate: removeReminder, isPending: isDeleting } = useMutation({
    mutationFn: async () => deleteReminder(reminderId as number),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      router.back();
    },
    onError: () => {
      Alert.alert("Error", "Failed to delete reminder");
    },
  });

  const isDisabled = !reminder || isSaving || isUpdating || isDeleting;

  const onDonePress = () => {
    if (isDisabled) return;
    if (isEditing) updateReminder();
    else saveReminder();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: isEditing ? "Edit Reminder" : "New Reminder",
          headerRight: () => (
            <Pressable disabled={isDisabled} onPress={onDonePress}>
              <Text style={[styles.headerBtn, isDisabled && styles.headerBtnDisabled]}>
                Done
              </Text>
            </Pressable>
          ),
        }}
      />
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: "20%" }} />
      ) : error ? (
        <Text style={{ alignSelf: "center", marginTop: "20%" }}>
          {(error as Error).message}
        </Text>
      ) : (
        <>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Title"
              multiline
              value={reminder}
              onChangeText={setReminder}
            />
            <View style={styles.divider} />
            <TextInput
              placeholder="Notes"
              multiline
              value={notes}
              onChangeText={setNotes}
            />
          </View>

          {isEditing && (
            <Pressable
              onPress={() => removeReminder()}
              style={styles.inputBox}
              disabled={isDeleting}
            >
              <Text style={{ color: "crimson" }}>
                {isDeleting ? "Deleting..." : "Delete"}
              </Text>
            </Pressable>
          )}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgrey",
  },
  inputBox: {
    backgroundColor: "white",
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    gap: 10,
  },
  headerBtn: { color: "#0E7AFE", fontWeight: "600" },
  headerBtnDisabled: { opacity: 0.4 },
});
