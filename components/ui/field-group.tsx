import * as React from "react";

interface FieldGroupProps {
  children: React.ReactNode;
  direction?: "row" | "col";
}

export function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}
