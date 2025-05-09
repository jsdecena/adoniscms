// const generatedCode = generateCode();
// console.log(generatedCode); // Output: R9HJW-KSWFN-2024
export const generateMembershipCode = (): string => {
  const getRandomPart = (): string => {
    return Math.random().toString(36).substr(2, 5).toUpperCase()
  }

  const year = new Date().getFullYear().toString()

  const part1 = getRandomPart()
  const part2 = getRandomPart()

  return `${part1}-${part2}-${year}`
}

/**
 * Generate random string
 * @param len
 * @param an
 * @returns
 */
export const randomStringGenerator = (len: number = 12, an?: string) => {
  an = an && an.toLowerCase()
  let str = ''
  let i = 0
  const min = an === 'a' ? 10 : 0
  const max = an === 'n' ? 10 : 62
  for (; i++ < len; ) {
    let r = (Math.random() * (max - min) + min) << 0
    str += String.fromCharCode((r += r > 9 ? (r < 36 ? 55 : 61) : 48))
  }
  return str
}

/**
 * Generate 6 digit OTP
 * @returns
 */
export const generateOTP = (): number => {
  return Math.floor(100000 + Math.random() * 900000)
}

export const slugify = (word: string): string => {
  // Replace special characters with "-"
  return word
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w\s-]/g, '') // Remove special characters except space and hyphen
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace consecutive hyphens with a single hyphen
    .trim() // Trim leading and trailing spaces
}
