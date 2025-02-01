describe('Reqres API Tests', () => {
  const baseURL = 'https://reqres.in/api';
  let samplePayload;

  before(() => {
    cy.fixture('samplePayload').then((data) => {
      samplePayload = data;
    });
  });

  it('should fetch a list of users', () => {
    cy.request('GET', `${baseURL}/users?page=2`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
      expect(Array.isArray(response.body.data)).to.be.true;
    });
  });

  it('should fetch a single user', () => {
    cy.request('GET', `${baseURL}/users/2`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.have.property('id', 2);
    });
  });

  it('should return 404 for a non-existent user', () => {
    cy.request({
      method: 'GET',
      url: `${baseURL}/users/23`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('should create a new user', () => {
    cy.request('POST', `${baseURL}/users`, samplePayload.newUser).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('name', samplePayload.newUser.name);
      expect(response.body).to.have.property('job', samplePayload.newUser.job);
    });
  });

  it('should update a user', () => {
    cy.request('PUT', `${baseURL}/users/2`, samplePayload.updatedUserPut).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name', samplePayload.updatedUserPut.name);
      expect(response.body).to.have.property('job', samplePayload.updatedUserPut.job);
    });
  });

  it('should update a user with PATCH', () => {
    cy.request('PATCH', `${baseURL}/users/2`, samplePayload.updatedUserPatch).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name', samplePayload.updatedUserPatch.name);
      expect(response.body).to.have.property('job', samplePayload.updatedUserPatch.job);
    });
  });

  it('should delete a user', () => {
    cy.request('DELETE', `${baseURL}/users/2`).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  it('should register a user successfully', () => {
    cy.request('POST', `${baseURL}/register`, samplePayload.newUserRegister).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('token');
    });
  });

  it('should fail to register a user', () => {
    cy.request({
      method: 'POST',
      url: `${baseURL}/register`,
      body: samplePayload.failedUserRegister,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error');
    });
  });

  it('should login a user successfully', () => {
    cy.request('POST', `${baseURL}/login`, samplePayload.userLogin).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });

  it('should fail to login a user', () => {
    cy.request({
      method: 'POST',
      url: `${baseURL}/login`,
      body: samplePayload.failedUserLogin,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error');
    });
  });

  it('should fetch a list of resources', () => {
    cy.request('GET', `${baseURL}/unknown`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
      expect(Array.isArray(response.body.data)).to.be.true;
    });
  });

  it('should fetch a single resource', () => {
    cy.request('GET', `${baseURL}/unknown/2`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.have.property('id', 2);
    });
  });

  it('should return 404 for a non-existent resource', () => {
    cy.request({
      method: 'GET',
      url: `${baseURL}/unknown/23`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('should fetch a delayed response', () => {
    cy.request('GET', `${baseURL}/users?delay=3`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
      expect(Array.isArray(response.body.data)).to.be.true;
    });
  });
});