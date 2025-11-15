import { desktopCapturer, NativeImage } from 'electron';
import EventEmitter from 'events';

interface CaptureMetadata {
  timestamp: number;
  windowName: string;
  size: { width: number; height: number };
}

interface CaptureBuffer {
  image: NativeImage;
  metadata: CaptureMetadata;
}

export class ScreenCaptureService extends EventEmitter {
  private captureBuffer: CaptureBuffer[] = [];
  private readonly maxBufferSize = 3;
  private readonly targetWindowName = 'The Bazaar';
  private captureInterval: NodeJS.Timeout | null = null;
  private readonly captureIntervalMs = 3000; // 3 seconds
  private isCapturing = false;

  constructor() {
    super();
  }

  /**
   * Start automatic screen capture at configured interval
   */
  public startCapture(): void {
    if (this.isCapturing) {
      console.warn('⚠️ Screen capture already running');
      return;
    }

    console.log(`📸 Starting screen capture service (interval: ${this.captureIntervalMs}ms)`);
    this.isCapturing = true;

    // Immediate first capture
    this.captureWindow();

    // Setup periodic capture
    this.captureInterval = setInterval(() => {
      this.captureWindow();
    }, this.captureIntervalMs);
  }

  /**
   * Stop automatic screen capture
   */
  public stopCapture(): void {
    if (this.captureInterval) {
      clearInterval(this.captureInterval);
      this.captureInterval = null;
    }
    this.isCapturing = false;
    console.log('🛑 Screen capture service stopped');
  }

  /**
   * Get the most recent screenshot
   */
  public getLastScreenshot(): CaptureBuffer | null {
    return this.captureBuffer[this.captureBuffer.length - 1] || null;
  }

  /**
   * Get all buffered screenshots
   */
  public getAllScreenshots(): CaptureBuffer[] {
    return [...this.captureBuffer];
  }

  /**
   * List all available windows
   */
  public async listAvailableWindows(): Promise<Electron.DesktopCapturerSource[]> {
    const sources = await desktopCapturer.getSources({
      types: ['window'],
      thumbnailSize: { width: 0, height: 0 }, // Don't need thumbnails for listing
    });

    console.log(`🪟 Found ${sources.length} available windows:`);
    sources.forEach(source => {
      console.log(`  - ${source.name} (id: ${source.id})`);
    });

    return sources;
  }

  /**
   * Capture screenshot from The Bazaar window
   */
  private async captureWindow(): Promise<void> {
    const startTime = Date.now();

    try {
      // Get all window sources
      const sources = await desktopCapturer.getSources({
        types: ['window'],
        thumbnailSize: { width: 1280, height: 720 }, // Optimized size for performance
      });

      // Find The Bazaar window
      const targetWindow = sources.find(source => 
        source.name.toLowerCase().includes(this.targetWindowName.toLowerCase())
      );

      if (!targetWindow) {
        // Only log once per minute to avoid spam
        if (Math.random() < 0.05) { // ~5% of the time (once every ~20 captures = 1 min)
          console.log(`⏭️ Window "${this.targetWindowName}" not found, skipping capture`);
        }
        return;
      }

      const thumbnail = targetWindow.thumbnail;
      const size = thumbnail.getSize();
      const captureTime = Date.now() - startTime;

      // Create capture metadata
      const metadata: CaptureMetadata = {
        timestamp: Date.now(),
        windowName: targetWindow.name,
        size: { width: size.width, height: size.height },
      };

      // Add to buffer (circular buffer logic)
      this.captureBuffer.push({ image: thumbnail, metadata });
      if (this.captureBuffer.length > this.maxBufferSize) {
        this.captureBuffer.shift(); // Remove oldest
      }

      console.log(
        `📸 Captured: ${targetWindow.name} | ` +
        `${size.width}x${size.height} | ` +
        `${captureTime}ms | ` +
        `Buffer: ${this.captureBuffer.length}/${this.maxBufferSize}`
      );

      // Emit event for listeners
      this.emit('capture', { image: thumbnail, metadata });

      // Warn if capture is too slow
      if (captureTime > 200) {
        console.warn(`⚠️ Slow capture detected: ${captureTime}ms (target: <200ms)`);
      }

    } catch (error) {
      console.error('❌ Screen capture error:', error);
      this.emit('error', error);
    }
  }

  /**
   * Get capture statistics
   */
  public getStats(): { bufferSize: number; isCapturing: boolean; interval: number } {
    return {
      bufferSize: this.captureBuffer.length,
      isCapturing: this.isCapturing,
      interval: this.captureIntervalMs,
    };
  }
}
