import { useMemo } from 'react';

/**
 * Split text into characters
 */
export function useSplitText(text: string): string[] {
  return useMemo(() => text.split(''), [text]);
}

/**
 * Split text into words
 */
export function useSplitWords(text: string): string[] {
  return useMemo(() => text.split(' ').filter(Boolean), [text]);
}

/**
 * Split text into lines (preserves line breaks)
 */
export function useSplitLines(text: string): string[] {
  return useMemo(() => text.split('\n').filter(Boolean), [text]);
}
