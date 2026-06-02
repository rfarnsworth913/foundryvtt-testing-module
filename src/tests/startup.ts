export function checkDependencies (context) {
    const { describe, it, assert } = context;

    describe("Check for Testing Module Dependencies", () => {
        it("should have all required modules available and active", () => {

            assert.ok(game.modules?.get("midi-qol")?.active, "MIDI-QOL must be active for testing-module to work properly.");

        });
    });

}
