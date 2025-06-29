import { motion } from 'framer-motion'

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '',
  animate = false,
  ...props 
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-brand-100 text-brand-800',
    success: 'bg-success-100 text-success-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    orange: 'bg-orange-100 text-orange-800',
    discount: 'bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold shadow-lg'
  }
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  const classes = `inline-flex items-center justify-center rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`

  const BadgeComponent = (
    <span className={classes} {...props}>
      {children}
    </span>
  )

  if (animate) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        {BadgeComponent}
      </motion.div>
    )
  }

  return BadgeComponent
}

export default Badge