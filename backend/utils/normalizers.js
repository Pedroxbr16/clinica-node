const onlyDigits = (value) => (value ? String(value).replace(/\D/g, '') : '');
const omitUndefined = (data) => Object.fromEntries(
  Object.entries(data).filter(([, value]) => value !== undefined),
);

module.exports = { onlyDigits, omitUndefined };
