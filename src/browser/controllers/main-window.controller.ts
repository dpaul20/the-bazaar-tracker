import { ipcMain, BrowserWindow } from 'electron';
import { GameEventsService } from '../services/gep.service';
import path from 'node:path';
import { ScreenCaptureService } from '../services/screen-capture.service';

/**
 *
 */
export class MainWindowController {
  private browserWindow: BrowserWindow = null;

  /**
   *
   */
  constructor(
    private readonly gepService: GameEventsService,
    private readonly screenCaptureService: ScreenCaptureService
  ) {
    this.registerToIpc();

    gepService.on('log', this.printLogMessage.bind(this));
  }

  /**
   *
   */
  public printLogMessage(message: string, ...args: any[]) {
    if (this.browserWindow?.isDestroyed() ?? true) {
      return;
    }
    this.browserWindow?.webContents?.send('console-message', message, ...args);
  }

  //----------------------------------------------------------------------------
  // Removed Overwolf package manager error handlers as part of demo cleanup

  /**
   *
   */
  public createAndShow(showDevTools: boolean) {
    this.browserWindow = new BrowserWindow({
      width: 900,
      height: 900,
      show: true,
      webPreferences: {
        // NOTE: nodeIntegration and contextIsolation are only required for this
        // specific demo app, they are not a neceassry requirement for any other
        // ow-electron applications
        nodeIntegration: true,
        contextIsolation: true,
        devTools: showDevTools,
        // relative to root folder of the project
        preload: path.join(__dirname, '../preload/preload.js'),
      },
    });

    this.browserWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  /**
   *
   */
  private registerToIpc() {
    // Removed OSR/exclusive and overlay-related IPC handlers

    // Screen capture IPC handlers
    ipcMain.handle('screen-capture:start', async () => {
      this.screenCaptureService.startCapture();
      return { success: true };
    });

    ipcMain.handle('screen-capture:stop', async () => {
      this.screenCaptureService.stopCapture();
      return { success: true };
    });

    ipcMain.handle('screen-capture:get-last', async () => {
      const capture = this.screenCaptureService.getLastScreenshot();
      if (!capture) {
        return null;
      }
      return {
        dataURL: capture.image.toDataURL(),
        metadata: capture.metadata,
      };
    });

    ipcMain.handle('screen-capture:get-all', async () => {
      const captures = this.screenCaptureService.getAllScreenshots();
      return captures.map(c => ({
        dataURL: c.image.toDataURL(),
        metadata: c.metadata,
      }));
    });

    ipcMain.handle('screen-capture:list-windows', async () => {
      return await this.screenCaptureService.listAvailableWindows();
    });

    ipcMain.handle('screen-capture:stats', async () => {
      return this.screenCaptureService.getStats();
    });

  }

  /**
   *
   */
  private async createOSRDemoWindow(): Promise<void> {
    // Demo OSR window removed
    return;
  }
}
