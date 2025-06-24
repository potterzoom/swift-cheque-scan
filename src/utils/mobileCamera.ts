
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export class MobileCameraService {
  static async takePicture(): Promise<string | null> {
    try {
      // Check if we're running in a Capacitor environment
      const isCapacitor = (window as any).Capacitor?.isNativePlatform();
      
      if (isCapacitor) {
        // Use Capacitor camera for mobile devices
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Camera,
          width: 1200,
          height: 800
        });
        
        return image.dataUrl || null;
      } else {
        // Fallback to web camera for browser
        return this.getWebCamera();
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      return null;
    }
  }
  
  static async selectFromGallery(): Promise<string | null> {
    try {
      const isCapacitor = (window as any).Capacitor?.isNativePlatform();
      
      if (isCapacitor) {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Photos,
          width: 1200,
          height: 800
        });
        
        return image.dataUrl || null;
      } else {
        // Fallback for web
        return this.getWebFile();
      }
    } catch (error) {
      console.error('Error selecting from gallery:', error);
      return null;
    }
  }
  
  private static getWebCamera(): Promise<string | null> {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.capture = 'environment';
      
      input.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => resolve(null);
          reader.readAsDataURL(file);
        } else {
          resolve(null);
        }
      };
      
      input.click();
    });
  }
  
  private static getWebFile(): Promise<string | null> {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      
      input.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => resolve(null);
          reader.readAsDataURL(file);
        } else {
          resolve(null);
        }
      };
      
      input.click();
    });
  }
  
  static async requestPermissions(): Promise<boolean> {
    try {
      const isCapacitor = (window as any).Capacitor?.isNativePlatform();
      
      if (isCapacitor) {
        const permissions = await Camera.requestPermissions();
        return permissions.camera === 'granted';
      }
      
      // For web, permissions are handled by the browser
      return true;
    } catch (error) {
      console.error('Error requesting camera permissions:', error);
      return false;
    }
  }
}
