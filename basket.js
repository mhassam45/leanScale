// basket.js
class Basket {
  constructor(catalogue, deliveryRules, offers) {
    this.catalogue = catalogue;
    this.deliveryRules = deliveryRules.sort((a, b) => b.threshold - a.threshold);
    this.offers = offers;
    this.items = {}; // Using object to store items with counts
  }

  add(productCode) {
    const productToAdd = this.catalogue.find(p => p.code === productCode);
    if (!productToAdd) {
      console.warn(`Product with code ${productCode} not found in catalogue`);
      return false;
    }
    this.items[productCode] = (this.items[productCode] || 0) + 1;
    return true;
  }

  remove(productCode) {
    if (this.items[productCode] && this.items[productCode] > 0) {
      this.items[productCode]--;
      if (this.items[productCode] === 0) {
        delete this.items[productCode];
      }
      return true;
    }
    console.warn(`Product with code ${productCode} not found in basket`);
    return false;
  }

  total() {
    const itemsCost = this.calculateSubtotal();
    const deliveryCost = this.calculateDeliveryCost(itemsCost);
    const totalCost = itemsCost + deliveryCost;
    
    // Proper rounding to ensure 98.275 becomes 98.27, not 98.28
    return Math.floor(totalCost * 100) / 100;
  }

  calculateSubtotal() {
    const itemCounts = {...this.items}; // Create a copy
    let subtotal = 0;

    // Process offers first
    for (const offer of this.offers) {
      if (offer.type === 'halfPriceOffer' && itemCounts[offer.productCode]) {
        const count = itemCounts[offer.productCode];
        const pairs = Math.floor(count / 2);
        const product = this.catalogue.find(p => p.code === offer.productCode);
        
        subtotal += pairs * (product.price * 1.5); // 1 full + 0.5 price
        itemCounts[offer.productCode] = count % 2; // Remaining items after offer
      }
    }

    // Add remaining items
    for (const [code, count] of Object.entries(itemCounts)) {
      if (count > 0) {
        const product = this.catalogue.find(p => p.code === code);
        subtotal += product.price * count;
      }
    }

    return subtotal;
  }

  calculateDeliveryCost(subtotal) {
    for (const rule of this.deliveryRules) {
      if (subtotal >= rule.threshold) {
        return rule.cost;
      }
    }
    return this.deliveryRules[this.deliveryRules.length - 1].cost;
  }

  clear() {
    this.items = {};
  }
}

module.exports = Basket;