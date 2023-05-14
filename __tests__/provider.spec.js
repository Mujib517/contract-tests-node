const { Verifier } = require('@pact-foundation/pact');
const path = require('path');

const app = require('../provider');
const port = 4000;
const server = app.listen(port);

describe("Pact Verification", () => {
    it("validates the expectations of ProductService", () => {
        const opts = {
            logLevel: "INFO",
            providerBaseUrl: "http://localhost:" + port,
            provider: "ProductService",
            providerVersion: "1.0.0",
            pactUrls: [
                path.resolve(__dirname, '../pacts/frontendwebsite-productservice.json')
            ]
        };

        return new Verifier(opts).verifyProvider().then(output => {
            console.log(output);
        }).finally(() => {
            server.close();
        });
    })
});