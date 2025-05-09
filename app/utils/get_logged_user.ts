import type { HttpContext } from '@adonisjs/core/http'

/**
 * Helper to get the logged-in user for a given guard
 * @param ctx HttpContext
 * @param guard string (optional)
 * @returns the user instance or undefined
 */
export function getLoggedUser<T = any>(ctx: HttpContext, guard: 'web' | 'partner' = 'web'): T | undefined {
  // @ts-ignore
  return ctx.auth.use(guard).user as T | undefined
}
