import * as React from "react";

export function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-2">{children}</div>;
}
