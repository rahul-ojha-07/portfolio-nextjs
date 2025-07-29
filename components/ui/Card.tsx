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

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const { colors } = useTheme();

  // Sizing
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Set base style based on theme
  const baseStyle: React.CSSProperties = {
    borderRadius: 8,
    fontWeight: 500,
    transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
    outline: "none",
    border: "none",
    boxShadow: "none",
  };

  let variantStyle: React.CSSProperties = {};
  let whileHover: any = { scale: 1.02 };

  if (variant === "primary") {
    variantStyle = {
      backgroundColor: colors.primary,
      color: colors.badgeText,
    };
    whileHover.backgroundColor = colors.secondary;
  } else if (variant === "secondary") {
    variantStyle = {
      backgroundColor: colors.secondary,
      color: colors.badgeText,
    };
    whileHover.backgroundColor = colors.primary;
  } else if (variant === "outline") {
    variantStyle = {
      backgroundColor: "transparent",
      color: colors.primary,
      border: `2px solid ${colors.primary}`,
    };
    whileHover.backgroundColor = colors.primary;
    whileHover.color = colors.badgeText;
  }

  return (
    <motion.button
      {...props}
      type={props.type as any || "button"}
      className={`inline-flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${sizes[size] || sizes.md} ${className}`}
      style={{ ...baseStyle, ...variantStyle }}
      whileHover={whileHover}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
};
