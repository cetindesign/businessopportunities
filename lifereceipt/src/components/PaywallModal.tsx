import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

interface PaywallModalProps {
  visible: boolean;
  onClose: () => void;
  onUnlockVip: () => void;
  onWatchAd: () => void;
  isLoading?: boolean;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  visible,
  onClose,
  onUnlockVip,
  onWatchAd,
  isLoading = false,
}) => {
  const [showClose, setShowClose] = useState(false);

  useEffect(() => {
    if (visible) {
      setShowClose(false);
      // Delayed close button to prevent reflex dismissals
      const timer = setTimeout(() => setShowClose(true), 2500);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Top Dismiss Button (Delayed Fade-in) */}
          {showClose && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.closeBtn}
              onPress={onClose}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          )}

          {/* Header */}
          <Text style={styles.badge}>LIFERECEIPT VIP</Text>
          <Text style={styles.title}>Unlock Aesthetic Receipts</Text>
          <Text style={styles.subtitle}>
            Post flawless, watermark-free stories with all 5 aesthetic paper themes.
          </Text>

          {/* Value Props Checklist */}
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.checkIcon}>✨</Text>
              <Text style={styles.featureText}>
                <Text style={styles.boldText}>No Watermarks:</Text> Remove bottom
                barcodes permanently
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.checkIcon}>🎨</Text>
              <Text style={styles.featureText}>
                <Text style={styles.boldText}>All 5 Themes:</Text> Vintage, Pink
                POS, Acid Cyber, Obsidian Black
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.checkIcon}>⚡</Text>
              <Text style={styles.featureText}>
                <Text style={styles.boldText}>High-Res 4K Export:</Text> Perfect for
                Instagram Story & TikTok
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.checkIcon}>🔒</Text>
              <Text style={styles.featureText}>
                <Text style={styles.boldText}>Zero Subscriptions:</Text> One-time
                purchase, yours forever
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            {/* Primary Gold CTA ($2.99 IAP) */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.primaryBtn}
              onPress={onUnlockVip}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#000000" />
              ) : (
                <>
                  <Text style={styles.primaryBtnText}>
                    ⚡ UNLOCK VIP LIFETIME — $2.99
                  </Text>
                  <Text style={styles.primarySubtext}>
                    One-time payment • No monthly recurring fees
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {/* Secondary Rewarded Ad Option */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.adBtn}
              onPress={onWatchAd}
              disabled={isLoading}
            >
              <Text style={styles.adBtnText}>
                ▶ Or Watch 1 Sponsor Video to Print Free
              </Text>
            </TouchableOpacity>
          </View>

          {/* Trust Footer */}
          <Text style={styles.footerNote}>
            Secured via Apple App Store / Google Play • 100% On-Device Privacy
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#141416',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#2A2A2E',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#27272A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#A1A1AA',
    fontSize: 14,
    fontWeight: '700',
  },
  badge: {
    fontFamily: 'monospace',
    color: '#F59E0B',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  featuresList: {
    width: '100%',
    marginBottom: 24,
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  featureText: {
    color: '#D1D5DB',
    fontSize: 13,
    flex: 1,
  },
  boldText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  actionsContainer: {
    width: '100%',
    gap: 12,
  },
  primaryBtn: {
    backgroundColor: '#F59E0B',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  primaryBtnText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  primarySubtext: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 10,
    marginTop: 2,
    fontWeight: '600',
  },
  adBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3F3F46',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  adBtnText: {
    color: '#D4D4D8',
    fontSize: 12,
    fontWeight: '700',
  },
  footerNote: {
    color: '#6B7280',
    fontSize: 10,
    marginTop: 18,
    textAlign: 'center',
  },
});
