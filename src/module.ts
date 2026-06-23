import { SetupTearDown } from "./tests/setup-teardown";

Hooks.on("ready", () => {

    // Testing Initialization -------------------------------------------------
    if (typeof quench === "undefined") {
        return;
    }


    // Testing Setup ----------------------------------------------------------
    quench.registerBatch("testing-module.setup", (context) => {
        SetupTearDown.checkDependencies(context);
        SetupTearDown.createTestScene(context);
    }, { displayName: "Testing Setup" });


    // Cleanup Testing --------------------------------------------------------
    quench.registerBatch("testing-module.cleanup", (context) => {
        SetupTearDown.deleteTestScene(context);
    }, { displayName: "Testing Cleanup" });

});
