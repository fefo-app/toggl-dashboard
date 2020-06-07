import React, {
  FormEventHandler,
  ReactNode,
} from "react";
import { TogglClient } from "../../../../services/toggle";
import StyledSelect from "./SelectClient.styled";

export interface SelectClientProps {
  clients: TogglClient[];
  selected?: string;
  submitLabel: ReactNode;
  onSubmit: FormEventHandler;
}

export function SelectClient({
  clients,
  onSubmit,
  selected,
  submitLabel,
}: SelectClientProps) {
  return (
    <StyledSelect onSubmit={onSubmit}>
      <select name="client" value={selected}>
        {clients.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
      <button type="submit">{submitLabel}</button>
    </StyledSelect>
  );
}
