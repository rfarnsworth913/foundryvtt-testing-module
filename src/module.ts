Hooks.on("ready", () => {
    if (typeof quench === "undefined") return;

    // @ts-ignore
    defaultScene = canvas.scene?.id || null;

    quench.registerBatch("testing-module.example", (context) => {
            const { describe, it, assert } = context;

            describe("Passing Suite", function () {
                it("Passing Test", function () {
                    assert.ok(true);
                });
            });
        },
        { displayName: "QUENCH: Basic Passing Test" },
    );

    // Testing Setup ----------------------------------------------------------
    quench.registerBatch("testing-module.setup", (context) => {
        checkDependencies(context);
        createTestScene(context);
    }, { displayName: "Testing Setup" });

    // Test Category ----------------------------------------------------------

    // Cleanup Testing --------------------------------------------------------
    quench.registerBatch("testing-module.cleanup", (context) => {
        deleteTestScene(context);
     }, { displayName: "Testing Cleanup" });

});


function checkDependencies (context) {
    const { describe, it, assert } = context;

    describe("Check for Testing Module Dependencies", () => {
        it("should have all required modules available and active", () => {

            assert.ok(game.modules?.get("midi-qol")?.active, "MIDI-QOL must be active for testing-module to work properly.");
            assert.ok(game.modules?.get("shared-compendiums")?.active, "Shared Compendiums must be active for testing-module to work properly.");

        });
    });

}

let testSceneData: any | null = null;
// @ts-ignore
let defaultScene: any | null = null;

function createTestScene (context) {
    const { describe, it, assert } = context;

    describe("It should create a test scene", () => {
        it("should create a test scene and activate it", async () => {

            const backgroundURL = "assets/maps/battle-maps/urban/colosseum%20of%20challenges/G_Colosseum_Original_Day.jpg";
            // @ts-ignore
            const { width, height } = await foundry.canvas.loadTexture(backgroundURL);

            const data = {
                width,
                height,
                grid: {
                    type: CONST.GRID_TYPES.SQUARE,
                    size: 100,
                    distance: 5,
                    units: "ft",
                },
                background: {
                    src: backgroundURL
                },
                name: "Testing Module Scene",
            };

            testSceneData = await Scene.createDocuments([data]);
            const id = testSceneData[0].id;
            await Scene.get(id)?.activate();

            assert.ok(Scene.get(id)?.active, "The test scene should be active.");
        });

    });
}

function deleteTestScene (context) {
    const { describe, it, assert } = context;

    describe("It should delete the test scene", () => {
        it("should delete the test scene", async () => {
            if (defaultScene) {
                await Scene.get(defaultScene)?.activate();
            }

            if (!testSceneData) {
                assert.skip("Test scene data is not available, skipping deletion test.");
                return;
            }

            const id = testSceneData[0].id;
            await Scene.deleteDocuments([id]);
            assert.ok(!Scene.get(id), "The test scene should be deleted.");
        });
    });
}
