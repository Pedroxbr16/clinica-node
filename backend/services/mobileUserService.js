const bcrypt = require('bcryptjs');
const User = require('../models/mobile/User');
const { omitUndefined } = require('../utils/normalizers');

const create = async (data) => User.create({ ...data, password: await bcrypt.hash(data.password, 12) });
const findById = (id) => User.findById(id).select('-password');
const findByEmail = (email) => User.findOne({ email: email.toLowerCase() }).select('-password');
const update = async (id, data) => {
  const updateData = omitUndefined(data);
  if (updateData.password) updateData.password = await bcrypt.hash(updateData.password, 12);
  return User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select('-password');
};
const authenticate = async (email, password) => {
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user || !(await bcrypt.compare(password, user.password))) return null;
  return user;
};

module.exports = { create, findById, findByEmail, update, authenticate };
