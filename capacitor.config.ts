
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.05c47273d3a246d2bdd899b0b3be1be7',
  appName: 'Trakr',
  webDir: 'dist',
  server: {
    url: 'https://05c47273-d3a2-46d2-bdd8-99b0b3be1be7.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#22c55e",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: "#22c55e"
    },
    Keyboard: {
      resize: 'body',
      style: 'DARK'
    },
    App: {
      backButtonText: 'Back'
    }
  },
  ios: {
    contentInset: 'automatic'
  },
  android: {
    allowMixedContent: true,
    captureInput: true
  }
};

export default config;
