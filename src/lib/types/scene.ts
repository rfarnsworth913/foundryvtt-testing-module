export type SceneConfig = {
    width: number;
    height: number;
    grid: {
        type: CONST.GRID_TYPES;
        size: number;
        distance: number;
        units: string;
    };
    background: {
        src: string;
    };
    name: string;
};
