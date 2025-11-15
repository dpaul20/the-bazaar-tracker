import {app as ElectronApp } from 'electron';
import { Application } from "./application";
import { GameEventsService } from './services/gep.service';
import { MainWindowController } from './controllers/main-window.controller';
import { ScreenCaptureService } from './services/screen-capture.service';

// Bootstrap lightweight wiring; DI framework not needed for now.
const bootstrap = (): Application => {
  const gepService = new GameEventsService();
  const screenCaptureService = new ScreenCaptureService();

  const mainWindowController = new MainWindowController(gepService, screenCaptureService);

  return new Application(gepService, mainWindowController, screenCaptureService);
}

const app = bootstrap();

// eslint-disable-next-line unicorn/prefer-top-level-await
ElectronApp.whenReady().then(() => { app.run(); });

ElectronApp.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    ElectronApp.quit();
  }
});
