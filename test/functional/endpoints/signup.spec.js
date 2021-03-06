describe('Signup route', () => {
  before(done => {
    app.db.sequelize.sync().then(() => {
      done();
    });
  });

  it('should create a user', done => {
    request.post('/signup')
      .send({
        name: 'Jhon due',
        email: 'jhondue@gmail.com',
        password: '123456',
        zipcode: '04429280',
      })
      .expect(201)
      .end((err, res) => {
        const expectedResult = { message: 'User created' };
        assert.deepEqual(res.body, expectedResult);
        done(err);
      });
  });

  it('should return invalid parameter', done => {
    request.post('/signup')
      .expect(400)
      .end((err, res) => {
        const expectedResult = { message: 'Invalid parameters' };
        assert.deepEqual(res.body, expectedResult);
        done(err);
      });
  });

  it('should return address not found', done => {
    request.post('/signup')
      .send({
        name: 'Jhon due',
        email: 'jhondue@gmail.com',
        password: '123456',
        zipcode: '00000',
      })
      .expect(400)
      .end((err, res) => {
        const expectedResult = { message: 'Address not found' };
        assert.deepEqual(res.body, expectedResult);
        done(err);
      });
  });
});
