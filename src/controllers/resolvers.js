const jwt = require('jsonwebtoken');

const signup = async (_, { username, password }, { User }) => {
  const user = new User({ username, password });
  await user.save();
  return user;
};

const login = async (_, { username, password }, { User }) => {
  const user = await User.findOne({ username, password });
  if (!user) {
    throw new Error('Invalid login credentials');
  }
  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
};

module.exports = {
  signup,
  login,
};
