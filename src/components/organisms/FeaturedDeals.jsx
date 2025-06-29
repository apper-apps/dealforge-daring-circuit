import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { dealService } from '@/services/api/dealService'
import DealCard from '@/components/molecules/DealCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Button from '@/components/atoms/Button'

const FeaturedDeals = () => {
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadDeals = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await dealService.getAll()
      // Get first 6 deals as featured
      setDeals(response.slice(0, 6))
    } catch (err) {
      setError('Failed to load featured deals')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDeals()
  }, [])

  if (loading) return <Loading type="deals" />
  if (error) return <Error message={error} onRetry={loadDeals} />
  if (deals.length === 0) return <Empty title="No featured deals available" />

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4 font-display"
          >
            🔥 Featured Deals
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Hand-picked premium software deals with massive discounts for entrepreneurs and growing businesses
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {deals.map((deal, index) => (
            <DealCard key={deal.Id} deal={deal} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link to="/browse">
            <Button variant="primary" size="lg" icon="ArrowRight">
              View All Deals
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedDeals