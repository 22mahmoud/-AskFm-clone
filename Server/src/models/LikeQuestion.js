import mongoose, { Schema } from 'mongoose';
import Question from './Question';

const LikeQuestionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Question',
    },
  ],
});

LikeQuestionSchema.methods = {
  async userLikedQuestion(questionId) {
    try {
      if (this.questions.some(q => q.equals(questionId))) {
        this.questions.pull(questionId);
        await this.save();

        const question = await Question.decLikesCount(questionId);
        const q = question.toJSON();
        return {
          isLiked: false,
          ...q,
        };
      }
      const question = await Question.incLikesCount(questionId);
      const q = question.toJSON();

      this.questions.push(questionId);
      await this.save();
      return {
        isLiked: true,
        ...q,
      };
    } catch (error) {
      throw error;
    }
  },
};

LikeQuestionSchema.index({ userId: 1 }, { unique: true });

export default mongoose.model('LikeQuestion', LikeQuestionSchema);
