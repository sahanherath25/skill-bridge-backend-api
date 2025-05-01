
# 🧪 Chai `expect` Cheat Sheet for Objects and Arrays of Objects

## ✅ For an Object

```js
const obj = { name: 'Alice', age: 25 };
```

| Purpose                         | Example                                             |
|----------------------------------|-----------------------------------------------------|
| Check existence                  | `expect(obj).to.exist;`                             |
| Check type                       | `expect(obj).to.be.an('object');`                  |
| Check key exists                 | `expect(obj).to.have.property('name');`            |
| Check multiple keys              | `expect(obj).to.include.all.keys('name', 'age');`  |
| Check key with specific value    | `expect(obj).to.have.property('name', 'Alice');`   |
| Partial deep match               | `expect(obj).to.deep.include({ age: 25 });`        |
| Exact match                      | `expect(obj).to.deep.equal({ name: 'Alice', age: 25 });` |
| Negation                         | `expect(obj).to.not.have.property('email');`       |

---

## ✅ For an Array of Objects

```js
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 }
];
```

| Purpose                         | Example                                                      |
|----------------------------------|--------------------------------------------------------------|
| Check existence                  | `expect(users).to.exist;`                                    |
| Check array type                 | `expect(users).to.be.an('array');`                           |
| Check array length               | `expect(users.length).to.equal(2);`                          |
| Check array not empty            | `expect(users).to.have.length.above(0);`                     |
| Check array includes object      | `expect(users).to.deep.include({ name: 'Alice', age: 25 });` |
| Check object in specific index   | `expect(users[0]).to.have.property('name', 'Alice');`        |
| Check every item has key         | `users.forEach(user => expect(user).to.have.property('name'));` |
| Check contains all keys          | `expect(users[0]).to.include.all.keys('name', 'age');`       |
| Negate presence                  | `expect(users).to.not.deep.include({ name: 'Eve' });`        |

---

## 🔄 Common `.not` Usage

| Description                     | Example                                           |
|----------------------------------|---------------------------------------------------|
| Not equal                        | `expect(obj.name).to.not.equal('Bob');`          |
| Not have property                | `expect(obj).to.not.have.property('email');`     |
| Not include object in array      | `expect(users).to.not.deep.include({ name: 'Eve' });` |
