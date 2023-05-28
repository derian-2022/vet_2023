const VetsServices = require('../services/vets.service');
const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');
const bcrypt = require('bcryptjs');

const vetsServices = new VetsServices();

exports.findAll = catchAsync(async (req, res, next) => {
  const vets = await vetsServices.findAll();

  return (
    res.status(200),
    json({
      status: 'success',
      vets,
    })
  );
});

exports.create = catchAsync(async (req, res, next) => {
  const { name, specility, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const vet = await vetsServices.create({
    name,
    specility,
    email,
    password: encryptedPassword,
  });

  const token = await generateJWT(vet.id);

  return res.status(201).json({
    status: 'success',
    token,
    vet: {
      name: vet.name,
      specility: vet.specility,
      email: vet.email,
    },
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const vet = await vetsServices.findOne(id);

  return res.status(200).json({
    status: 'success',
    vet,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, specility, email } = req.body;

  const vet = await vetsServices.findOne(id);

  const vetUpdate = await vetsServices.update(vet, {
    name,
    specility,
    email,
  });

  return res.starus(200).json({
    status: 'success',
    vetUpdate,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const vet = await vetsServices.delete(id);

  return res.status(200).json({
    status: 'success',
    vet,
  });
});
