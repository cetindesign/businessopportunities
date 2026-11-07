import React from 'react';
import Svg, { Polygon } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';

interface PaperTearProps {
  color: string;
  isBottom?: boolean;
  teethCount?: number;
  height?: number;
}

export const PaperTear: React.FC<PaperTearProps> = ({
  color,
  isBottom = false,
  teethCount = 28,
  height = 12,
}) => {
  // Generate points for zigzag serrated tear edge
  const points: string[] = [];
  const toothWidth = 100 / teethCount;

  if (isBottom) {
    // Base is at top (y=0), teeth point downward
    points.push('0,0');
    for (let i = 0; i < teethCount; i++) {
      const xPeak = (i + 0.5) * toothWidth;
      const xValley = (i + 1) * toothWidth;
      points.push(`${xPeak},${height}`);
      points.push(`${xValley},0`);
    }
    points.push('100,0');
  } else {
    // Top tear: base is at bottom (y=height), teeth point upward
    points.push(`0,${height}`);
    for (let i = 0; i < teethCount; i++) {
      const xPeak = (i + 0.5) * toothWidth;
      const xValley = (i + 1) * toothWidth;
      points.push(`${xPeak},0`);
      points.push(`${xValley},${height}`);
    }
    points.push(`100,${height}`);
  }

  return (
    <View style={[styles.container, { height }]}>
      <Svg height={height} width="100%" viewBox={`0 0 100 ${height}`} preserveAspectRatio="none">
        <Polygon points={points.join(' ')} fill={color} />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
});
