import { cn } from "@/lib/utils";
import styles from "./Card.module.scss";

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: "default" | "hover";
}

export function Card({
    children,
    className,
    onClick,
    variant = "default",
}: CardProps) {
    const isClickable = Boolean(onClick);

    return (
        <div
            className={cn(
                styles.card,
                variant === "hover" && styles.cardHover,
                isClickable &&
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ffe7] focus-visible:ring-offset-2",
                className
            )}
            onClick={onClick}
            role={isClickable ? "button" : undefined}
            tabIndex={isClickable ? 0 : undefined}
            onKeyDown={
                isClickable ? (e) => e.key === "Enter" && onClick?.() : undefined
            }
        >
            {children}
        </div>
    );
}
