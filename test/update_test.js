const assert = require("assert");
const User = require("../src/user");

describe("Updating records ", done => {
  let joe;
  beforeEach(done => {
    joe = new User({ name: "Joe", likes: 0 });
    joe.save().then(() => done());
  });
  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  }
  it("instance type using set and save", done => {
    joe.set("name", "Alex");
    assertName(joe.save(), done);
  });
  it("A modal instance can update", done => {
    assertName(joe.updateOne({ name: "Alex" }), done);
  });
  it("A modal class can update", done => {
    assertName(User.updateMany({ name: "Joe" }, { name: "Alex" }), done);
  });
  it("A modal class can update on record", done => {
    assertName(User.findOneAndUpdate({ name: "Joe" }, { name: "Alex" }), done);
  });
  it("A modal class can find a record with an id and update", done => {
    assertName(User.findByIdAndUpdate(joe._id, { name: "Alex" }), done);
  });
  it("A user can have their likes incremented by 1", done => {
    User.updateMany({ name: "Joe" }, { $inc: { likes: 1 } })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user.likes === 1);
        done();
      });
  });
});
