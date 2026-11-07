import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

interface BarcodeProps {
  color: string;
  width?: number;
  height?: number;
  label?: string;
  showText?: boolean;
}

export const Barcode: React.FC<BarcodeProps> = ({
  color,
  width = 240,
  height = 42,
  label = 'LIFERECEIPT • 404-EMOTIONAL-DAMAGE',
  showText = true,
}) => {
  // Pattern of bar widths (1, 2, 3, 4 units)
  const pattern = [
    2, 1, 3, 1, 1, 2, 4, 1, 2, 3, 1, 1, 2, 1, 4, 2, 1, 3, 1, 2,
    1, 4, 2, 1, 3, 2, 1, 1, 4, 1, 2, 3, 1, 2, 1, 1, 3, 2, 4, 1
  ];

  let currentX = 0;
  const unitWidth = width / 90;

  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {pattern.map((barWidth, index) => {
          const isBar = index % 2 === 0;
          const x = currentX;
          currentX += barWidth * unitWidth;

          if (!isBar) return null;

          return (
            <Rect
              key={index}
              x={x}
              y={0}
              width={barWidth * unitWidth}
              height={height}
              fill={color}
            />
          );
        })}
      </Svg>
      {showText && (
        <Text style={[styles.codeText, { color }]}>{label}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 4,
    fontWeight: '600',
  },
});
