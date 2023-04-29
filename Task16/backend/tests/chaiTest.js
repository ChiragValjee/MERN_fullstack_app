const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('blog status', function(){
    it('status', function(done){
        chai.request('http://localhost:8080')
            .get('/api/blog')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('blog put status', function(){
    it('status', function(done){
        chai.request('http://localhost:8080')
            .post('/api/blog')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('delete all blogs status', function(){
    it('status', function(done){
        chai.request('http://localhost:8080')
            .delete('/api/blog')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });
});




