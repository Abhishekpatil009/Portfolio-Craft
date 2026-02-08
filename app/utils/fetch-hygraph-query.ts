export async function fetchHygraphQuery(
  query: string,
  revalidate?: number
) {
  const res = await fetch(process.env.HYGRAPH_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
    },
    body: JSON.stringify({ query }),

    // ✅ Dev-friendly + safe
    cache: revalidate ? 'force-cache' : 'no-store',
    next: revalidate ? { revalidate } : undefined,
  })

  if (!res.ok) {
    throw new Error('Failed to fetch Hygraph data')
  }

  const json = await res.json()

  // ✅ THIS WAS THE ROOT CAUSE
  return json.data
}
