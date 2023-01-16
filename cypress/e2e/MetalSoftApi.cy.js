const {payloads} = require("../utils/Constants");
const {commonRequests} = require("../common-requests/CommonRequests");
describe('Interview tests positive scenarios', () => {
    payloads.forEach((obj, index) => {
        //just for the interview purpose, I did a check on each object for each element the response body contains.
        it(`Should get a resource for user ${obj.id}'`, () => {
            cy.request(
                {
                    failOnStatusCode: false,
                    method: 'GET',
                    url: `https://jsonplaceholder.typicode.com/posts/${obj.id}`,
                }
            ).then((response) => {
                switch (obj.userId) {
                    case 1:
                        expect(response.status).to.deep.equal(200);
                        expect(response.body.userId).to.deep.equal(1);
                        expect(response.body.id).to.be.closeTo(1, 10);
                        expect(response.body.title).to.contain(payloads[index].title);
                        expect(response.body).to.contain(payloads[index]);
                        break;
                    case 2:
                        expect(response.status).to.deep.equal(200);
                        expect(response.body.userId).to.deep.equal(2);
                        expect(response.body.id).to.be.closeTo(11, 20);
                        expect(response.body.title).to.contain(payloads[index].title);
                        expect(response.body).to.contain(payloads[index]);
                        break;
                    case 3:
                        expect(response.status).to.deep.equal(200);
                        expect(response.body.userId).to.deep.equal(3);
                        expect(response.body.id).to.be.closeTo(21, 30);
                        expect(response.body.title).to.contain(payloads[index].title);
                        expect(response.body).to.contain(payloads[index]);
                        break;
                    case 4:
                        expect(response.status).to.deep.equal(200);
                        expect(response.body.userId).to.deep.equal(4);
                        expect(response.body.id).to.be.closeTo(31, 40);
                        expect(response.body.title).to.contain(payloads[index].title);
                        expect(response.body).to.contain(payloads[index]);
                        break;
                    case 5:
                        expect(response.status).to.deep.equal(200);
                        expect(response.body.userId).to.deep.equal(5);
                        expect(response.body.id).to.be.closeTo(41, 50);
                        expect(response.body.title).to.contain(payloads[index].title);
                        expect(response.body).to.contain(payloads[index]);
                        break;
                    case 6:
                        expect(response.status).to.deep.equal(200);
                        expect(response.body.userId).to.deep.equal(6);
                        expect(response.body.id).to.be.closeTo(51, 60);
                        expect(response.body.title).to.contain(payloads[index].title);
                        expect(response.body).to.contain(payloads[index]);
                        break;
                    case 7:
                        expect(response.status).to.deep.equal(200);
                        expect(response.body.userId).to.deep.equal(7);
                        expect(response.body.id).to.be.closeTo(61, 70);
                        expect(response.body.title).to.contain(payloads[index].title);
                        expect(response.body).to.contain(payloads[index]);
                        break;
                    case 8:
                        expect(response.status).to.deep.equal(200);
                        expect(response.body.userId).to.deep.equal(8);
                        expect(response.body.id).to.be.closeTo(71, 80);
                        expect(response.body.title).to.contain(payloads[index].title);
                        expect(response.body).to.contain(payloads[index]);
                        break;
                    case 9:
                        expect(response.status).to.deep.equal(200);
                        expect(response.body.userId).to.deep.equal(9);
                        expect(response.body.id).to.be.closeTo(81, 90);
                        expect(response.body.title).to.contain(payloads[index].title);
                        expect(response.body).to.contain(payloads[index]);
                        break;
                    case 10:
                        expect(response.status).to.deep.equal(200);
                        expect(response.body.userId).to.deep.equal(10);
                        expect(response.body.id).to.be.closeTo(91, 100);
                        expect(response.body.title).to.contain(payloads[index].title);
                        expect(response.body).to.contain(payloads[index]);
                        break;
                }
            });
        })
    })

    it('Should list a resource', () => {
        cy.request(
            {
                failOnStatusCode: false,
                method: 'GET',
                url: `https://jsonplaceholder.typicode.com/posts`,
            }
        ).then((response) => {
            expect(response.status).to.deep.equal(200);
            expect(response.body).to.deep.equal(payloads)
        })
    })

    it('Should create a resource', () => {
        commonRequests.createResource(11)
    })

    it('Should update a resource', () => {
        commonRequests.updateResource(
            1,
            'foo updated',
            'bar updated',
            11, 'foo updated',
            'bar updated');
        commonRequests.updateResource(
            1,
            'foo',
            'bar',
            11, 'foo',
            'bar')
    })


    it('Should patch a resource', () => {
        commonRequests.patchResource(11, 'foo patched')
        commonRequests.patchResource(11, 'foo')
    });

    it('Should delete a resource', () => {
        commonRequests.deleteResource(100)
        commonRequests.createResource(100)
    });
})

describe('Interview tests negative scenarios', () => {
    it('Should attempt to GET a resource that does not exist ', () => {
        cy.request(
            {
                failOnStatusCode: false,
                method: 'GET',
                url: `https://jsonplaceholder.typicode.com/posts/nonExistingUser`,
            }
        ).then((response) => {
            expect(response.status).to.deep.equal(404)
        })
    });

    it('Should attempt to CREATE a resource and use bad data', () => {
        cy.request(
            {
                failOnStatusCode: false,
                method: 'POST',
                url: `https://jsonplaceholder.typicode.com/posts`,
                body: {
                    title: 23 + 'string' + 'symbols!@#$%^&*(',
                    body: '', //empty body
                    userId: '', //empty id
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            }).then((response) => {
                cy.log(response.body.title);
                cy.log(response.body.body);
                cy.log(response.body.userId);
                //there are no validations for this API
        });
    });

    it('Should attempt to UPDATE a resource that does not exist', () => {
        let nonExistingUser = Cypress._.random(0, 1e9);
        cy.request(
            {
                failOnStatusCode: false,
                method: 'PUT',
                url: `https://jsonplaceholder.typicode.com/posts/${nonExistingUser}`,
                body: {
                    id: 1,
                    title: 'foo',
                    body: 'bar',
                    userId: 1,
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            }).then((response) => {
            cy.log(response.status.toString())
            //status should not be 500, should have a dedicated error
        });
    });

    it('Should attempt to PATCH a user that does not exist', () => {
        let nonExistingUser = Cypress._.random(0, 1e9);
        cy.request(
            {
                failOnStatusCode: false,
                method: 'PATCH',
                url: `https://jsonplaceholder.typicode.com/posts/${nonExistingUser}`,
                body: {
                    id: 1,
                    title: 'foo',
                    body: 'bar',
                    userId: 1,
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            }).then((response) => {
            cy.log(response.status.toString())
            //status should not be 200, should have a dedicated error
        });
    });
})
