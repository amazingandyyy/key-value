<h1 align="center">
🎁 levelize
</h1>
<p align="center">
Use leveldb just like mongo.
</p>

<p align="center">
   <a href="https://github.com/amazingandyyy/levelize/blob/master/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-green.svg" />
   </a>
   <a href="https://circleci.com/gh/amazingandyyy/levelize">
      <img src="https://circleci.com/gh/amazingandyyy/levelize.svg?style=svg" />
   </a>
</p>

> open source!


## Installation

```shell
$ npm i --save levelize
# or
$ yarn add levelize
```

## Usage

```javascript
const process = require('process')
const Levelize = require('../../index')
const level = require('level')

const levelize = new Levelize(level, 'levelize-demo-2019', {
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

```

## License

MIT
