class WindowsClass {
    about: boolean;
    contact: boolean;
    raytracer: boolean;
    myteams: boolean;
    opengl: boolean;
    shadertoy: boolean;
    zappy: boolean;
    s3: boolean;
    projects: boolean
};

export interface Windows extends WindowsClass {};
type WindowsArray = Array<keyof Windows>;

export const WindowsProps = Object.keys(new WindowsClass()) as WindowsArray;
