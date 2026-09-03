import type { ChangeEvent, InputHTMLAttributes } from "react";

export const formatPhone = (value: string): string => {
  const digits = value
    .replace(/\D/g, "")
    .replace(/^8/, "7")
    .replace(/^7/, "")
    .slice(0, 10);

  if (!digits) return "";

  let result = "+7";
  if (digits.length > 0) result += ` (${digits.slice(0, 3)}`;
  if (digits.length >= 4) result += `) ${digits.slice(3, 6)}`;
  if (digits.length >= 7) result += `-${digits.slice(6, 8)}`;
  if (digits.length >= 9) result += `-${digits.slice(8, 10)}`;
  return result;
};

interface PhoneInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const PhoneInput = ({ value, onChange, ...rest }: PhoneInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = formatPhone(e.target.value);
    onChange(e);
  };

  return (
    <input
      type="tel"
      inputMode="tel"
      placeholder="+7 (___) ___-__-__"
      value={value}
      onChange={handleChange}
      {...rest}
    />
  );
};
