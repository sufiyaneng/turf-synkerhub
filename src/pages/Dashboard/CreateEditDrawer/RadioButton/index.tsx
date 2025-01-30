import { CustomRadio, HiddenRadio, RadioWrapper } from '@/styles'
import React from 'react'

interface RadioButtonProps {
    label: string;
    name: string;
    value: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

  const RadioButton: React.FC<RadioButtonProps> = ({
    label,
    name,
    value,
    checked,
    onChange,
  }) => {
    return (
      <RadioWrapper selected={checked || false}>
        <HiddenRadio
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <CustomRadio />
        {label}
      </RadioWrapper>
    );
  };
  
  export default RadioButton;
  