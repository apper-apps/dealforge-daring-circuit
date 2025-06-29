import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No deals found", 
  description = "Try adjusting your filters or check back later for new deals.",
  actionText = "Browse All Deals",
  onAction,
  icon = "Package",
  className = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}
    >
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatDelay: 2
        }}
        className="mb-6"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-brand-100 to-brand-200 rounded-full flex items-center justify-center">
          <ApperIcon name={icon} size={48} className="text-brand-500" />
        </div>
      </motion.div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2 font-display">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {description}
      </p>
      
      {onAction && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="btn-primary flex items-center gap-2"
        >
          <ApperIcon name="Search" size={18} />
          {actionText}
        </motion.button>
      )}
      
      <div className="mt-8 flex gap-4 opacity-60">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3
            }}
            className="w-2 h-2 bg-brand-400 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  )
}

export default Empty