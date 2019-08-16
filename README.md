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
$ git clone git@github.com:amazingandyyy/levelize.git
$ npm i --save levelize
# or
$ yarn add levelize
```

## Usage

```javascript
const level = require('level')
const levelize = require('../../index')
const levelize = new Levelize(level)
const dbName = 'levelize-demo-2019';
levelize.connect('levelize-demo-2019')

const UserShema = new levelize.Schema({ id: String, username: String, passpord: String });
const UserModel = levelize.model('UserShema', UserShema);

UserModel.createOne({ username: 'andy' }, (err, user) {
  if(err)return console.log(err);
  console.log(user)
})

UserModel.findOne({ username }, (err, user) {
  if(err)return console.log(err);
  console.log(user)
})
```

## License

MIT
