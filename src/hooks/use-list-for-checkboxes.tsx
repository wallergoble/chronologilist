import { useState } from 'react'

export type CheckboxOption = {
  checked: boolean
}

export function useListWithCheckboxes<T extends CheckboxOption>(
  initialOptions: T[],
): [T[], (index: number) => void] {
  let [options, setOptions] = useState(initialOptions)

  function setCheckedByIndex(index: number) {
    setOptions(
      options.map((option, i) => {
        if (i === index) {
          return {
            ...option,
            checked: !option.checked,
          }
        } else {
          return option
        }
      }),
    )
  }

  return [options, setCheckedByIndex]
}
