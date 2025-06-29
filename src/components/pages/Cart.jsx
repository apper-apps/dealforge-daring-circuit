import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import { dealService } from '@/services/api/dealService'
import CartItem from '@/components/molecules/CartItem'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'

const Cart = () => {
  const { items, clearCart } = useCart()
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadDeals = async () => {
    try {
      setLoading(true)
      setError('')
      const allDeals = await dealService.getAll()
      const cartDeals = allDeals.filter(deal => 
        items.some(item => item.dealId === deal.Id)
      )
      setDeals(cartDeals)
    } catch (err) {
      setError('Failed to load cart items')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (items.length > 0) {
      loadDeals()
    } else {
      setLoading(false)
    }
  }, [items])

  const subtotal = items.reduce((sum, item) => {
    const deal = deals.find(d => d.Id === item.dealId)
    return sum + (deal?.salePrice || 0) * item.quantity
  }, 0)

  const originalTotal = items.reduce((sum, item) => {
    const deal = deals.find(d => d.Id === item.dealId)
    return sum + (deal?.originalPrice || 0) * item.quantity
  }, 0)

  const totalSavings = originalTotal - subtotal

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadDeals} />

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Empty
          title="Your cart is empty"
          description="Discover amazing software deals and start building your toolkit today!"
          actionText="Browse Deals"
          onAction={() => window.location.href = '/browse'}
          icon="ShoppingCart"
        />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2 font-display">
          Shopping Cart
        </h1>
        <p className="text-gray-600">
          {items.length} item{items.length !== 1 ? 's' : ''} in your cart
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map(item => {
              const deal = deals.find(d => d.Id === item.dealId)
              if (!deal) return null
              return (
                <CartItem
                  key={item.dealId}
                  item={item}
                  deal={deal}
                />
              )
            })}
          </AnimatePresence>

          {/* Clear Cart */}
          <div className="flex justify-end pt-4">
            <button
              onClick={clearCart}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors"
            >
              <ApperIcon name="Trash2" size={16} />
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card sticky top-24"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Original Price</span>
                <span className="line-through">${originalTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-success-600 font-semibold">
                <span>You Save</span>
                <span>${totalSavings.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="orange"
                size="lg"
                icon="CreditCard"
                className="w-full"
                onClick={() => alert('Checkout functionality would be implemented here')}
              >
                Proceed to Checkout
              </Button>
              
              <Link to="/browse">
                <Button variant="outline" size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <ApperIcon name="Shield" size={16} className="text-success-500" />
                  <span>60-day money-back guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <ApperIcon name="Lock" size={16} className="text-success-500" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <ApperIcon name="Download" size={16} className="text-success-500" />
                  <span>Instant download after purchase</span>
                </div>
                <div className="flex items-center gap-2">
                  <ApperIcon name="LifeBuoy" size={16} className="text-success-500" />
                  <span>Lifetime updates included</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Cart