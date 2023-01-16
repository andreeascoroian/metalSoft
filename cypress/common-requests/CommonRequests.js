import {payloads} from "../utils/Constants";

export class CommonRequests {
    updateResource(userIdToBeUpdated, title, body, userId, expectedTitle, expectedBody) {
        cy.request(
            {
                failOnStatusCode: false,
                method: 'PUT',
                url: `https://jsonplaceholder.typicode.com/posts/${userIdToBeUpdated}`,
                body: {
                    title: title,
                    body: body,
                    userId: userId,
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            }).then((response) => {
            expect(response.status).to.deep.equal(200);
            expect(response.body.id).to.deep.equal(userIdToBeUpdated)
            expect(response.body.userId).to.deep.equal(userId);
            expect(response.body.title).to.contain(expectedTitle);
            expect(response.body.body).to.contain(expectedBody);
        });
    };

    patchResource(userIdToBeUpdated, title) {
        cy.request(
            {
                failOnStatusCode: false,
                method: 'PATCH',
                url: `https://jsonplaceholder.typicode.com/posts/${userIdToBeUpdated}`,
                body: {
                    title: title,
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            }).then((response) => {
            expect(response.status).to.deep.equal(200);
            expect(response.body.id).to.deep.equal(userIdToBeUpdated);
            expect(response.body.title).to.contain(title);
        });
    };

    deleteResource(idOfUserToBeDeleted) {
        cy.request(
            {
                failOnStatusCode: false,
                method: 'DELETE',
                url: `https://jsonplaceholder.typicode.com/posts/${idOfUserToBeDeleted}`,
            }).then((response) => {
                //status code should have been 204
            expect(response.status).to.deep.equal(200);
        });
    };

    createResource(userIdToBeCreated) {
        cy.request(
            {
                failOnStatusCode: false,
                method: 'POST',
                url: `https://jsonplaceholder.typicode.com/posts`,
                body: {
                    title: 'foo',
                    body: 'bar',
                    userId: userIdToBeCreated,
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            }).then((response) => {
            expect(response.status).to.deep.equal(201);
            expect(response.body.id).to.deep.equal(101);
            expect(response.body.userId).to.deep.equal(userIdToBeCreated);
            expect(response.body.title).to.contain('foo');
            expect(response.body.body).to.contain('bar');
        });
    };
}

export const commonRequests = new CommonRequests();
