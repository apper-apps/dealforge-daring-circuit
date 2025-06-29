import { motion } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const CartItem = ({ item, deal }) => {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(item.dealId)
    } else {
      updateQuantity(item.dealId, newQuantity)
    }
  }

  const subtotal = deal.salePrice * item.quantity

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
    >
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={deal.images?.[0] || `/api/placeholder/150/100`}
            alt={deal.title}
            className="w-20 h-16 object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="flex-grow">
          <div className="flex items-start justify-between">
            <div className="flex-grow">
              <h3 className="font-semibold text-gray-900 mb-1">{deal.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{deal.vendor}</p>
              <div className="flex items-center gap-2">
                <Badge variant="primary" size="sm">{deal.category}</Badge>
                <Badge variant="success" size="sm">{item.tier}</Badge>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.dealId)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
            >
              <ApperIcon name="Trash2" size={16} />
            </button>
          </div>

          {/* Quantity and Price */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Quantity:</span>
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  className="p-2 hover:bg-gray-100 transition-colors"
                  disabled={item.quantity <= 1}
                >
                  <ApperIcon name="Minus" size={14} />
                </button>
                <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <ApperIcon name="Plus" size={14} />
                </button>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-500">
                ${deal.salePrice} each
              </div>
              <div className="text-lg font-bold text-gray-900">
                ${subtotal.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CartItem