import dealData from '@/services/mockData/deals.json'

const STORAGE_KEY = 'dealforge-deals'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class DealService {
  constructor() {
    this.deals = this.loadDeals()
  }

  loadDeals() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : dealData
    } catch (error) {
      console.error('Failed to load deals from storage:', error)
      return dealData
    }
  }

  saveDeals() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.deals))
    } catch (error) {
      console.error('Failed to save deals to storage:', error)
    }
  }

  async getAll() {
    await delay(300)
    return [...this.deals]
  }

  async getById(id) {
    await delay(200)
    const deal = this.deals.find(deal => deal.Id === id)
    if (!deal) {
      throw new Error('Deal not found')
    }
    return { ...deal }
  }

  async getFeatured() {
    await delay(250)
    return this.deals.filter(deal => deal.featured).slice(0, 6)
  }

  async getByCategory(category) {
    await delay(300)
    return this.deals.filter(deal => 
      deal.category.toLowerCase() === category.toLowerCase()
    )
  }

  async create(dealData) {
    await delay(400)
    const newDeal = {
      ...dealData,
      Id: Math.max(...this.deals.map(d => d.Id)) + 1,
      createdAt: new Date().toISOString()
    }
    this.deals.push(newDeal)
    this.saveDeals()
    return { ...newDeal }
  }

  async update(id, dealData) {
    await delay(350)
    const index = this.deals.findIndex(deal => deal.Id === id)
    if (index === -1) {
      throw new Error('Deal not found')
    }
    this.deals[index] = { ...this.deals[index], ...dealData }
    this.saveDeals()
    return { ...this.deals[index] }
  }

  async delete(id) {
    await delay(300)
    const index = this.deals.findIndex(deal => deal.Id === id)
    if (index === -1) {
      throw new Error('Deal not found')
    }
    this.deals.splice(index, 1)
    this.saveDeals()
    return true
  }
}

export const dealService = new DealService()