import FormatErrors from '../../FormatErrors';
import User from '../../models/User';
import { requireUser } from '../../services/auth';

export default {
  User: {},
  Me: {},
  Query: {
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
        return await requireUser(user);
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    register: async (_, args) => {
      try {
        const user = await User.create(args);
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
              path: 'user',
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
  },
};
