import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { PAPER_THEMES } from '../data/presets';
import { PaperTheme, PaperThemeId } from '../types/receipt';

interface ThemeSelectorProps {
  currentThemeId: PaperThemeId;
  isVipUnlocked: boolean;
  onSelectTheme: (theme: PaperTheme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentThemeId,
  isVipUnlocked,
  onSelectTheme,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>PAPER THEMES:</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {PAPER_THEMES.map((theme) => {
          const isSelected = theme.id === currentThemeId;
          const isLocked = theme.isVip && !isVipUnlocked;

          return (
            <TouchableOpacity
              key={theme.id}
              activeOpacity={0.8}
              style={[
                styles.themeCard,
                { backgroundColor: theme.backgroundColor },
                isSelected && styles.selectedBorder,
              ]}
              onPress={() => onSelectTheme(theme)}
            >
              <View style={styles.topRow}>
                <View
                  style={[styles.colorDot, { backgroundColor: theme.accentColor }]}
                />
                {isLocked && (
                  <View style={styles.lockBadge}>
                    <Text style={styles.lockText}>VIP 🔒</Text>
                  </View>
                )}
              </View>

              <Text
                style={[styles.themeName, { color: theme.textColor }]}
                numberOfLines={1}
              >
                {theme.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  sectionLabel: {
    color: '#888888',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 8,
    paddingHorizontal: 16,
    fontFamily: 'monospace',
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  themeCard: {
    width: 110,
    height: 64,
    borderRadius: 12,
    padding: 8,
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedBorder: {
    borderColor: '#38BDF8', // Cyan glowing border for active selection
    transform: [{ scale: 1.05 }],
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  lockBadge: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  lockText: {
    color: '#FBBF24',
    fontSize: 9,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  themeName: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '700',
  },
});
