const mongoose = require("mongoose");

before(done => {
  mongoose.connect("mongodb://localhost/users_test", {
    useNewUrlParser: true
  });
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", error => {
      console.warn("Warning", error);
    });
});

beforeEach(done => {
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});
