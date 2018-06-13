import mongoose, { Schema } from 'mongoose';
// import Question from '../graphql/resolvers/Question';

const QuestionSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
    },
    answerDate: {
      type: Date,
    },
    theAsker: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    theResponder: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    likesCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

QuestionSchema.statics = {
  incLikesCount(questionId) {
    return this.findByIdAndUpdate(questionId, { $inc: { likesCount: 1 } }, { new: true });
  },
  decLikesCount(questionId) {
    return this.findByIdAndUpdate(questionId, { $inc: { likesCount: -1 } }, { new: true });
  },
};

export default mongoose.model('Question', QuestionSchema);
