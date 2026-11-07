import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  Alert,
} from 'react-native';
import { ReceiptView } from './src/components/ReceiptView';
import { PresetSelector } from './src/components/PresetSelector';
import { ItemRowEditor } from './src/components/ItemRowEditor';
import { ThemeSelector } from './src/components/ThemeSelector';
import { PaywallModal } from './src/components/PaywallModal';
import { ShareModal } from './src/components/ShareModal';
import { PRESETS, PAPER_THEMES } from './src/data/presets';
import {
  ReceiptData,
  ReceiptItem,
  PaperTheme,
  PaperThemeId,
  PresetCategory,
} from './src/types/receipt';
import { triggerHaptic } from './src/utils/haptics';
import {
  captureReceiptImage,
  shareToInstagramStories,
  shareViaSystemSheet,
} from './src/utils/sharing';

export default function App() {
  const receiptRef = useRef<View>(null);

  // Active state
  const [selectedPreset, setSelectedPreset] = useState<PresetCategory>(PRESETS[0]);
  const [items, setItems] = useState<ReceiptItem[]>(() =>
    PRESETS[0].items.map((it, idx) => ({ ...it, id: `item-${idx}` }))
  );
  const [delusionTax, setDelusionTax] = useState<number>(
    PRESETS[0].defaultDelusionTax
  );
  const [currentThemeId, setCurrentThemeId] = useState<PaperThemeId>('classic');
  const [isVipUnlocked, setIsVipUnlocked] = useState<boolean>(false);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);

  // Modals state
  const [paywallVisible, setPaywallVisible] = useState<boolean>(false);
  const [shareModalVisible, setShareModalVisible] = useState<boolean>(false);
  const [capturedImageUri, setCapturedImageUri] = useState<string | null>(null);

  // Printer animation value
  const printAnim = useRef(new Animated.Value(1)).current;

  // Handle Preset Change
  const handleSelectPreset = (preset: PresetCategory) => {
    triggerHaptic('selection');
    setSelectedPreset(preset);
    setDelusionTax(preset.defaultDelusionTax);
    setItems(
      preset.items.map((it, idx) => ({
        ...it,
        id: `item-${preset.id}-${idx}`,
      }))
    );
  };

  // Handle Quantity Change
  const handleUpdateQuantity = (id: string, delta: number) => {
    triggerHaptic('selection');
    setItems((prev) =>
      prev.map((it) => {
        if (it.id === id) {
          const newQty = Math.max(0, it.quantity + delta);
          return { ...it, quantity: newQty };
        }
        return it;
      })
    );
  };

  // Handle Tax Change
  const handleUpdateTax = (delta: number) => {
    triggerHaptic('selection');
    setDelusionTax((prev) => Math.max(0, Math.min(100, prev + delta)));
  };

  // Handle Theme Selection
  const handleSelectTheme = (theme: PaperTheme) => {
    if (theme.isVip && !isVipUnlocked) {
      triggerHaptic('impactMedium');
      setPaywallVisible(true);
      return;
    }
    triggerHaptic('selection');
    setCurrentThemeId(theme.id);
  };

  // Trigger Print & Share Flow
  const handlePrintFlow = async () => {
    triggerHaptic('impactHeavy');

    // Run tactile printing vibration & scale bounce
    Animated.sequence([
      Animated.timing(printAnim, {
        toValue: 0.97,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(printAnim, {
        toValue: 1.0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    // Capture receipt image
    setIsCapturing(true);
    setShareModalVisible(true);

    try {
      const uri = await captureReceiptImage(receiptRef);
      setCapturedImageUri(uri);
    } catch (e) {
      console.error(e);
    } finally {
      setIsCapturing(false);
    }
  };

  // VIP Purchase Simulation (RevenueCat integration hook)
  const handleUnlockVip = () => {
    triggerHaptic('success');
    setIsVipUnlocked(true);
    setPaywallVisible(false);
    Alert.alert(
      '🎉 VIP Unlocked!',
      'All 5 aesthetic paper themes and watermark removal are now active forever.'
    );
  };

  // Rewarded Ad Simulation (AdMob / AppLovin MAX hook)
  const handleWatchAd = () => {
    triggerHaptic('impactMedium');
    setPaywallVisible(false);
    Alert.alert(
      '🎬 Rewarded Video Ad',
      'Ad completed! 1-time watermark-free export unlocked.',
      [
        {
          text: 'Great',
          onPress: () => {
            handlePrintFlow();
          },
        },
      ]
    );
  };

  // Receipt data payload
  const receiptData: ReceiptData = {
    storeName: 'LIFE RECEIPT',
    storeLocation: 'STORE #404 • LIFESTYLE AUDIT',
    cashier: selectedPreset.cashier,
    dateStr: 'NOV 07, 2026',
    timeStr: '03:42 AM',
    items,
    delusionTaxPercent: delusionTax,
    overallVibe: selectedPreset.vibe,
    authCode: 'SAVAGE_AI_2026',
    cardNumber: '************2026',
    showWatermark: !isVipUnlocked,
    themeId: currentThemeId,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* Top App Header */}
      <View style={styles.topHeader}>
        <View>
          <Text style={styles.appName}>LifeReceipt</Text>
          <Text style={styles.appTagline}>Aesthetic Thermal Generator</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.vipBadge, isVipUnlocked && styles.vipUnlockedBadge]}
          onPress={() => setPaywallVisible(true)}
        >
          <Text style={styles.vipBadgeText}>
            {isVipUnlocked ? 'VIP ACTIVE ✨' : 'GET VIP ⚡'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Animated Receipt Canvas */}
        <Animated.View
          style={[
            styles.receiptContainer,
            { transform: [{ scale: printAnim }] },
          ]}
        >
          <ReceiptView ref={receiptRef} data={receiptData} />
        </Animated.View>

        {/* Paper Theme Picker */}
        <ThemeSelector
          currentThemeId={currentThemeId}
          isVipUnlocked={isVipUnlocked}
          onSelectTheme={handleSelectTheme}
        />

        {/* Preset Category Switcher */}
        <PresetSelector
          selectedPresetId={selectedPreset.id}
          onSelectPreset={handleSelectPreset}
        />

        {/* Line Items & Tax Customizer */}
        <ItemRowEditor
          items={items}
          delusionTax={delusionTax}
          onUpdateQuantity={handleUpdateQuantity}
          onUpdateTax={handleUpdateTax}
        />

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Floating Bottom Action Bar */}
      <View style={styles.bottomDock}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.printBtn}
          onPress={handlePrintFlow}
        >
          <Text style={styles.printBtnIcon}>🖨️</Text>
          <Text style={styles.printBtnText}>PRINT & SHARE RECEIPT</Text>
        </TouchableOpacity>
      </View>

      {/* Paywall Modal */}
      <PaywallModal
        visible={paywallVisible}
        onClose={() => setPaywallVisible(false)}
        onUnlockVip={handleUnlockVip}
        onWatchAd={handleWatchAd}
      />

      {/* Export & Share Modal */}
      <ShareModal
        visible={shareModalVisible}
        onClose={() => setShareModalVisible(false)}
        isCapturing={isCapturing}
        onShareInstagram={() => {
          if (capturedImageUri) {
            shareToInstagramStories(capturedImageUri);
          }
        }}
        onNativeShare={() => {
          if (capturedImageUri) {
            shareViaSystemSheet(capturedImageUri);
          }
        }}
        onSaveToGallery={() => {
          if (capturedImageUri) {
            shareViaSystemSheet(capturedImageUri);
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#09090B',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#18181B',
  },
  appName: {
    color: '#FAFAFA',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  appTagline: {
    color: '#71717A',
    fontSize: 11,
    fontFamily: 'monospace',
    marginTop: 1,
  },
  vipBadge: {
    backgroundColor: '#27272A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  vipUnlockedBadge: {
    backgroundColor: '#854D0E',
    borderColor: '#FBBF24',
  },
  vipBadgeText: {
    color: '#FBBF24',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    fontFamily: 'monospace',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  receiptContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  bottomSpacer: {
    height: 90,
  },
  bottomDock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(9, 9, 11, 0.94)',
    borderTopWidth: 1,
    borderTopColor: '#27272A',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  printBtn: {
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 16,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  printBtnIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  printBtnText: {
    color: '#09090B',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
