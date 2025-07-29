import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

type MotionButtonProps = Omit<HTMLMotionProps<"button">, "onAnimationStart"> & {
  onAnimationStart?: (definition: any) => void;
};

interface ButtonProps extends MotionButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

// Forward ref to underlying motion.button element
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const { colors } = useTheme();

    // Base styles common to all variants
    const baseClasses =
      "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

    // Size styles
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    // Variant styles rendered inline using theme colors
    // For the outline variant, we simulate border and hover with inline styles + class fallback for transition
    let variantStyles = {
      backgroundColor: undefined as string | undefined,
      color: undefined as string | undefined,
      border: undefined as string | undefined,
      // For hover, we'll use Framer Motion props or className with extra tailwind styles
    };

    switch (variant) {
      case "primary":
        variantStyles = {
          backgroundColor: colors.primary,
          color: "#fff", // Force white for better contrast
          border: "none",
        };
        break;
      case "secondary":
        variantStyles = {
          backgroundColor: colors.secondary,
          color: "#fff", // Force white for better contrast
          border: "none",
        };
        break;
      case "outline":
        variantStyles = {
          backgroundColor: "transparent",
          color: colors.primary,
          border: `2px solid ${colors.primary}`,
        };
        break;
    }

    return (
      <motion.button
        {...props}
        ref={ref}
        className={`${baseClasses} ${sizes[size]} ${className}`}
        initial={false}
        whileHover={
          variant === "outline"
            ? {
              scale: 1.02,
              backgroundColor: colors.primary,
              color: colors.badgeText || "#fff",
              borderColor: colors.primary,
            }
            : {
              scale: 1.02,
            }
        }
        whileTap={{ scale: 0.98 }}
        style={variantStyles}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
