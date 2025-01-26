import { useState } from 'react'

/**
 * 判断值是否未定义(不为undefined)
 * @param value - 值
 * @returns 返回true则值不为undefined
 */
function hasValue(value: unknown) {
  return value !== undefined
}

/**
 * 是否为函数
 * @param value - 值
 * @returns 返回true则为函数
 */
function isFunction(value: unknown) {
  return typeof value === 'function'
}

/**
 * 获取值
 */
type GetValue<T> = () => T

/**
 * 受控状态hooks
 * @description 用于创建双向绑定的状态
 * @param defaultValue - 默认值
 * @param option - 选项
 * @returns 返回受控值和值设置函数, 就与useState一样
 * @example
 * ```tsx
 * // 通常props都是包含 value, defaultValue, onChange
 * const [value, setValue] = useControllerState(defaultValue, props)
 * ```
 */
export function useControllerState<T, R = T>(
  defaultValue: T | GetValue<T>,
  option?: {
    defaultValue?: T | GetValue<T>
    value?: T
    onChange?: (value: T) => void
  }
): [R, (value: T) => void] {
  const { defaultValue: optionDefaultValue, value, onChange } = option || {}

  const [innerValue, setInnerValue] = useState<T>(() => {
    if (hasValue(value)) {
      return value
    } else if (hasValue(optionDefaultValue)) {
      return isFunction(optionDefaultValue) ? (optionDefaultValue as GetValue<T>)() : optionDefaultValue
    } else {
      return isFunction(defaultValue) ? (defaultValue as GetValue<T>)() : defaultValue
    }
  })
  const mergedValue = value !== undefined ? value : innerValue

  function handleChange(value: T) {
    setInnerValue(value)
    onChange?.(value)
  }

  return [mergedValue as unknown as R, handleChange]
}
