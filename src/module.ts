Hooks.on("ready", () => {
    if (typeof quench === "undefined") return;
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
});
