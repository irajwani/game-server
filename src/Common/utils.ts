import * as crypto from 'crypto';

export default {
  generateRandomInt: (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  },

  generateToken: () => {
    return crypto
      .createHash('sha1')
      .update(Date.now().toString())
      .digest('hex');
  },
};
