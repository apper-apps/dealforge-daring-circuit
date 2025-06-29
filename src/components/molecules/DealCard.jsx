import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '@/hooks/useCart'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import CountdownTimer from '@/components/molecules/CountdownTimer'
import ApperIcon from '@/components/ApperIcon'

const DealCard = ({ deal, index = 0 }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(deal.Id, 1, 'single')
  }

  const discountPercent = Math.round(((deal.originalPrice - deal.salePrice) / deal.originalPrice) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="deal-card group"
    >
      <Link to={`/deal/${deal.Id}`} className="block">
        {/* Image Section */}
        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <img
            src={deal.images?.[0] || `/api/placeholder/400/300`}
            alt={deal.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Discount Badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="discount" animate className="text-white font-bold">
              -{discountPercent}%
            </Badge>
          </div>
          
          {/* Countdown Timer */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg p-2">
            <CountdownTimer endDate={deal.endDate} />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Vendor & Category */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-brand-600 font-medium">{deal.vendor}</span>
            <Badge variant="primary" size="sm">{deal.category}</Badge>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors font-display">
            {deal.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {deal.description}
          </p>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <ApperIcon
                  key={i}
                  name="Star"
                  size={16}
                  className={i < Math.floor(deal.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {deal.rating} ({deal.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">
                ${deal.salePrice}
              </span>
              <span className="text-lg text-gray-500 line-through">
                ${deal.originalPrice}
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">You save</div>
              <div className="text-lg font-bold text-success-600">
                ${deal.originalPrice - deal.salePrice}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {deal.tags?.slice(0, 3).map(tag => (
              <Badge key={tag} variant="default" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Link>

      {/* Action Button */}
      <div className="px-6 pb-6">
        <Button
          onClick={handleAddToCart}
          variant="orange"
          className="w-full"
          icon="ShoppingCart"
        >
          Add to Cart
        </Button>
      </div>
    </motion.div>
  )
}

export default DealCard