import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

interface ShareModalProps {
  visible: boolean;
  onClose: () => void;
  onShareInstagram: () => void;
  onNativeShare: () => void;
  onSaveToGallery: () => void;
  isCapturing?: boolean;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  visible,
  onClose,
  onShareInstagram,
  onNativeShare,
  onSaveToGallery,
  isCapturing = false,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.grabber} />

          <Text style={styles.title}>Export Your Receipt</Text>
          <Text style={styles.subtitle}>
            Ready for your Instagram Story or TikTok dump
          </Text>

          {isCapturing ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#F59E0B" />
              <Text style={styles.loadingText}>
                Rendering high-res thermal image...
              </Text>
            </View>
          ) : (
            <View style={styles.btnList}>
              {/* Instagram Story Primary */}
              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.shareBtn, styles.igBtn]}
                onPress={onShareInstagram}
              >
                <Text style={styles.btnIcon}>📸</Text>
                <View style={styles.btnTextContainer}>
                  <Text style={styles.btnMainText}>Share to Instagram Story</Text>
                  <Text style={styles.btnSubText}>
                    Opens directly in Story camera as sticker
                  </Text>
                </View>
              </TouchableOpacity>

              {/* General Share */}
              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.shareBtn, styles.nativeBtn]}
                onPress={onNativeShare}
              >
                <Text style={styles.btnIcon}>💬</Text>
                <View style={styles.btnTextContainer}>
                  <Text style={styles.btnMainText}>Send in Group Chat</Text>
                  <Text style={styles.btnSubText}>
                    iMessage, WhatsApp, TikTok, X
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Save Image */}
              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.shareBtn, styles.saveBtn]}
                onPress={onSaveToGallery}
              >
                <Text style={styles.btnIcon}>💾</Text>
                <View style={styles.btnTextContainer}>
                  <Text style={styles.btnMainText}>Save High-Res Image</Text>
                  <Text style={styles.btnSubText}>
                    Saved to your camera roll
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.cancelBtn}
            onPress={onClose}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#18181B',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#27272A',
  },
  grabber: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3F3F46',
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    color: '#A1A1AA',
    fontSize: 13,
    marginBottom: 20,
  },
  loadingContainer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  loadingText: {
    color: '#D4D4D8',
    fontSize: 13,
    marginTop: 12,
    fontFamily: 'monospace',
  },
  btnList: {
    width: '100%',
    gap: 10,
    marginBottom: 16,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  igBtn: {
    backgroundColor: '#833AB4', // Instagram purple gradient base
  },
  nativeBtn: {
    backgroundColor: '#27272A',
  },
  saveBtn: {
    backgroundColor: '#27272A',
  },
  btnIcon: {
    fontSize: 22,
    marginRight: 14,
  },
  btnTextContainer: {
    flex: 1,
  },
  btnMainText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  btnSubText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    marginTop: 1,
  },
  cancelBtn: {
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelText: {
    color: '#71717A',
    fontSize: 14,
    fontWeight: '600',
  },
});
