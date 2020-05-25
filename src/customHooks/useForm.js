import { useState } from "react";

export const useForm = (type, val) => {
  const [value, setValue] = useState(val);
  const onChange = (e) => setValue(e.target.value);
  const onSetChange = (data) => setValue(data);
  return {
    main: { type, value, onChange },
    onSetChange,
  };
};
