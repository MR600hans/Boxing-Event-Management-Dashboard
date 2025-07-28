declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.mp4' {
  const src: string;
  export default src;
}
declare module '*.mov' {
    const src: string;
    export default src;
} 