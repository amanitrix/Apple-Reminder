import { InsertReminder, UpdateReminder } from "@/types/types";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function getReminders() {
        const response = await fetch(`${API_URL}/reminders`);
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
}

export async function completeReminder(id: number, isCompleted: boolean) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !isCompleted }),
    });

    if (!response.ok) {
        throw new Error('Failed to update reminder');
    }

    return response.json();
}

export async function createReminder(newReminder: InsertReminder) {

    const response = await fetch(`${API_URL}/reminders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReminder),
    });

    if (!response.ok) {
        throw new Error('Failed to create reminder');
    }

    return response.json();
}

export async function getReminderById(id: number) {
        const response = await fetch(`${API_URL}/reminders/${id}`);
        if (!response.ok) {
        throw new Error('failed to fetch reminder by Id');
        }
        return response.json();
}

export async function updateOldReminder(id: number, updatedReminder: UpdateReminder) {
    const response = await fetch(`${API_URL}/reminders/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReminder),
    });

    if (!response.ok) {
        throw new Error('Failed to update reminder');
    }

    return response.json();
}

export async function deleteReminder(id: number) {
        const response = await fetch(`${API_URL}/reminders/${id}`,{method: 'DELETE'});
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
}