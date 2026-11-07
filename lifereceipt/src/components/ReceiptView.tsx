import React, { forwardRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PaperTear } from './PaperTear';
import { Barcode } from './Barcode';
import { ReceiptData } from '../types/receipt';
import { PAPER_THEMES } from '../data/presets';

interface ReceiptViewProps {
  data: ReceiptData;
}

export const ReceiptView = forwardRef<any, ReceiptViewProps>(({ data }, ref) => {
  const currentTheme =
    PAPER_THEMES.find((t) => t.id === data.themeId) || PAPER_THEMES[0];

  const subtotal = data.items.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0
  );
  const delusionTax = (subtotal * data.delusionTaxPercent) / 100;
  const total = subtotal + delusionTax;

  const textColor = currentTheme.textColor;
  const bgColor = currentTheme.backgroundColor;
  const accentColor = currentTheme.accentColor;

  return (
    <View ref={ref} collapsable={false} style={styles.wrapper}>
      {/* Top jagged paper tear */}
      <PaperTear color={bgColor} isBottom={false} teethCount={32} height={14} />

      {/* Main receipt paper body */}
      <View style={[styles.receiptPaper, { backgroundColor: bgColor }]}>
        {/* Header Store Brand */}
        <View style={styles.header}>
          <Text style={[styles.brandTitle, { color: textColor }]}>
            {data.storeName.toUpperCase()}
          </Text>
          <Text style={[styles.subHeader, { color: textColor }]}>
            {data.storeLocation}
          </Text>
          <Text style={[styles.divider, { color: textColor }]}>
            ===========================================
          </Text>
        </View>

        {/* Metadata section */}
        <View style={styles.metaRow}>
          <Text style={[styles.metaText, { color: textColor }]}>
            CASHIER: {data.cashier}
          </Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={[styles.metaText, { color: textColor }]}>
            DATE: {data.dateStr}
          </Text>
          <Text style={[styles.metaText, { color: textColor }]}>
            TIME: {data.timeStr}
          </Text>
        </View>

        <Text style={[styles.divider, { color: textColor }]}>
          -------------------------------------------
        </Text>

        {/* Table column headers */}
        <View style={styles.tableHeader}>
          <Text style={[styles.colQty, styles.headerText, { color: textColor }]}>
            QTY
          </Text>
          <Text style={[styles.colItem, styles.headerText, { color: textColor }]}>
            ITEM DESCRIPTION
          </Text>
          <Text style={[styles.colPrice, styles.headerText, { color: textColor }]}>
            PRICE
          </Text>
        </View>

        <Text style={[styles.divider, { color: textColor }]}>
          -------------------------------------------
        </Text>

        {/* Item Rows */}
        {data.items.map((item) => {
          const itemTotal = item.quantity * item.unitPrice;
          return (
            <View key={item.id} style={styles.itemRow}>
              <Text style={[styles.colQty, styles.itemText, { color: textColor }]}>
                {item.quantity < 10 ? `0${item.quantity}` : item.quantity}
              </Text>
              <Text
                style={[styles.colItem, styles.itemText, { color: textColor }]}
                numberOfLines={2}
              >
                {item.name}
              </Text>
              <Text style={[styles.colPrice, styles.itemText, { color: textColor }]}>
                {itemTotal === 0 ? 'FREE' : `$${itemTotal.toFixed(2)}`}
              </Text>
            </View>
          );
        })}

        <Text style={[styles.divider, { color: textColor }]}>
          ===========================================
        </Text>

        {/* Calculations / Subtotals */}
        <View style={styles.calcRow}>
          <Text style={[styles.calcLabel, { color: textColor }]}>SUBTOTAL:</Text>
          <Text style={[styles.calcValue, { color: textColor }]}>
            ${subtotal.toFixed(2)}
          </Text>
        </View>

        <View style={styles.calcRow}>
          <Text style={[styles.calcLabel, { color: textColor }]}>
            DELUSION TAX (+{data.delusionTaxPercent}%):
          </Text>
          <Text style={[styles.calcValue, { color: textColor }]}>
            ${delusionTax.toFixed(2)}
          </Text>
        </View>

        <View style={[styles.calcRow, styles.totalRow]}>
          <Text style={[styles.totalLabel, { color: textColor }]}>
            EMOTIONAL DAMAGE:
          </Text>
          <Text style={[styles.totalValue, { color: accentColor }]}>
            ${total.toFixed(2)}
          </Text>
        </View>

        <Text style={[styles.divider, { color: textColor }]}>
          -------------------------------------------
        </Text>

        {/* Vibe and Payment Auth */}
        <View style={styles.vibeContainer}>
          <Text style={[styles.vibeLabel, { color: textColor }]}>
            OVERALL VIBE:
          </Text>
          <View style={[styles.vibeBadge, { borderColor: accentColor }]}>
            <Text style={[styles.vibeText, { color: accentColor }]}>
              {data.overallVibe.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <Text style={[styles.metaText, { color: textColor }]}>
            PAYMENT: {data.cardNumber}
          </Text>
          <Text style={[styles.metaText, { color: textColor }]}>
            AUTH: {data.authCode}
          </Text>
        </View>

        {/* Barcode & Viral Watermark Area */}
        <View style={styles.barcodeSection}>
          <Barcode
            color={textColor}
            width={260}
            height={36}
            label="||||| ||| ||||||| || |||||||| ||| ||||"
            showText={false}
          />
          {data.showWatermark ? (
            <View style={styles.watermarkBox}>
              <Text style={[styles.watermarkMain, { color: textColor }]}>
                ★ PRINT YOURS FREE ON LIFERECEIPT ★
              </Text>
              <Text style={[styles.watermarkSub, { color: textColor }]}>
                SEARCH "LIFERECEIPT" ON APP STORE
              </Text>
            </View>
          ) : (
            <View style={styles.watermarkBox}>
              <Text style={[styles.watermarkMain, { color: accentColor }]}>
                ✨ VIP AD-FREE EDITION • LIFE RECEIPT ✨
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Bottom jagged paper tear */}
      <PaperTear color={bgColor} isBottom={true} teethCount={32} height={14} />
    </View>
  );
});

ReceiptView.displayName = 'ReceiptView';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 12,
  },
  receiptPaper: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 6,
  },
  brandTitle: {
    fontFamily: 'monospace',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 4,
    textAlign: 'center',
  },
  subHeader: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 2,
    marginTop: 2,
    textAlign: 'center',
  },
  divider: {
    fontFamily: 'monospace',
    fontSize: 10,
    textAlign: 'center',
    marginVertical: 4,
    letterSpacing: -1,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 1,
  },
  metaText: {
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '600',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 2,
  },
  headerText: {
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '800',
  },
  colQty: {
    width: 32,
    textAlign: 'left',
  },
  colItem: {
    flex: 1,
    paddingHorizontal: 4,
  },
  colPrice: {
    width: 65,
    textAlign: 'right',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 3,
  },
  itemText: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '500',
  },
  calcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  calcLabel: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '600',
  },
  calcValue: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '600',
  },
  totalRow: {
    marginTop: 6,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  totalLabel: {
    fontFamily: 'monospace',
    fontSize: 13,
    fontWeight: '900',
  },
  totalValue: {
    fontFamily: 'monospace',
    fontSize: 15,
    fontWeight: '900',
  },
  vibeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  vibeLabel: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '800',
  },
  vibeBadge: {
    borderWidth: 1.5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
  },
  vibeText: {
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  barcodeSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  watermarkBox: {
    alignItems: 'center',
    marginTop: 4,
  },
  watermarkMain: {
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    textAlign: 'center',
  },
  watermarkSub: {
    fontFamily: 'monospace',
    fontSize: 8,
    letterSpacing: 1.5,
    marginTop: 2,
    textAlign: 'center',
  },
});
