import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { dealService } from '@/services/api/dealService'
import { reviewService } from '@/services/api/reviewService'
import { useCart } from '@/hooks/useCart'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import CountdownTimer from '@/components/molecules/CountdownTimer'
import ReviewCard from '@/components/molecules/ReviewCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'

const DealDetail = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [deal, setDeal] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedTier, setSelectedTier] = useState('single')
  const [selectedImage, setSelectedImage] = useState(0)

  const loadDeal = async () => {
    try {
      setLoading(true)
      setError('')
      const dealData = await dealService.getById(parseInt(id))
      const reviewsData = await reviewService.getByDealId(parseInt(id))
      setDeal(dealData)
      setReviews(reviewsData)
    } catch (err) {
      setError('Failed to load deal details')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDeal()
  }, [id])

  const handleAddToCart = () => {
    addToCart(deal.Id, 1, selectedTier)
  }

  if (loading) return <Loading type="detail" />
  if (error) return <Error message={error} onRetry={loadDeal} />
  if (!deal) return <Error message="Deal not found" />

  const discountPercent = Math.round(((deal.originalPrice - deal.salePrice) / deal.originalPrice) * 100)
  const savings = deal.originalPrice - deal.salePrice

  const tiers = [
    {
      id: 'single',
      name: 'Single License',
      price: deal.salePrice,
      originalPrice: deal.originalPrice,
      description: 'Perfect for individual use'
    },
    {
      id: 'team',
      name: 'Team License (5 users)',
      price: deal.salePrice * 3,
      originalPrice: deal.originalPrice * 3,
      description: 'Great for small teams'
    },
    {
      id: 'business',
      name: 'Business License (Unlimited)',
      price: deal.salePrice * 5,
      originalPrice: deal.originalPrice * 5,
      description: 'For growing businesses'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <ApperIcon name="ChevronRight" size={16} />
        <Link to="/browse" className="hover:text-brand-600">Browse</Link>
        <ApperIcon name="ChevronRight" size={16} />
        <span className="text-gray-900">{deal.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Images */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-video bg-gray-100 rounded-xl overflow-hidden"
          >
            <img
              src={deal.images?.[selectedImage] || `/api/placeholder/600/400`}
              alt={deal.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {deal.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {deal.images.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-brand-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${deal.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Deal Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="primary">{deal.category}</Badge>
              <Badge variant="discount">-{discountPercent}%</Badge>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 font-display">
              {deal.title}
            </h1>
            <p className="text-xl text-gray-600">by {deal.vendor}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              {[...Array(5)].map((_, i) => (
                <ApperIcon
                  key={i}
                  name="Star"
                  size={20}
                  className={i < Math.floor(deal.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-lg text-gray-600">
              {deal.rating} ({deal.reviewCount} reviews)
            </span>
          </div>

          {/* Countdown */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-orange-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Deal ends in:</h3>
                <CountdownTimer endDate={deal.endDate} />
              </div>
              <ApperIcon name="Clock" size={48} className="text-orange-500" />
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{deal.description}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">What's Included</h3>
            <ul className="space-y-2">
              {deal.features?.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <ApperIcon name="Check" size={20} className="text-success-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {deal.tags?.map(tag => (
              <Badge key={tag} variant="default" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-display">
          Choose Your License
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <motion.div
              key={tier.id}
              whileHover={{ y: -4 }}
              className={`card cursor-pointer transition-all duration-200 ${
                selectedTier === tier.id ? 'ring-2 ring-brand-500 shadow-xl' : ''
              }`}
              onClick={() => setSelectedTier(tier.id)}
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {tier.name}
                </h3>
                <p className="text-gray-600 mb-4">{tier.description}</p>
                <div className="mb-4">
                  <div className="text-3xl font-bold text-gray-900">
                    ${tier.price}
                  </div>
                  <div className="text-lg text-gray-500 line-through">
                    ${tier.originalPrice}
                  </div>
                  <div className="text-success-600 font-semibold">
                    Save ${tier.originalPrice - tier.price}
                  </div>
                </div>
                {selectedTier === tier.id && (
                  <Badge variant="success" className="mb-4">
                    Selected
                  </Badge>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Purchase Section */}
      <div className="bg-gradient-to-r from-brand-50 to-brand-100 rounded-2xl p-8 mb-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">
            Get This Deal Now!
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Join thousands of entrepreneurs who have transformed their business with this software
          </p>
          
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">
                ${tiers.find(t => t.id === selectedTier)?.price}
              </div>
              <div className="text-gray-500">One-time payment</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-success-600">
                ${tiers.find(t => t.id === selectedTier)?.originalPrice - tiers.find(t => t.id === selectedTier)?.price}
              </div>
              <div className="text-gray-500">Total savings</div>
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            variant="orange"
            size="lg"
            icon="ShoppingCart"
            className="text-xl px-12 py-4 mb-4"
          >
            Add to Cart
          </Button>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <ApperIcon name="Shield" size={16} className="text-success-500" />
              60-day money back guarantee
            </div>
            <div className="flex items-center gap-2">
              <ApperIcon name="Download" size={16} className="text-success-500" />
              Instant download
            </div>
            <div className="flex items-center gap-2">
              <ApperIcon name="LifeBuoy" size={16} className="text-success-500" />
              Lifetime updates
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      {reviews.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 font-display">
            Customer Reviews
          </h2>
          <div className="space-y-6">
            {reviews.slice(0, 5).map((review, index) => (
              <ReviewCard key={review.Id} review={review} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DealDetail