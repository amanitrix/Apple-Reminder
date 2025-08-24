import db from '../config/db.js';

export const ReminderModel = {
  async getAll() {
    const result = await db.query('SELECT * FROM reminders ORDER BY created_at DESC');
    return result.rows;
  },

  async findById(id) {
    const result = await db.query('SELECT * FROM reminders WHERE id = $1', [id]);
    return result.rows[0];
  },

  async create({ reminder, notes, userId }) {
    // Debug log to verify values
    // console.log('Creating reminder with:', { reminder, notes, userId });

    // Explicitly cast userId to integer
    const userIdInt = parseInt(userId, 10);

    try {
      const result = await db.query(`
        INSERT INTO reminders (reminder, notes, user_id)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [reminder, notes, userIdInt]
      );
      return result.rows[0];
    } catch (err) {
      console.error('DB Insert Error:', err);
      throw new Error('Failed to insert reminder');
    }
  },

  async update(query, values) {
    const result = await db.query(
      query,
      values
    );
    return result.rows[0];
  },

  async delete(reminderId) {
    const result = await db.query('DELETE FROM reminders WHERE id = $1', [reminderId]);
    return result.rowCount;
  }
};