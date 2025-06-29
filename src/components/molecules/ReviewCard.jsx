import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'

const ReviewCard = ({ review, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center text-white font-semibold">
            {review.author.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Review Content */}
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">{review.author}</h4>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(review.date), { addSuffix: true })}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <ApperIcon
                key={i}
                name="Star"
                size={16}
                className={i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {review.rating}/5
            </span>
          </div>

          {/* Comment */}
          <p className="text-gray-700 leading-relaxed">
            {review.comment}
          </p>

          {/* Helpful Button */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-600 transition-colors">
              <ApperIcon name="ThumbsUp" size={14} />
              Helpful
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-600 transition-colors">
              <ApperIcon name="MessageCircle" size={14} />
              Reply
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ReviewCard