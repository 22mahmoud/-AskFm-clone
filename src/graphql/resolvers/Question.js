import FormatErrors from '../../FormatErrors';
import User from '../../models/User';
import Question from '../../models/Question';
import { requireUser } from '../../services/auth';

export default {
  Question: {
    theAsker: ({ theAsker }) => User.findById(theAsker),
    // theResponder: ({ theResponder }) => theResponder.map(r => User.findById(r)),
    theResponder: ({ theResponder }) => User.findById(theResponder),
    likes: ({ likes }) => likes.map(l => User.findById(l)),
  },

  Query: {
    getQuestions: async (_, args, { user }) => {
      try {
        await requireUser(user);
        const questions = await Question.find({});
        return questions;
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    sendQuestion: async (_, args, { user }) => {
      try {
        await requireUser(user);

        const question = await Question.create({
          ...args,
          theAsker: user._id,
        });
        return {
          question,
          errors: null,
        };
      } catch (error) {
        return {
          question: null,
          errors: FormatErrors(error),
        };
      }
    },
    AnswerQuestion: async (_, { answer, questionID }, { user }) => {
      try {
        await requireUser(user);
        const { theResponder, answer: qAnswer } = await Question.findById(questionID,);

        if (theResponder.toString() !== user._id.toString()) {
          throw Error;
        }

        if (qAnswer) {
          throw Error;
        }

        const updatedQuestion = await Question.findByIdAndUpdate(questionID, {
          answer,
        });
        return {
          question: updatedQuestion,
          errors: null,
        };
      } catch (error) {
        return {
          question: null,
          errors: FormatErrors(error),
        };
      }
    },
    likeQuestionToggle: async (_, { questionID }, { user }) => {
      try {
        await requireUser(user);

        const question = await Question.findById(questionID);
        if (question.likes.indexOf(user._id) > -1) {
          await question.update({ $pull: { likes: user._id } }, { new: true });
        } else {
          await question.update({ $push: { likes: user._id } }, { new: true });
        }

        return {
          question: await Question.findById(question),
          // question,
        };
      } catch (error) {
        return {
          errors: FormatErrors(error),
        };
      }
    },
    sendQuestionForNearby: async (_, { text }, { user }) => {
      try {
        const currentUser = await requireUser(user);
        if (!currentUser) {
          throw Error;
        }
        const { loc: { coordinates } } = currentUser;

        const users = await User.where('loc').nearSphere({
          center: coordinates,
          maxDistance: 1 / 111.12,
        });

        const allUsers = users.filter(u => u._id.toString() !== user._id.toString(),);
        const questions = [];
        allUsers.map(u =>
          questions.push(Question.create({ theAsker: user._id, text, theResponder: u }),),);

        return Promise.all(questions);
      } catch (error) {
        throw error;
      }
    },
  },
};
