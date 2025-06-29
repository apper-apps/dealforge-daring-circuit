import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const FilterSidebar = ({ filters, onFiltersChange, className = "" }) => {
  const [priceRange, setPriceRange] = useState(filters.priceRange || [0, 500])
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: true,
    discount: true
  })

  const categories = [
    'Marketing', 'Productivity', 'Design', 'Development', 'Analytics', 'Communication'
  ]

  const discountRanges = [
    { label: '90%+ Off', value: 90 },
    { label: '80%+ Off', value: 80 },
    { label: '70%+ Off', value: 70 },
    { label: '50%+ Off', value: 50 }
  ]

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const updateFilters = (newFilters) => {
    onFiltersChange({ ...filters, ...newFilters })
  }

  const clearAllFilters = () => {
    setPriceRange([0, 500])
    onFiltersChange({
      categories: [],
      priceRange: [0, 500],
      minRating: 0,
      minDiscount: 0
    })
  }

  const activeFiltersCount = [
    filters.categories?.length || 0,
    filters.minRating > 0 ? 1 : 0,
    filters.minDiscount > 0 ? 1 : 0,
    (filters.priceRange?.[0] > 0 || filters.priceRange?.[1] < 500) ? 1 : 0
  ].reduce((a, b) => a + b, 0)

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">{activeFiltersCount}</Badge>
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Categories */}
        <div>
          <button
            onClick={() => toggleSection('categories')}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-medium text-gray-900">Categories</span>
            <ApperIcon 
              name={expandedSections.categories ? "ChevronUp" : "ChevronDown"} 
              size={16}
              className="text-gray-400"
            />
          </button>
          
          <AnimatePresence>
            {expandedSections.categories && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-3 space-y-2 overflow-hidden"
              >
                {categories.map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.categories?.includes(category) || false}
                      onChange={(e) => {
                        const newCategories = e.target.checked
                          ? [...(filters.categories || []), category]
                          : (filters.categories || []).filter(c => c !== category)
                        updateFilters({ categories: newCategories })
                      }}
                      className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{category}</span>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price Range */}
        <div>
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-medium text-gray-900">Price Range</span>
            <ApperIcon 
              name={expandedSections.price ? "ChevronUp" : "ChevronDown"} 
              size={16}
              className="text-gray-400"
            />
          </button>
          
          <AnimatePresence>
            {expandedSections.price && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-3 overflow-hidden"
              >
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const newRange = [priceRange[0], parseInt(e.target.value)]
                      setPriceRange(newRange)
                      updateFilters({ priceRange: newRange })
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>$0</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Rating */}
        <div>
          <button
            onClick={() => toggleSection('rating')}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-medium text-gray-900">Minimum Rating</span>
            <ApperIcon 
              name={expandedSections.rating ? "ChevronUp" : "ChevronDown"} 
              size={16}
              className="text-gray-400"
            />
          </button>
          
          <AnimatePresence>
            {expandedSections.rating && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-3 space-y-2 overflow-hidden"
              >
                {[4, 3, 2, 1].map(rating => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.minRating === rating}
                      onChange={() => updateFilters({ minRating: rating })}
                      className="text-brand-600 focus:ring-brand-500"
                    />
                    <div className="ml-2 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <ApperIcon
                          key={i}
                          name={i < rating ? "Star" : "Star"}
                          size={16}
                          className={i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-700">& up</span>
                    </div>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Discount */}
        <div>
          <button
            onClick={() => toggleSection('discount')}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-medium text-gray-900">Discount</span>
            <ApperIcon 
              name={expandedSections.discount ? "ChevronUp" : "ChevronDown"} 
              size={16}
              className="text-gray-400"
            />
          </button>
          
          <AnimatePresence>
            {expandedSections.discount && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-3 space-y-2 overflow-hidden"
              >
                {discountRanges.map(range => (
                  <label key={range.value} className="flex items-center">
                    <input
                      type="radio"
                      name="discount"
                      checked={filters.minDiscount === range.value}
                      onChange={() => updateFilters({ minDiscount: range.value })}
                      className="text-brand-600 focus:ring-brand-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar