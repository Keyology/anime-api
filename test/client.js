const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

describe("site", () => {

    it("Should have home page", done => {

        chai
            .request("localhost:7000")
            .get("/")
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                res.status.should.be.equal(200);
                return done(); // Call done if the test completed successfully.
            });
    });
});

describe('this is testing the  /docs route', () => {
    it("should redirect to docs", done => {
        chai
            .request("localhost:7000")
            .get('/docs')
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                // res.redirect.should.to("https://keyology.github.io/keyology.notes.github.io/#/")
                res.status.should.be.equal(300);
                return done();
            });
    });

});