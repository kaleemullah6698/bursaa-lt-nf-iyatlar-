/**
 * Turkish Financial Number Parser
 * 
 * Accurately parses Turkish number formats where period (.) is typically the thousands
 * separator and comma (,) is the decimal separator, while also handling US formats (comma thousands,
 * period decimal), currency symbols (₺, TL, USD, $), regular spaces, and non-breaking spaces (\u00A0).
 */

export function parseTurkishNumber(input: string | number | null | undefined): number {
  if (input === null || input === undefined) {
    throw new Error('Input is null or undefined');
  }

  if (typeof input === 'number') {
    if (isNaN(input) || !isFinite(input)) {
      throw new Error(`Invalid numeric input: ${input}`);
    }
    return input;
  }

  // 1. Remove currency symbols, whitespace, and non-breaking spaces
  let cleaned = input
    .replace(/[₺TLtlUSDusd\$\€\s\u00A0\u200B\u200E\u200F]/g, '')
    .trim();

  if (!cleaned) {
    throw new Error(`Empty number string after stripping symbols from "${input}"`);
  }

  // Check if string contains any unexpected characters
  if (!/^[\d.,+-]+$/.test(cleaned)) {
    throw new Error(`String contains non-numeric characters: "${input}"`);
  }

  const hasComma = cleaned.includes(',');
  const hasDot = cleaned.includes('.');

  // Case 1: Contains BOTH dot and comma
  // e.g. "5.432,15" (Turkish: dot thousands, comma decimal)
  // or "5,432.15" (US standard: comma thousands, dot decimal)
  if (hasDot && hasComma) {
    const lastDotIndex = cleaned.lastIndexOf('.');
    const lastCommaIndex = cleaned.lastIndexOf(',');

    if (lastCommaIndex > lastDotIndex) {
      // Turkish format: "5.432,15" or "1.250.432,15"
      // Remove all dots, replace comma with dot
      cleaned = cleaned.replace(/\./g, '').replace(',', '.');
    } else {
      // US format: "5,432.15" or "1,250,432.15"
      // Remove all commas
      cleaned = cleaned.replace(/,/g, '');
    }
  } 
  // Case 2: Contains ONLY comma
  // e.g. "5432,15" (Turkish decimal) or "5,432" (could be thousands or decimal)
  else if (hasComma && !hasDot) {
    const parts = cleaned.split(',');
    if (parts.length === 2) {
      // Exactly one comma: if right part has 1 or 2 digits, or 3-4 digits for decimal precision
      // In Turkish financial tables, "5432,15" is decimal.
      cleaned = parts[0] + '.' + parts[1];
    } else {
      // Multiple commas e.g. "1,234,567" -> treat as US thousands
      cleaned = cleaned.replace(/,/g, '');
    }
  } 
  // Case 3: Contains ONLY dot
  // e.g. "5432.15" (standard decimal) or "5.432" (Turkish thousands separator e.g. "11.158 TL")
  else if (hasDot && !hasComma) {
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      // Multiple dots: definitely thousands separators e.g. "1.234.567"
      cleaned = cleaned.replace(/\./g, '');
    } else if (parts.length === 2) {
      // Single dot: e.g. "5432.15" vs "11.158"
      // In Turkish gold tables, whole lira amounts like "10.918" are often formatted with dot as thousands.
      // If the second part is exactly 3 digits and first part <= 3 digits (e.g. "10.918" or "6.825"),
      // check if it's thousands separator or decimal.
      // For gold prices in 2026, 10.918 TL is ~11,000 TL (Çeyrek Altın), not 10.918 TL.
      // However, if the first part is large like "6738.81", then dot is decimal.
      // Rule: if 2 digits after dot, it's definitely decimal ("6738.81")
      // If 3 digits after dot and left part is 1-3 digits:
      if (parts[1].length === 3 && parts[0].length >= 1 && parts[0].length <= 3) {
        // e.g. "10.918" -> 10918
        cleaned = parts[0] + parts[1];
      } else {
        // Standard decimal point e.g. "5432.15"
        // keep as is
      }
    }
  }

  const result = parseFloat(cleaned);
  if (isNaN(result) || !isFinite(result)) {
    throw new Error(`Failed to parse number from "${input}" (parsed as "${cleaned}")`);
  }

  // Round to 4 decimal places to prevent floating point anomalies
  return Math.round(result * 10000) / 10000;
}
