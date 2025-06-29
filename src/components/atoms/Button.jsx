import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white focus:ring-brand-500 shadow-lg hover:shadow-xl transform hover:scale-105',
    secondary: 'bg-white border-2 border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white focus:ring-brand-500 shadow-md hover:shadow-lg',
    orange: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white focus:ring-orange-500 shadow-lg hover:shadow-xl transform hover:scale-105',
    success: 'bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white focus:ring-success-500 shadow-lg hover:shadow-xl transform hover:scale-105',
    outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-brand-500 hover:border-brand-300'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`

  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: variant === 'primary' || variant === 'orange' || variant === 'success' ? 1.05 : 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <ApperIcon name="Loader2" size={iconSizes[size]} className="animate-spin mr-2" />
      )}
      {!loading && icon && iconPosition === 'left' && (
        <ApperIcon name={icon} size={iconSizes[size]} className="mr-2" />
      )}
      {children}
      {!loading && icon && iconPosition === 'right' && (
        <ApperIcon name={icon} size={iconSizes[size]} className="ml-2" />
      )}
    </motion.button>
  )
}

export default Button