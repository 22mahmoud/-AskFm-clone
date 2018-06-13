import FormatErrors from '../../FormatErrors';
import User from '../../models/User';
import Question from '../../models/Question';
import LikeQuestion from '../../models/LikeQuestion';

const getQuestionsFn = (questions, likes) =>
  questions.reduce((arr, question) => {
    const qs = question.toJSON();
    if (likes.questions.some(q => q.equals(question._id))) {
      arr.push({
        ...qs,
        isLiked: true,
      });
    } else {
      arr.push({
        ...qs,
        isLiked: false,
      });
    }
    return arr;
  }, []);

export default {
  Question: {
    theAsker: ({ theAsker }) => User.findById(theAsker),
    // theResponder: ({ theResponder }) => theResponder.map(r => User.findById(r)),
    theResponder: ({ theResponder }) => User.findById(theResponder),
    // likes: ({ likes }) => likes.map(l => User.findById(l)),
  },
  Query: {
    getQuestions: async (_, args, { user }) => {
      try {
        const p1 = Question.find({ answer: { $exists: true } }).sort({ createdAt: -1 });
        const p2 = LikeQuestion.findOne({ userId: user._id });
        const [questions, likes] = await Promise.all([p1, p2]);
        const QuestionsToSend = getQuestionsFn(questions, likes);
        return QuestionsToSend;
      } catch (error) {
        throw error;
      }
    },
    getUserAnsweredQuestions: async (_, { username }, { user }) => {
      try {
        const currUser = await User.findOne({ username });
        const p1 = Question.find({ answer: { $exists: true }, theResponder: currUser._id }).sort({
          createdAt: -1,
        });
        const p2 = LikeQuestion.findOne({ userId: user._id });
        const [questions, likes] = await Promise.all([p1, p2]);
        const QuestionsToSend = getQuestionsFn(questions, likes);
        return QuestionsToSend;
      } catch (error) {
        throw error;
      }
    },
    getMyNotAnswerdQuestions: async (_, args, { user }) => {
      try {
        const questions = await Question.find()
          .exists('answer', false)
          .where('theResponder', user._id)
          .sort({ createdAt: -1 });
        return questions;
      } catch (error) {
        throw error;
      }
    },
    getMyNotAnsweredQuestion: async (_, { questionID }, { user }) => {
      try {
        const question = await Question.findOne({ _id: questionID, theResponder: user._id }).exists(
          'answer',
          false,
        );
        if (!question) {
          return {
            isOk: false,
            question: null,
          };
        }
        return { question, isOk: true };
      } catch (error) {
        // throw error;
        return {
          isOk: false,
          error: [],
        };
      }
    },
  },

  Mutation: {
    sendQuestion: async (_, args, { user }) => {
      try {
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
        const question = await Question.findById(questionID);
        const { theResponder, answer: qAnswer } = question;
        if (theResponder.toString() !== user._id.toString()) {
          throw Error;
        }

        if (qAnswer) {
          throw Error;
        }
        question.answer = answer;
        question.answerDate = new Date().getTime();
        await question.save();

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
    likeQuestionToggle: async (_, { questionID }, { user }) => {
      try {
        const likes = await LikeQuestion.findOne({ userId: user._id });

        const question = await likes.userLikedQuestion(questionID);

        return {
          question,
        };
      } catch (error) {
        return {
          errors: FormatErrors(error),
        };
      }
    },
    sendQuestionForNearby: async (_, { text }, { user }) => {
      try {
        if (!user) {
          throw Error;
        }
        const {
          loc: { coordinates },
        } = user;

        const users = await User.where('loc').nearSphere({
          center: coordinates,
          maxDistance: 1 / 111.12,
        });

        const allUsers = users.filter(u => u._id.toString() !== user._id.toString());
        const questions = [];
        allUsers.map(u =>
          questions.push(Question.create({ theAsker: user._id, text, theResponder: u })));

        return Promise.all(questions);
      } catch (error) {
        throw error;
      }
    },
  },
};
