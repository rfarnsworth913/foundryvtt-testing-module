import { SceneUtils } from "./../utils/scenes";

import { SceneConfig } from "./../lib/types";

export class SetupTearDown {

    private static sceneUtils = new SceneUtils();

    /**
     * Handles checking for the presence and activation of required dependencies for the testing module.
     *
     * @param context - The testing context provided by Quench.
     */
    static checkDependencies (context: any) {
        const { describe, it, assert } = context;

        describe("Check for Testing Module Dependencies", () => {
            it("should have all required modules available and active", () => {

                assert.ok(game.modules?.get("midi-qol")?.active, "MIDI-QOL must be active for testing-module to work properly.");
                assert.ok(game.modules?.get("shared-compendiums")?.active, "Shared Compendiums must be active for testing-module to work properly.");

            });
        });
    }

    static createTestScene (context: any) {
        const { describe, it, assert } = context;

        describe("It should create a test scene", () => {
            it("should create a test scene and activate it", async () => {
                const backgroundURL = "assets/maps/battle-maps/urban/colosseum%20of%20challenges/G_Colosseum_Original_Day.jpg";

                // @ts-expect-error - TypeScript doesn't recognize the loadTexture method on the canvas, but it exists in Foundry VTT.
                const { width, height } = await foundry.canvas.loadTexture(backgroundURL);

                const sceneData: SceneConfig = {
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

                const id = await SetupTearDown.sceneUtils.createScene(sceneData);
                assert.ok(Scene.get(id)?.active, "The test scene should be active.");
            });
        });
    }

    static deleteTestScene (context: any) {
        const { describe, it, assert } = context;

        describe("It should delete the test scene", () => {
            it("should delete the test scene", async () => {
                const deletedSceneID = await SetupTearDown.sceneUtils.deleteScene();
                assert.ok(!Scene.get(deletedSceneID ?? ""), "The test scene should be deleted.");
            });
        });
    }

}
