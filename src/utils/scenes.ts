import { SceneConfig } from "./../lib/types";


export class SceneUtils {

    private defaultScene: string | null | undefined = "";
    private testSceneID = "";

    /**
     * Handles the creation of a specified scene
     *
     * @param  {SceneConfig}     config - The configuration object for the scene to be created
     * @return {Promise<string>}        - A promise that resolves to the ID of the created scene
     */
    async createScene (config: SceneConfig) {
        const testScene = await Scene.createDocuments([config]);
        const { id } = testScene[0];

        this.defaultScene = canvas ? canvas.scene?.id : null;

        await Scene.get(id)?.activate();
        this.testSceneID = id;

        // await new Promise((resolve) => { setTimeout(resolve, 6000); });

        return id;
    }

    /**
     * Handles deletion of the specified scene, activating the default scene beforehand to avoid issues with deleting an active scene.
     *
     * @returns {Promise<string | undefined>} - A promise that resolves to the ID of the deleted scene, or undefined if no scene was deleted.
     */
    async deleteScene () {

        // Activate the default scene before deletion to avoid issues with deleting an active scene
        if (this.defaultScene) {
            await Scene.get(this.defaultScene)?.activate();
        }

        if (!this.testSceneID) {
            console.warn("No test scene ID available for deletion.");
            return;
        }

        await Scene.deleteDocuments([this.testSceneID]);
        return this.testSceneID;
    }

}
