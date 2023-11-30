import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import sinon from 'sinon';
import { ToDoModel } from '@models/todo.model';
import { ToDoInterface } from '@/interfaces/todo.interface';
import { X_API_KEY } from '@/config';

const sandbox = sinon.createSandbox();

chai.use(chaiHttp);

describe('task', () => {
  beforeEach(() => {
    sandbox.stub(ToDoModel, 'create').callsFake(async (data: ToDoInterface) => {
      const modelInstance = new ToDoModel(data);
      const validationError = modelInstance.validateSync();
      if (validationError) {
        return Promise.reject(validationError);
      }
      return { message: 'fake data' };
    });
  });

  afterEach(() => sandbox.restore());

  it('Get /tasks', function (done) {
    this.timeout(10000);
    chai
      .request(server.getServer())
      .get('/todo/tasks')
      .set('x-api-key', X_API_KEY)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          chai.expect(res).to.have.status(200);
          chai.expect(res.body.data).to.be.an('array').that.is.not.an('object');
          done();
        }
      });
  });

  it('Post /task', function (done) {
    this.timeout(10000);
    chai
      .request(server.getServer())
      .post('/todo/create')
      .set('x-api-key', X_API_KEY)
      .send({ title: 'From test cases stub' })
      .end((err, res) => {
        if (err) {
          done(err);
        } else if (res.statusCode !== 200) {
          done(new Error(res.body.message));
        } else {
          console.log(res.body);
          done();
        }
      });
  });
});
