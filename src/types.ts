class WindowsClass {
    about: boolean = false;
    contact: boolean = false;
    raytracer: boolean = false;
    myteams: boolean = false;
    opengl: boolean = false;
    shadertoy: boolean = false;
    zappy: boolean = false;
    s3: boolean = false;
    projects: boolean = false;
};

export interface Windows extends WindowsClass {};
type WindowsArray = Array<keyof Windows>;

export const WindowsProps = Object.keys(new WindowsClass()) as WindowsArray;
