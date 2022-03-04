// //During the test the env variable is set to test
// process.env.NODE_ENV = "test";

// import chai from "chai";
// import chaiHttp from "chai-http";
// import App from "../app";

// chai.use(chaiHttp);

// describe("/GET book", () => {
//   it("it should GET all the books", done => {
//     chai
//       .request(new App().app)
//       .get("/api/v1/users")
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a("array");
//         res.body.length.should.be.eql(0);
//         done();
//       });
//   });
// });
