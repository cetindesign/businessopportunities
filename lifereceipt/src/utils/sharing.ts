import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { Linking, Platform, Alert } from 'react-native';

export const captureReceiptImage = async (viewRef: any): Promise<string | null> => {
  if (!viewRef || !viewRef.current) return null;

  try {
    const uri = await captureRef(viewRef, {
      format: 'png',
      quality: 1.0,
      result: 'tmpfile',
    });
    return uri;
  } catch (err) {
    console.error('Error capturing receipt view:', err);
    return null;
  }
};

export const shareToInstagramStories = async (imageUri: string) => {
  if (Platform.OS === 'web') {
    Alert.alert('Web Preview', 'Instagram Story sharing is available on iOS & Android.');
    return;
  }

  const igStoryUrl = `instagram-stories://share`;
  try {
    const canOpen = await Linking.canOpenURL(igStoryUrl);
    if (canOpen) {
      // If Instagram app is installed, we can trigger native share or open
      await Sharing.shareAsync(imageUri, {
        UTI: 'public.jpeg',
        mimeType: 'image/png',
        dialogTitle: 'Share Receipt to Instagram Story',
      });
    } else {
      // Fallback to native system share sheet
      await shareViaSystemSheet(imageUri);
    }
  } catch (err) {
    await shareViaSystemSheet(imageUri);
  }
};

export const shareViaSystemSheet = async (imageUri: string) => {
  try {
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(imageUri, {
        mimeType: 'image/png',
        dialogTitle: 'Share your LifeReceipt',
      });
    } else {
      Alert.alert('Saved', 'Receipt rendered successfully!');
    }
  } catch (err) {
    console.error('Error sharing image:', err);
  }
};
