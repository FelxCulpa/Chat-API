const mongoose = require('mongoose');
const crypto = require('crypto');
const config = require('config');

const userSchema = new mongoose.Schema({
  username: {
  	type: String,
  	unique: 'User with this name already exists',
  	required: "Please, enter username",
  	validate: [
			{
				validator: value => /^[0-9a-zA-Z]+$/.test(value),
				msg:'Username should contains only letters and numbers'
			}
			]
  },
  passwordHash: String,
  salt: String,
}, {
  timestamps: true
});

userSchema.virtual('password')
.set(function (password) {
  this._plainPassword = password;
  if (password) {
    this.salt = crypto.randomBytes(128).toString('base64');
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
  } else {
    this.salt = undefined;
    this.passwordHash = undefined;
  }
})

.get(function () {
  return this._plainPassword;
});

userSchema.methods.checkPassword = function (password) {
  if (!password) return false;
  if (!this.passwordHash) return false;
  return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash;
};

module.exports = mongoose.model('User', userSchema);