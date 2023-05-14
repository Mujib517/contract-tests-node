const path = require("path");
const { PactV3, MatchersV3, SpecificationVersion, } = require("@pact-foundation/pact");
const { get, getById } = require('../consumer');
const { eachLike, like } = MatchersV3;

const provider = new PactV3({
    consumer: "FrontendWebsite",
    provider: "ProductService",
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    logLevel: "warn",
    dir: path.resolve(process.cwd(), "pacts"),
    spec: SpecificationVersion.SPECIFICATION_VERSION_V2,
});

describe("API Pact test", () => {
    describe("getting all products", () => {
        test("products exists", async () => {
            await provider.addInteraction({
                states: [{ description: "product exist" }],
                uponReceiving: "get all products",
                withRequest: {
                    method: "GET",
                    path: "/api/products",
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: eachLike({
                        id: 1,
                        brand: "Apple",
                        model: "Iphone 13",
                        price: 1000
                    }),
                },
            });

            await provider.executeTest(async (mockService) => {
                const res = await get(mockService.url);

                expect(res.data).toStrictEqual([
                    { id: 1, brand: "Apple", model: "Iphone 13", price: 1000 },
                ]);
            });
        });
    });

    describe("getting one product", () => {
        test("ID 1 exists", async () => {
            await provider.addInteraction({
                states: [{ description: "product with ID 10 exists" }],
                uponReceiving: "get product with ID 10",
                withRequest: {
                    method: "GET",
                    path: "/api/products/1",
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: like({
                        id: 1,
                        brand: "Apple",
                        model: "Iphone 13",
                        price: 1000
                    }),
                },
            });

            await provider.executeTest(async (mockService) => {
                const res = await getById(1, mockService.url);

                expect(res.data).toStrictEqual({
                    id: 1,
                    brand: "Apple",
                    model: "Iphone 13",
                    price: 1000
                });
            });
        });
    });
});