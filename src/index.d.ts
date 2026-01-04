// For standard CSS
declare module "*.css" {
    const content: { [className: string]: string };
    export default content;
}

// If you use SCSS/SASS
declare module "*.scss" {
    const content: { [className: string]: string };
    export default content;
}
