const supertest = require('supertest');
const app = require('../app');
const agent = supertest.agent(app);
const { sequelize } = require('../models');
const { describe } = require('../models/review');

beforeAll(async () => {
  if (process.env.NODE_ENV === 'test') await sequelize.sync();
  else throw new Error('NODE_ENV가 test 환경으로 설정되어 있지 않습니다.');
});

describe('POST /', () => {
  beforeEach((done) => {
    agent.get('/kakao/callback').query({ code: '' }).end(done);
  });

  test('게시글 작성', (done) => {
    agent
      .post('/posts')
      .set('Content-Type', 'mulipart/form-data')
      .attach('postImage', './uploadtest.png')
      .field('postLocation1', '서울특별시')
      .field('postLocation2', '강남구')
      .field('title', '강남제목1')
      .field('content', '강남내용1')
      .expect(200, done)
      .end();
  });
});
afterAll(async () => {
  if (process.env.NODE_ENV === 'test') await sequelize.sync({ force: true });
  else throw new Error('NODE_ENV가 test 환경으로 설정되어 있지 않습니다.');
});
