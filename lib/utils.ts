export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function formatPrice(price: string): string {
  return price.replace(/₹/g, '₹')
}

export function getInstagramDMUrl(): string {
  return 'https://instagram.com/'
}

export function generateProjectUrl(slug: string): string {
  return `/projects#${slug}`
}
