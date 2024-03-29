"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-step--2 rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-yellow text-black hover:opacity-80  shadow dark:shadow-none hover:shadow-md ",
        destructive: "bg-red text-white hover:bg-destructive/90",
        secondary:
          "rounded-md border-solid border-black dark:border-white border hover:bg-white dark:hover:bg-grey",
        tertiary: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  LeadingIcon?: React.ReactNode;
  TrailingIcon?: React.ReactNode;
  // tooltip?: string;
  // tooltipSide?: 'top' | 'bottom' | 'left' | 'right';
  // tooltipOffset?: number;
  unstyled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      LeadingIcon,
      TrailingIcon,
      // tooltip,
      // tooltipSide,
      // tooltipOffset,
      unstyled = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={
          !unstyled
            ? cn(buttonVariants({ variant, size, className }))
            : className
        }
        ref={ref}
        {...props}
      >
        {LeadingIcon && <Slot className="mr-2">{LeadingIcon}</Slot>}
        {props.children}
        {TrailingIcon && <Slot className="ml-2">{TrailingIcon}</Slot>}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
