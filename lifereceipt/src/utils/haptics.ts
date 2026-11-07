import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export const triggerHaptic = async (
  type: 'selection' | 'impactMedium' | 'impactHeavy' | 'success' = 'selection'
) => {
  if (Platform.OS === 'web') return;

  try {
    switch (type) {
      case 'selection':
        await Haptics.selectionAsync();
        break;
      case 'impactMedium':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case 'impactHeavy':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case 'success':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
    }
  } catch (err) {
    // Graceful fallback if haptics aren't supported on device
  }
};
