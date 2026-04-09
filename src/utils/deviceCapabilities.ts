// Device capability detection for optimal animation performance
export interface DeviceCapabilities {
  tier: 'high' | 'medium' | 'low';
  hasTouch: boolean;
  prefersReducedMotion: boolean;
  pixelRatio: number;
  gpuTier: number;
  fps: number;
}

class FPSMonitor {
  private lastTime: number = performance.now();
  private frames: number = 0;
  private fps: number = 60;

  update(): number {
    this.frames++;
    const currentTime = performance.now();
    
    if (currentTime >= this.lastTime + 1000) {
      this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
      this.frames = 0;
      this.lastTime = currentTime;
    }
    
    return this.fps;
  }

  getFPS(): number {
    return this.fps;
  }
}

export const fpsMonitor = new FPSMonitor();

function detectGPUTier(): number {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  if (!gl) return 1;
  
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  if (!debugInfo) return 2;
  
  const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
  
  // High-end GPUs
  if (/NVIDIA|AMD|Radeon|GeForce|RTX|GTX/i.test(renderer)) return 3;
  // Integrated/mobile GPUs
  if (/Intel|Mali|Adreno|PowerVR/i.test(renderer)) return 2;
  
  return 1;
}

export function getDeviceCapabilities(): DeviceCapabilities {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for performance
  const gpuTier = detectGPUTier();
  
  // Simple performance scoring
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const memoryGB = (navigator as any).deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;
  
  let tier: 'high' | 'medium' | 'low';
  
  if (prefersReducedMotion) {
    tier = 'low';
  } else if (gpuTier >= 3 && memoryGB >= 8 && cores >= 4) {
    tier = 'high';
  } else if (gpuTier >= 2 && memoryGB >= 4 && cores >= 2) {
    tier = 'medium';
  } else {
    tier = 'low';
  }
  
  // Adjust for mobile devices
  if (hasTouch && window.innerWidth < 768) {
    if (tier === 'high') tier = 'medium';
    if (tier === 'medium' && memoryGB < 3) tier = 'low';
  }
  
  return {
    tier,
    hasTouch,
    prefersReducedMotion,
    pixelRatio,
    gpuTier,
    fps: 60 // Will be updated dynamically
  };
}

// Settings based on device capabilities
export function getAnimationSettings(capabilities: DeviceCapabilities) {
  const { tier, hasTouch, prefersReducedMotion } = capabilities;
  
  if (prefersReducedMotion) {
    return {
      particleCount: 0, // Disable particles
      fps: 30,
      trail: false,
      effects: false,
      enabled: false
    };
  }
  
  switch (tier) {
    case 'high':
      return {
        particleCount: hasTouch ? 3000 : 5000,
        fps: 60,
        trail: true,
        effects: true,
        pixelSteps: hasTouch ? 2 : 1,
        particleSize: hasTouch ? 4 : 5, // Increased for better visibility
        enabled: true
      };
    case 'medium':
      return {
        particleCount: hasTouch ? 2000 : 3000,
        fps: 30,
        trail: true,
        effects: false,
        pixelSteps: hasTouch ? 3 : 2,
        particleSize: hasTouch ? 3.5 : 4, // Increased for better visibility
        enabled: true
      };
    case 'low':
      return {
        particleCount: hasTouch ? 1000 : 1500,
        fps: 30,
        trail: false,
        effects: false,
        pixelSteps: hasTouch ? 5 : 4,
        particleSize: 3, // Increased for better visibility
        enabled: true
      };
    default:
      return {
        particleCount: 0,
        fps: 30,
        trail: false,
        effects: false,
        enabled: false
      };
  }
}