import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const ImportantInfoSchema = new Schema({
  details: {
    type: [String],
    default: []
  },
  rules: {
    type: [String],
    default: []
  },
  howToJoin: {
    type: [String],
    default: []
  },
  howToClaimPrizeMoney: {
    type: [String],
    default: []
  }
}, { _id: false });

const PrizesSchema = new Schema({
  first: {
    type: Number,
    required: true
  },
  second: {
    type: Number,
    default: null
  },
  third: {
    type: Number,
    default: null
  }
}, { _id: false });

const TournamentSchema = new Schema({
  frequency: {
    type: String,
    enum: ['Daily', 'Weekly', 'Monthly', 'One-time'],
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  tags: {
    type: [String],
    default: []
  },
  details: {
    type: [String],
    default: []
  },
  gameMode: {
    type: String,
    enum: ['BR', 'CS', 'DM', 'TDM'], // extend as needed
    required: true
  },
  maxPrizePool: {
    type: Number,
    required: true,
    min: 0
  },
  maxPlayers: {
    type: Number,
    required: true,
    min: 1
  },
  prizePerKill: {
    type: Number,
    default: 0,
    min: 0
  },
  entryFee: {
    type: Number,
    required: true,
    min: 0
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true,
    trim: true
  },
  startDateTime: {
    type: Date,
    required: true
  },
  prizes: {
    type: PrizesSchema,
    required: true
  },
  prizeDetails: {
    type: [String],
    default: []
  },
  importantInformation: {
    type: ImportantInfoSchema,
    default: () => ({})
  }
}, {
  timestamps: true
});

export default model('Tournament', TournamentSchema);
