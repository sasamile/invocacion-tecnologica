"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MunicipalitySelectProps {
  value: string;
  triggerPlaceholder: string;
  defaultValuePlaceholder: string;
  onChange: (value: string) => void;
  options?: { id: string; name: string }[];
}

export function FilterSelect({
  value,
  onChange,
  triggerPlaceholder,
  defaultValuePlaceholder,
  options = [],
}: MunicipalitySelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-white xl:flex-1 w-full truncate">
        <SelectValue placeholder={triggerPlaceholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{defaultValuePlaceholder}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option.id} value={option.name}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
