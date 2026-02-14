import { TextInput } from "@/components/ui";

interface AmountFilterProps {
  displayValue: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  disabled?: boolean;
}

/**
 * A component to filter transactions by amount.
 * It displays a text input field and a label.

 *  @param {AmountFilterProps} props - The props for the component
 *  @param {string} props.displayValue - The value to display in the input field
 *  @param {(value: string) => void} props.onChange - The function to call when the input field changes
 *  @param {() => void} props.onBlur - The function to call when the input field loses focus
 *  @param {boolean} [props.disabled] - Whether the input field is disabled
 *  @returns A JSX element representing the amount filter
 */
export function AmountFilter({
  displayValue,
  onChange,
  onBlur,
  disabled,
}: AmountFilterProps) {
  return (
    <div className="shrink-0 space-y-2">
      <label className="text-md block font-bold">Amount Filter</label>
      <TextInput
        type="text"
        inputMode="decimal"
        value={displayValue}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder="Amount"
        disabled={disabled}
      />
    </div>
  );
}
