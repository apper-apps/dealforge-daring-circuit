import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { dealService } from '@/services/api/dealService'
import FilterSidebar from '@/components/molecules/FilterSidebar'
import DealCard from '@/components/molecules/DealCard'
import SearchBar from '@/components/molecules/SearchBar'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [deals, setDeals] = useState([])
  const [filteredDeals, setFilteredDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 500],
    minRating: 0,
    minDiscount: 0
  })

  const loadDeals = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await dealService.getAll()
      setDeals(response)
    } catch (err) {
      setError('Failed to load deals')
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...deals]
    const searchQuery = searchParams.get('search')?.toLowerCase()

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(deal =>
        deal.title.toLowerCase().includes(searchQuery) ||
        deal.description.toLowerCase().includes(searchQuery) ||
        deal.vendor.toLowerCase().includes(searchQuery) ||
        deal.tags?.some(tag => tag.toLowerCase().includes(searchQuery))
      )
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(deal =>
        filters.categories.includes(deal.category)
      )
    }

    // Price filter
    filtered = filtered.filter(deal =>
      deal.salePrice >= filters.priceRange[0] && deal.salePrice <= filters.priceRange[1]
    )

    // Rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter(deal => deal.rating >= filters.minRating)
    }

    // Discount filter
    if (filters.minDiscount > 0) {
      filtered = filtered.filter(deal => {
        const discount = ((deal.originalPrice - deal.salePrice) / deal.originalPrice) * 100
        return discount >= filters.minDiscount
      })
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.salePrice - b.salePrice)
        break
      case 'price-high':
        filtered.sort((a, b) => b.salePrice - a.salePrice)
        break
      case 'discount':
        filtered.sort((a, b) => {
          const discountA = ((a.originalPrice - a.salePrice) / a.originalPrice) * 100
          const discountB = ((b.originalPrice - b.salePrice) / b.originalPrice) * 100
          return discountB - discountA
        })
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'ending-soon':
        filtered.sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
        break
      default:
        // Featured/default order
        break
    }

    setFilteredDeals(filtered)
  }

  const handleSearch = (query) => {
    if (query.trim()) {
      setSearchParams({ search: query })
    } else {
      setSearchParams({})
    }
  }

  useEffect(() => {
    loadDeals()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [deals, filters, sortBy, searchParams])

  if (loading) return <Loading type="deals" />
  if (error) return <Error message={error} onRetry={loadDeals} />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-4 font-display"
        >
          Browse Software Deals
        </motion.h1>
        
        {/* Search and Sort */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex-1 max-w-md">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search for software deals..."
            />
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
              <option value="rating">Highest Rated</option>
              <option value="ending-soon">Ending Soon</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            className="sticky top-24"
          />
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              {filteredDeals.length} deal{filteredDeals.length !== 1 ? 's' : ''} found
              {searchParams.get('search') && (
                <span className="ml-1">
                  for "{searchParams.get('search')}"
                </span>
              )}
            </p>
          </div>

          {/* Deal Grid */}
          {filteredDeals.length === 0 ? (
            <Empty
              title="No deals match your criteria"
              description="Try adjusting your filters or search terms to find more deals."
              actionText="Clear Filters"
              onAction={() => {
                setFilters({
                  categories: [],
                  priceRange: [0, 500],
                  minRating: 0,
                  minDiscount: 0
                })
                setSearchParams({})
              }}
              icon="Search"
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredDeals.map((deal, index) => (
                <DealCard key={deal.Id} deal={deal} index={index} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Browse