import mongoose, { Schema } from 'mongoose';
import Question from '../graphql/resolvers/Question';

const QuestionSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
    },
    theAsker: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    theResponder: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true },
);

QuestionSchema.methods = {
  likesCount() {
    return Question.aggregate({ $project: { count: { $size: '$likes' } } });
  },
};

export default mongoose.model('Question', QuestionSchema);
