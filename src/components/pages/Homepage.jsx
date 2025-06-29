import Hero from '@/components/organisms/Hero'
import CategoryGrid from '@/components/organisms/CategoryGrid'
import FeaturedDeals from '@/components/organisms/FeaturedDeals'

const Homepage = () => {
  return (
    <div>
      <Hero />
      <CategoryGrid />
      <FeaturedDeals />
    </div>
  )
}

export default Homepage