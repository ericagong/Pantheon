import { useState, useCallback } from "react";

/**
 * useInput custom hook
 * @param {object} initialValue default = null
 * @returns [value, setValue, onChange]
 * @description 해당 value 외의 다른 의존성이 있는 onChange 함수 필요시, 별도 작성 필요
 */
const useInput = (initialValue = null) => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, setValue, onChange];
};

export default useInput;
