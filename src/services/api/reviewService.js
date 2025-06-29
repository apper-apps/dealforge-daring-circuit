import reviewData from '@/services/mockData/reviews.json'

const STORAGE_KEY = 'dealforge-reviews'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class ReviewService {
  constructor() {
    this.reviews = this.loadReviews()
  }

  loadReviews() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : reviewData
    } catch (error) {
      console.error('Failed to load reviews from storage:', error)
      return reviewData
    }
  }

  saveReviews() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.reviews))
    } catch (error) {
      console.error('Failed to save reviews to storage:', error)
    }
  }

  async getAll() {
    await delay(200)
    return [...this.reviews]
  }

  async getById(id) {
    await delay(150)
    const review = this.reviews.find(review => review.Id === id)
    if (!review) {
      throw new Error('Review not found')
    }
    return { ...review }
  }

  async getByDealId(dealId) {
    await delay(200)
    return this.reviews.filter(review => review.dealId === dealId)
  }

  async create(reviewData) {
    await delay(300)
    const newReview = {
      ...reviewData,
      Id: Math.max(...this.reviews.map(r => r.Id)) + 1,
      date: new Date().toISOString()
    }
    this.reviews.push(newReview)
    this.saveReviews()
    return { ...newReview }
  }

  async update(id, reviewData) {
    await delay(250)
    const index = this.reviews.findIndex(review => review.Id === id)
    if (index === -1) {
      throw new Error('Review not found')
    }
    this.reviews[index] = { ...this.reviews[index], ...reviewData }
    this.saveReviews()
    return { ...this.reviews[index] }
  }

  async delete(id) {
    await delay(200)
    const index = this.reviews.findIndex(review => review.Id === id)
    if (index === -1) {
      throw new Error('Review not found')
    }
    this.reviews.splice(index, 1)
    this.saveReviews()
    return true
  }
}

export const reviewService = new ReviewService()