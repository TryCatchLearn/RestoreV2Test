export interface Order {
  id: number
  buyerEmail: string
  shippingAddress: ShippingAddress
  paymentSummary: PaymentSummary
  orderDate: string
  orderItems: OrderItem[]
  subtotal: number
  deliveryFee: number
  discount: number
  orderStatus: string
  total: number
}

export interface ShippingAddress {
  name: string
  line1: string
  line2: string | null
  city: string
  state: string
  postal_code: string
  country: string
}

export interface PaymentSummary {
  last4: string
  brand: string
  exp_month: number
  exp_year: number
}

export interface OrderItem {
  productId: number
  name: string
  pictureUrl: string
  price: number
  quantity: number
}

export interface CreateOrder {
    shippingAddress: ShippingAddress
    paymentSummary: PaymentSummary
}