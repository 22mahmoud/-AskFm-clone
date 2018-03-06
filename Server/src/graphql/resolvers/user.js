import FormatErrors from '../../FormatErrors';
import User from '../../models/User';
import { requireUser } from '../../services/auth';
import LikeQuestion from '../../models/LikeQuestion';
import Question from '../../models/Question';

export default {
  User: {
    followers: ({ followers }) => followers.map(f => User.findById(f)),
    following: ({ following }) => following.map(f => User.findById(f)),
  },
  Me: {
    followers: ({ followers }) => followers.map(f => User.findById(f)),
    following: ({ following }) => following.map(f => User.findById(f)),
  },
  Query: {
    getUsers: async (_, args, { user }) => {
      await requireUser(user);
      try {
        const users = await User.find({});
        return users;
      } catch (error) {
        throw error;
      }
    },
    getUserByUsername: async (_, { username }, { user }) => {
      try {
        await requireUser(user);
        return await User.findOne({ username });
      } catch (error) {
        throw error;
      }
    },
    getUser: async (_, { email }) => {
      try {
        const user = await User.findOne({ email });
        return user;
      } catch (error) {
        throw error;
      }
    },
    me: async (_, args, { user }) => {
      try {
        const me = await requireUser(user);
        if (!me) {
          return {
            isOk: false,
            user: null,
          };
        }

        return {
          isOk: true,
          user: me,
        };
      } catch (error) {
        console.log(error);
        return {
          isOk: false,
          user: null,
        };
      }
    },
    getTotalPosts: async (_, { username }, { user }) => {
      try {
        await requireUser(user);
        const getUser = await User.findOne({ username });
        const totalPosts = await Question.find({ answer: { $exists: true } })
          .where('theResponder', getUser._id)
          .count();
        return {
          total: totalPosts,
        };
      } catch (error) {
        throw error;
      }
    },
    getTotalLikes: async (_, { username }, { user }) => {
      try {
        await requireUser(user);
        const getUser = await User.findOne({ username });
        // const totalLikes = await LikeQuestion.find({  })
        return {
          total: totalPosts,
        };
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    register: async (_, args) => {
      try {
        const user = await User.create(args);
        if (user) {
          await LikeQuestion.create({ userId: user._id });
        }

        return {
          isOk: true,
          user,
        };
      } catch (error) {
        console.log(error);
        return {
          isOk: false,
          errors: FormatErrors(error),
        };
      }
    },

    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({
          email,
        });

        if (!user) {
          throw new Error(
            JSON.stringify({
              path: 'email',
              message: 'User not exist!',
            }),
            'user',
          );
        }

        if (!user.authUser(password)) {
          throw new Error(
            JSON.stringify({
              path: 'password',
              message: 'password not match!',
            }),
            'password',
          );
        }

        return {
          isOk: true,
          token: user.createToken(),
        };
      } catch (error) {
        const errors = [];
        errors.push(JSON.parse(error.message));
        return {
          isOk: false,
          errors,
        };
      }
    },
    addLocation: async (_, { loc }, { user }) => {
      try {
        // console.log(type, coordinates);

        await requireUser(user);
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          {
            loc,
          },
          { new: true },
        );
        return updatedUser;
      } catch (error) {
        throw error;
      }
    },
    Togglefollow: async (_, { userID }, { user }) => {
      try {
        const me = await requireUser(user);
        const userToFollow = await User.findById(userID);
        if (!userToFollow || !me) {
          throw Error;
        }

        if (userToFollow.followers.indexOf(user._id) > -1) {
          await userToFollow.update({ $pull: { followers: user._id } }, { new: true });
          await me.update({ $pull: { following: userID } }, { new: true });
        } else {
          await userToFollow.update({ $push: { followers: user._id } }, { new: true });
          await me.update({ $push: { following: userID } }, { new: true });
        }

        return await User.findById(userID);
      } catch (error) {
        throw error;
      }
    },
    changePassword: async (_, { currentPassword, newPassword }, { user }) => {
      try {
        await requireUser(user);

        if (!user.authUser(currentPassword)) {
          throw new Error(
            JSON.stringify({
              path: 'password',
              message: 'password not valid',
            }),
            'currentPassword',
          );
        }
        const currUser = await User.findOne({ _id: user._id });
        currUser.password = newPassword;
        await currUser.save();
        return {
          isOk: true,
          token: currUser.createToken(),
          user: currUser,
        };
      } catch (error) {
        const errors = [];
        error.message && errors.push(JSON.parse(error.message));
        return {
          isOk: false,
          errors: errors || FormatErrors(error),
        };
      }
    },
    changeInfo: async (_, { bio, username, email }, { user }) => {
      try {
        await requireUser(user);
        const p1 = User.findOne({ email })
          .where('_id')
          .ne(user._id);
        const p2 = User.findOne({ username })
          .where('_id')
          .ne(user._id);
        const [isEmail, isUsername] = await Promise.all([p1, p2]);

        if (isEmail) {
          throw new Error(
            JSON.stringify({
              path: 'email',
              message: 'email already exist',
            }),
            'email',
          );
        }
        if (isUsername) {
          throw new Error(
            JSON.stringify({
              path: 'username',
              message: 'username already exist',
            }),
            'username',
          );
        }
        const currUser = await User.findOne({ _id: user._id });
        currUser.username = username;
        currUser.email = email;
        currUser.bio = bio;
        await currUser.save();

        return {
          isOk: true,
          token: currUser.createToken(),
          user: currUser,
        };
      } catch (error) {
        const errors = [];
        error.message && errors.push(JSON.parse(error.message));
        return {
          isOk: false,
          errors: errors || FormatErrors(error),
        };
      }
    },
  },
};
