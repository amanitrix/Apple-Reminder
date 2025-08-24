import { ReminderService } from "../services/reminderService.js";

export const ReminderController = {
  async getAllReminders(req, res, next) {
    // console.log("Fetching all reminders");
    try {
      const reminders = await ReminderService.getAllReminders();
      res.status(200).json(reminders);
    } catch (error) {
      next(error); // Pass the error to the error handler middleware
    }
  },

  async getReminderById(req, res, next) {
    try {
      const reminderId = parseInt(req.params.id, 10);
      
      const reminder = await ReminderService.getReminderById(reminderId);
      res.status(200).json(reminder);
    } catch (error) {
      next(error); // Pass the error to the error handler middleware
    }
  },

  async createReminder(req, res, next) {
    try {
      // console.log(req.body);
      const newReminder = await ReminderService.createReminder(req.body);
      res.status(200).json(newReminder);
    } catch (error) {
      next(error); // Pass the error to the error handler middleware
    }
  },

  async updateReminder(req, res, next) {
    try {
      const reminderId = parseInt(req.params.id, 10);

      const updatedReminder = await ReminderService.updateReminder(reminderId, req.body);
      res.status(200).json(updatedReminder);
    } catch (error) {
      next(error); // Pass the error to the error handler middleware
    }
  },

  async deleteReminder(req, res, next) {
    try {
      const reminderId = parseInt(req.params.id, 10);
      
      const reminder = await ReminderService.deleteReminder(reminderId);
      res.status(200).json(reminder);
    } catch (error) {
      next(error); // Pass the error to the error handler middleware
    }
  },
};

