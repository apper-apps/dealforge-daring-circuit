import { motion } from 'framer-motion'

const Loading = ({ type = 'deals' }) => {
  const renderDealsGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 animate-shimmer bg-gradient-shimmer bg-[length:200%_100%]" />
          <div className="p-6 space-y-4">
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-shimmer bg-gradient-shimmer bg-[length:200%_100%]" />
            <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 animate-shimmer bg-gradient-shimmer bg-[length:200%_100%]" />
            <div className="flex items-center justify-between">
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 animate-shimmer bg-gradient-shimmer bg-[length:200%_100%]" />
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 animate-shimmer bg-gradient-shimmer bg-[length:200%_100%]" />
            </div>
            <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-shimmer bg-gradient-shimmer bg-[length:200%_100%]" />
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderDealDetail = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="h-80 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-shimmer bg-gradient-shimmer bg-[length:200%_100%]" />
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-shimmer bg-gradient-shimmer bg-[length:200%_100%]" />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-shimmer bg-gradient-shimmer bg-[length:200%_100%]" />
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 animate-shimmer bg-gradient-shimmer bg-[length:200%_100%]" />
          <div className="h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-shimmer bg-gradient-shimmer bg-[length:200%_100%]" />
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-shimmer bg-gradient-shimmer bg-[length:200%_100%]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="animate-pulse">
      {type === 'deals' && renderDealsGrid()}
      {type === 'detail' && renderDealDetail()}
    </div>
  )
}

export default Loading