const catchAsync = require('../utils/catchAsync');
const AppointmentSercices = require('../services/appointments.service');

const appointmentSercices = new AppointmentSercices();

exports.createAppointments = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { date, reason, vet_id } = req.body;
  const Appointments = await appointmentSercices.createAppointments({
    date,
    reason,
    vet_id,
    pet_id: id,
  });

  return res.status(201).json({
    status: 'success',
    Appointments,
  });
});
