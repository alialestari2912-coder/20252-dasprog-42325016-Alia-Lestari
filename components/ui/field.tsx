import * as React from "react";
import { cn } from "@/lib/utils";

// Komponen Field
export const Field = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      {children}
    </div>
  );
};

// Komponen FieldDescription
export const FieldDescription = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
};

// Komponen FieldError
interface FieldErrorProps {
  errors?: { message: string }[];
}

interface FieldErrorProps {
  errors?: { message: string }[];
}

export const FieldError = ({ errors }: FieldErrorProps) => {
  if (!errors || errors.length === 0) return null;
  return (
    <ul className="text-red-500 text-sm list-disc pl-5">
      {errors.map((e, i) => (
        <li key={i}>{e.message}</li>
      ))}
    </ul>
  );
};
