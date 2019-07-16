const assert = require("assert");
const User = require("../src/user");

describe("Updating records ", done => {
  let joe;
  beforeEach(done => {
    joe = new User({ name: "Joe" });
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
    assertName(joe.update({ name: "Alex" }), done);
  });
  it("A modal class can update", done => {
    assertName(User.update({ name: "Joe" }, { name: "Alex" }), done);
  });
  it("A modal class can update on record", done => {
    assertName(User.updateOne({ name: "Joe" }, { name: "Alex" }), done);
  });
  it("A modal class can find a record with an id and update", done => {
    assertName(User.findByIdAndUpdate(joe._id, { name: "Alex" }), done);
  });
});
