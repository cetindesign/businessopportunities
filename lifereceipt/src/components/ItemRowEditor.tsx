import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ReceiptItem } from '../types/receipt';

interface ItemRowEditorProps {
  items: ReceiptItem[];
  delusionTax: number;
  onUpdateQuantity: (id: string, delta: number) => void;
  onUpdateTax: (delta: number) => void;
}

export const ItemRowEditor: React.FC<ItemRowEditorProps> = ({
  items,
  delusionTax,
  onUpdateQuantity,
  onUpdateTax,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>CUSTOMIZE LINE ITEMS:</Text>

      {items.map((item) => (
        <View key={item.id} style={styles.row}>
          <View style={styles.nameContainer}>
            <Text style={styles.itemName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.itemMeta}>
              ${item.unitPrice.toFixed(2)} each
            </Text>
          </View>

          <View style={styles.stepperContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.stepperBtn}
              onPress={() => onUpdateQuantity(item.id, -1)}
            >
              <Text style={styles.btnText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.quantityText}>{item.quantity}</Text>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.stepperBtn}
              onPress={() => onUpdateQuantity(item.id, 1)}
            >
              <Text style={styles.btnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Delusion Tax Stepper */}
      <View style={[styles.row, styles.taxRow]}>
        <View style={styles.nameContainer}>
          <Text style={[styles.itemName, styles.taxName]}>
            DELUSION TAX 🔥
          </Text>
          <Text style={styles.itemMeta}>Added directly to emotional total</Text>
        </View>

        <View style={styles.stepperContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.stepperBtn}
            onPress={() => onUpdateTax(-5)}
          >
            <Text style={styles.btnText}>-</Text>
          </TouchableOpacity>

          <Text style={[styles.quantityText, styles.taxText]}>
            {delusionTax}%
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.stepperBtn}
            onPress={() => onUpdateTax(5)}
          >
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  sectionLabel: {
    color: '#888888',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#18181B',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#27272A',
  },
  nameContainer: {
    flex: 1,
    paddingRight: 10,
  },
  itemName: {
    color: '#FAFAFA',
    fontSize: 13,
    fontWeight: '600',
  },
  itemMeta: {
    color: '#71717A',
    fontSize: 11,
    marginTop: 2,
    fontFamily: 'monospace',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27272A',
    borderRadius: 8,
    padding: 3,
  },
  stepperBtn: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#3F3F46',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 20,
  },
  quantityText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    width: 32,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  taxRow: {
    borderColor: '#E11D48',
    backgroundColor: '#1E1015',
  },
  taxName: {
    color: '#FB7185',
    fontWeight: '800',
  },
  taxText: {
    color: '#FB7185',
    width: 44,
  },
});
