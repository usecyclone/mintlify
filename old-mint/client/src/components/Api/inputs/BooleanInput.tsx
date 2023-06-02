import { ApiInputValue } from '../types';
import { InputDropdown } from './InputDropdown';

const BooleanInput = ({
  value,
  onInputChange,
}: {
  value: ApiInputValue;
  onInputChange: (value: any) => void;
}) => {
  return (
    <InputDropdown
      options={['true', 'false']}
      value={value != null ? (value as boolean).toString() : ''}
      onInputChange={(newValue: string) => onInputChange(newValue === 'true')}
    />
  );
};

export default BooleanInput;
