import { GameInfo, GameLaunchEvent } from '@overwolf/ow-electron-packages-types';
import { MainWindowController } from './controllers/main-window.controller';
import { OverlayService } from './services/overlay.service';
import { kGameIds } from "@overwolf/ow-electron-packages-types/game-list";
import { kGepSupportedGameIds } from '@overwolf/ow-electron-packages-types/gep-supported-games';
import { GameEventsService } from './services/gep.service';
import { ScreenCaptureService } from './services/screen-capture.service';

export class Application {
  /**
   *
   */
  constructor(
    private readonly overlayService: OverlayService,
    private readonly gepService: GameEventsService,
    private readonly mainWindowController: MainWindowController,
    private readonly screenCaptureService: ScreenCaptureService) {

    overlayService.on('ready', this.onOverlayServiceReady.bind(this));

    overlayService.on('injection-decision-handling', (
      event: GameLaunchEvent,
      gameInfo: GameInfo
    ) => {
      // Always inject because we tell it which games we want in
      // onOverlayServiceReady
      event.inject();
    })

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
    console.log('🔧 Overwolf packages enabled:', ['gep', 'overlay']);
    
    const showDevTools = true;
    this.mainWindowController.createAndShow(showDevTools);
    
    // Start screen capture service (US 1.2)
    console.log('📸 Starting screen capture service...');
    this.screenCaptureService.startCapture();
  }

  /**
   *
   */
  private onOverlayServiceReady() {
    // Which games to support overlay for
    this.overlayService.registerToGames([
      kGameIds.LeagueofLegends,
      kGameIds.TeamfightTactics,
      kGameIds.RocketLeague,
      kGameIds.DiabloIV
    ]);
  }
}
