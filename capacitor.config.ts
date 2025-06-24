
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.29e367aac6a44af5a743a4a0f70e6507',
  appName: 'swift-cheque-scan',
  webDir: 'dist',
  server: {
    url: "https://29e367aa-c6a4-4af5-a743-a4a0f70e6507.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffff",
      showSpinner: false
    },
    Camera: {
      permissions: ["camera", "photos"]
    }
  }
};

export default config;
