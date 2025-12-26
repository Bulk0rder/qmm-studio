import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "destructive" | "outline"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
    const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"

    const variants = {
        default: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80",
        secondary: "border-transparent bg-slate-800 text-slate-100 hover:bg-slate-800/80",
        destructive: "border-transparent bg-red-500 text-slate-100 hover:bg-red-500/80",
        outline: "text-slate-100 border-slate-700"
    }

    return (
        <div className={`${baseStyles} ${variants[variant]} ${className || ''}`} {...props} />
    )
}
