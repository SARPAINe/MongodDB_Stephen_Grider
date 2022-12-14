const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

//difference between before and beforeeach-
// before only executed once time for your entire test suite

before((done) => {
    mongoose.connect("mongodb://localhost/users_test");
    //once and on are event handlers
    mongoose.connection
        .once("open", () => {
            console.log("Good to go!");
            done();
        })
        .on("error", (error) => {
            console.warn("warning", error);
        });
});

beforeEach((done) => {
    mongoose.connection.dropCollection("users", () => {
        // Ready to run the next test!
        mongoose.connection.dropCollection("comments", () => {
            mongoose.connection.dropCollection("blopPosts", () => {
                done();
            });
        });
    });
});

// beforeEach((done) => {
//     const { users, comments, blogposts } = mongoose.connection.collections;
//     users.drop(() => {
//         comments.drop(() => {
//             blogposts.drop(() => {
//                 done();
//             });
//         });
//     });
// });

after((done) => {
    mongoose.connection.close(() => {
        done();
    });
});
