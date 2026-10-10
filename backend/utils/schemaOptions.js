const schemaOptions = {
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: (_document, returned) => { delete returned._id; },
  },
  toObject: {
    virtuals: true,
    transform: (_document, returned) => { delete returned._id; },
  },
};

module.exports = schemaOptions;
