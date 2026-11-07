import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { PRESETS } from '../data/presets';
import { PresetCategory } from '../types/receipt';

interface PresetSelectorProps {
  selectedPresetId: string;
  onSelectPreset: (preset: PresetCategory) => void;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  selectedPresetId,
  onSelectPreset,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>CHOOSE YOUR VIBE:</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {PRESETS.map((preset) => {
          const isSelected = preset.id === selectedPresetId;
          return (
            <TouchableOpacity
              key={preset.id}
              activeOpacity={0.75}
              style={[
                styles.presetPill,
                isSelected ? styles.selectedPill : styles.unselectedPill,
              ]}
              onPress={() => onSelectPreset(preset)}
            >
              <Text style={styles.presetIcon}>{preset.icon}</Text>
              <Text
                style={[
                  styles.presetText,
                  isSelected ? styles.selectedText : styles.unselectedText,
                ]}
              >
                {preset.title}
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
    marginVertical: 12,
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
    gap: 8,
  },
  presetPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 24,
    borderWidth: 1.5,
  },
  unselectedPill: {
    backgroundColor: '#1E1E1E',
    borderColor: '#333333',
  },
  selectedPill: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  presetIcon: {
    fontSize: 15,
    marginRight: 6,
  },
  presetText: {
    fontSize: 13,
    fontWeight: '700',
  },
  unselectedText: {
    color: '#E0E0E0',
  },
  selectedText: {
    color: '#0A0A0A',
  },
});
