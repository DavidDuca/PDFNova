export default function Button({
  children,
  onClick,
  variant = 'primary',
  size    = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 select-none'

  const variants = {
    primary:   'bg-brand-500 text-white hover:bg-brand-600 active:scale-95 shadow-card hover:shadow-float disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
    secondary: 'bg-white text-brand-600 border border-brand-200 hover:bg-brand-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
    danger:    'bg-accent-500 text-white hover:bg-red-600 active:scale-95 shadow-card disabled:opacity-50 disabled:cursor-not-allowed',
    ghost:     'text-gray-600 hover:text-brand-600 hover:bg-brand-50 active:scale-95',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      )}
      {children}
    </button>
  )
}
