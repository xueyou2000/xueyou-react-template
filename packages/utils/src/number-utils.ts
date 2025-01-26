/**
 * 将值限定最大最小之间
 * @param value - 要限定的值
 * @param min - 限定最小值
 * @param max - 限定最大值
 * @returns 返回限定后的值
 * @example
 * ```ts
 * clamp(2, 5, 20) // 5
 * clamp(10, 5, 20) // 10
 * clamp(30, 5, 20) // 20
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
