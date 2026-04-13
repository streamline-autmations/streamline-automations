declare module 'sheryjs' {
  export interface ImageEffectConfig {
    [key: string]: { value: number; range?: [number, number] };
  }

  export interface ImageEffectOptions {
    style?: number;
    config?: ImageEffectConfig;
    gooey?: boolean;
    infiniteGooey?: boolean;
    growSize?: number;
    durationOut?: number;
    durationIn?: number;
    ease?: string;
    ysr?: number;
    zIndex?: number;
  }

  const Shery: {
    imageEffect(selector: string, options?: ImageEffectOptions): void;
    makeMagnet(selector: string, options?: Record<string, unknown>): void;
    mouseFollower(options?: Record<string, unknown>): void;
    hoverWithMediaCircle(selector: string, options?: Record<string, unknown>): void;
  };

  export default Shery;
}
