import fs from 'fs';

const content = `import * as React from "react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...classes: (string | false | null | undefined)[]) {
  return twMerge(clsx(...classes))
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary: {
      sm: { padding: "0.375rem 0.75rem", fontSize: "0.875rem", borderRadius: "0.375rem" },
      md: { padding: "0.625rem 1.25rem", fontSize: "0.9375rem", borderRadius: "0.5rem" },
      lg: { padding: "0.875rem 1.75rem", fontSize: "1rem", borderRadius: "0.75rem" },
    },
    secondary: {
      sm: { padding: "0.375rem 0.75rem", fontSize: "0.875rem", borderRadius: "0.375rem", backgroundColor: "rgba(212, 175, 55, 0.15)", color: "#D4AF37", border: "1px solid rgba(212, 175, 55, 0.4)" },
      md: { padding: "0.625rem 1.25rem", fontSize: "0.9375rem", borderRadius: "0.5rem", backgroundColor: "rgba(212, 175, 55, 0.15)", color: "#D4AF37", border: "1px solid rgba(212, 175, 55, 0.4)" },
      lg: { padding: "0.875rem 1.75rem", fontSize: "1rem", borderRadius: "0.75rem", backgroundColor: "rgba(212, 175, 55, 0.15)", color: "#D4AF37", border: "1px solid rgba(212, 175, 55, 0.4)" },
    },
    ghost: {
      sm: { padding: "0.25rem 0.5rem", fontSize: "0.875rem", borderRadius: "0.25rem" },
      md: { padding: "0.5rem 1rem", fontSize: "0.9375rem", borderRadius: "0.375rem" },
      lg: { padding: "0.75rem 1.5rem", fontSize: "1rem", borderRadius: "0.5rem" },
    },
    outline: {
      sm: { padding: "0.375rem 0.75rem", fontSize: "0.875rem", borderRadius: "0.375rem", border: "1px solid rgba(255, 255, 255, 0.3)" },
      md: { padding: "0.625rem 1.25rem", fontSize: "0.9375rem", borderRadius: "0.5rem", border: "1px solid rgba(255, 255, 255, 0.3)" },
      lg: { padding: "0.875rem 1.75rem", fontSize: "1rem", borderRadius: "0.75rem", border: "1px solid rgba(255, 255, 255, 0.3)" },
    },
    danger: {
      sm: { padding: "0.375rem 0.75rem", fontSize: "0.875rem", borderRadius: "0.375rem", color: "#FCA5A5", border: "1px solid rgba(239, 68, 68, 0.4)" },
      md: { padding: "0.625rem 1.25rem", fontSize: "0.9375rem", borderRadius: "0.5rem", color: "#FCA5A5", border: "1px solid rgba(239, 68, 68, 0.4)" },
      lg: { padding: "0.875rem 1.75rem", fontSize: "1rem", borderRadius: "0.75rem", color: "#FCA5A5", border: "1px solid rgba(239, 68, 68, 0.4)" },
    },
  }

  const variantClasses = {
    primary: "bg-[#D4AF37] text-black hover:bg-[#E8C94A]",
    secondary: "bg-transparent text-[#D4AF37] hover:bg-[#F3E9C4] border border-[#D4AF37]",
    ghost: "bg-transparent text-white hover:bg-white/10",
    outline: "border border-white/30 text-white hover:bg-white/10",
    danger: "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20",
  }

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  }

  const baseClasses = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-focus focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Chargement...</span>
        </span>
      ) : (
        <>
          {leftIcon}
          <span className="flex-1 text-center">{props.children || ""}</span>
          {rightIcon}
        </>
      )}
    </button>
  )
}

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded bg-gray-200", className)} {...props} />
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-[#0A192F] text-white",
    success: "bg-[#18F37A] text-white",
    warning: "bg-[#F59E0B] text-black",
    error: "bg-[#EF4444] text-white",
    info: "bg-[#3B82F6] text-white",
  }

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", variants[variant], className)} {...props} />
  )
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

export function Card({ className, hoverable = false, children, ...props }: CardProps) {
  return (
    <div className={cn("bg-white rounded-xl border border-[#E5E7EB] shadow-sm", hoverable && "transition-shadow hover:shadow-lg cursor-pointer", className)} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 border-b border-[#E5E7EB]", className)} {...props} />
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-semibold text-[#0A192F]", className)} {...props} />
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-[#6B7280]", className)} {...props} />
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5", className)} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center justify-between p-5 border-t border-[#E5E7EB]", className)} {...props} />
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  className?: string
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\\\\s+/g, "-")
  return (
    <div className="space-y-1">
      {label && <label htmlFor={inputId} className="block text-sm font-medium text-[#374151]">{label}</label>}
      <input
        id={inputId}
        className={cn(
          "flex h-10 w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm placeholder:text-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export function Select({ label, error, options, className, id, ...props }: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\\\\s+/g, "-")
  return (
    <div className="space-y-1">
      {label && <label htmlFor={selectId} className="block text-sm font-medium text-[#374151]">{label}</label>}
      <select
        id={selectId}
        className={cn(
          "flex h-10 w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm placeholder:text-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

export interface FormMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "success" | "error" | "info"
}

export function FormMessage({ type = "info", className, children, ...props }: FormMessageProps) {
  const types = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  }
  return (
    <div className={cn("flex items-center gap-2 px-3 py-2 rounded-md border text-sm", types[type], className)} role="alert" {...props}>
      {type === "success" && <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
      {type === "error" && <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>}
      {type === "info" && <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" /></svg>}
      {children}
    </div>
  )
}

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "warning" | "error" | "success"
}

export function Alert({ variant = "info", className, children, ...props }: AlertProps) {
  const variants = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    error: "bg-red-50 border-red-200 text-red-800",
    success: "bg-green-50 border-green-200 text-green-800",
  }
  return (
    <div className={cn("border rounded-md p-4", variants[variant], className)} role="alert" {...props}>
      {children}
    </div>
  )
}

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function Modal({ isOpen, onClose, title, size = "md", children, className, ...props }: ModalProps) {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      {...props}
    >
      <div
        className={cn("w-full rounded-xl shadow-xl bg-white", sizes[size], className)}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || size !== "sm") && (
          <div className="flex items-center justify-between p-4 border-b border-[#E5E7EB]">
            <h2 className="text-lg font-semibold text-[#0A192F]">{title}</h2>
            <button
              onClick={onClose}
              className="rounded-md p-1 hover:bg-gray-100 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
`

fs.writeFileSync('/c/Users/elielb/alfaconstructions/src/components/ui/index.ts', content, 'utf8')
console.log('UI file written successfully')
