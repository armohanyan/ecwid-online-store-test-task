export {}

declare global {
  interface Window {
    Ecwid?: {
      init: () => void
      refreshConfig: () => void
      Cart?: {
        addProduct: (id: number) => void
      }
      OnPageLoad: {
        add: (callback: () => void) => void
      }
      OnPageLoaded: {
        add: (callback: (page: { type: string }) => void) => void
      }
    }
    ec?: {
      order?: {
        extraFields?: {
          [key: string]: {
            title: string
            value: string
            type: 'TEXT' | 'DATE' | 'SELECT' | 'CHECKBOX' | 'TEXTAREA'
            orderDetailsDisplaySection?: 'order_comments' | 'shipping_address' | 'billing_address'
            showInCustomerOrderDetails?: boolean
            showInInvoices?: boolean
            showInNotifications?: boolean
          }
        }
      }
    }
    xProductBrowser: (...args: string[]) => void
  }
}