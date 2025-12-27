import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
    const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"

    const variants = {
        default: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-100",
        secondary: "border-transparent bg-slate-200 text-slate-900 hover:bg-slate-200/80",
        destructive: "border-transparent bg-red-500 text-white hover:bg-red-500/80",
        outline: "text-slate-900 border-slate-200 dark:text-slate-100 dark:border-slate-700",
        success: "border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
        warning: "border-transparent bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    }

    return (
        <div className={`${baseStyles} ${variants[variant]} ${className || ''}`} {...props} />
    )
}
