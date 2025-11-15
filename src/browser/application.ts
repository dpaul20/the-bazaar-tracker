//
import { MainWindowController } from './controllers/main-window.controller';
import { kGepSupportedGameIds } from '@overwolf/ow-electron-packages-types/gep-supported-games';
import { GameEventsService } from './services/gep.service';
import { ScreenCaptureService } from './services/screen-capture.service';

export class Application {
  /**
   *
   */
  constructor(
    private readonly gepService: GameEventsService,
    private readonly mainWindowController: MainWindowController,
    private readonly screenCaptureService: ScreenCaptureService) {

    // for gep supported games goto:
    // https://overwolf.github.io/api/electron/game-events/
    gepService.registerGames([
      kGepSupportedGameIds.TeamfightTactics,
      //kGepSupportedGameIds.DiabloIV,
      //kGepSupportedGameIds.RocketLeague,
    ]);
  }

  /**
   *
   */
  public run() {
    this.initialize();
  }

  /**
   *
   */
  private initialize() {
    // Log App ID as required by US 1.1 DoD
    console.log('🎮 The Bazaar Tracker - Overwolf Electron App');
    console.log('📦 App ID:', process.env.npm_package_name || 'com.thebazaar.tracker');
    console.log('🔧 Overwolf packages enabled:', ['gep']);
    
    const showDevTools = true;
    this.mainWindowController.createAndShow(showDevTools);
    
    // Start screen capture service (US 1.2)
    console.log('📸 Starting screen capture service...');
    this.screenCaptureService.startCapture();
  }

  // Overlay support removed as part of cleanup
}
