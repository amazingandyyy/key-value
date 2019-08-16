const process = require('process')
const Levelize = require('../../index')
const level = require('level')

const levelize = new Levelize(level)

levelize.connect('levelize-demo-2019', {
  location: process.cwd()
})

const UserShema = levelize.schema({
  username: String,
  password: String,
  email: String
})

const userModel = levelize.model('User', UserShema)

for (let i = 0; i < 10; i++) {
  userModel.createOne({
    username: `amazingandyyy-${i}@gmail.com`, password: `xx${i}xx`
  })
}
userModel.getAll()

userModel.getOne({
  username: `amazingandyyy-3@gmail.com`
}, (err, user) => {
  console.log(err, user)
})
