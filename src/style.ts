/**
 * Adds unit to a value.
 *
 * @example
 *
 * ```ts
 * expect(addUnit()).toBe('')
 * expect(addUnit('100px')).toBe('100px')
 * expect(addUnit(100)).toBe('100px')
 * expect(addUnit(100, 'em')).toBe('100em')
 * ```
 */
 export const addUnit = (value?: string | number, unit = 'px'): string => {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string') return value
  return `${value}${unit}`
}
