import { GIFTS } from './gifts.ts'

export const SITE_URL = 'https://spiritualgiftingstest.com'
export const SHARE_GIFT_COUNT = 3

export function giftSlug(giftIndex: number): string {
  return GIFTS[giftIndex].name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

/** Canonical slug for a set of gifts: order-independent, sorted by gift index. */
export function shareSlug(giftIndices: number[]): string {
  return [...giftIndices].sort((a, b) => a - b).map(giftSlug).join('--')
}

/** Inverse of shareSlug. Returns gift indices, or null if the slug isn't a valid share. */
export function parseShareSlug(slug: string): number[] | null {
  const parts = slug.split('--')
  if (parts.length !== SHARE_GIFT_COUNT) return null
  const indices = parts.map(p => GIFTS.findIndex((_, i) => giftSlug(i) === p))
  if (indices.some(i => i === -1) || new Set(indices).size !== indices.length) return null
  return indices
}

export function sharePath(giftIndices: number[]): string {
  return `/r/${shareSlug(giftIndices)}/`
}

/** "A, B & C" */
export function joinGiftNames(giftIndices: number[]): string {
  const names = giftIndices.map(i => GIFTS[i].name)
  return names.length > 1 ? `${names.slice(0, -1).join(', ')} & ${names[names.length - 1]}` : names.join('')
}
