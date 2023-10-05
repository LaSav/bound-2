import mongoose, { Schema, Document } from 'mongoose';

interface IListing extends Document {
  user: mongoose.Schema.Types.ObjectId;
  text: string;
  requiredSkill: string;
  requests: mongoose.Schema.Types.ObjectId[];
  matches: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const listingSchema: Schema<IListing> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    requiredSkill: {
      type: String,
      required: [true, 'Please add a Skill'],
    },
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

const ListingModel = mongoose.model<IListing>('Listing', listingSchema);

export default ListingModel;
