const db = require('../database/models/index');
const AppError = require('../utils/appError');

class AppointmentSercices {
  async createAppointment(dat) {
    try {
      const appointment = await db.Appointments.create(data, {
        include: [
          {
            model: db.Pets,
          },
        ],
      });

      return appointment;
    } catch (error) {
      throw Error(error);
    }
  }
}

module.exports = AppointmentSercices;
