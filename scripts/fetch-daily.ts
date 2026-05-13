import { writeFile, mkdir } from 'node:fs/promises'
import { gzip } from 'node:zlib'
import { promisify } from 'node:util'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const gzipAsync = promisify(gzip)

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const BASE = 'https://overfast-api.tekrop.fr'
const PLATFORM = 'PC'
const GAMEMODE = 'COMPETITIVE'
const REGION = 'ASIA'

const DIVISIONS = [
  'bronze', 'silver', 'gold', 'platinum', 'diamond', 'master', 'grandmaster',
] as const
type Division = (typeof DIVISIONS)[number]

// Gamemodes that count as competitive maps
const COMPETITIVE_GAMEMODES = new Set([
  'hybrid', 'escort', 'control', 'push', 'clash', 'flashpoint',
])

interface RawStat {
  hero: string
  pickrate: number
  winrate: number
}

interface OverfastMap {
  key: string
  name: string
  gamemodes: string[]
}

// ── Utilities ──────────────────────────────────────────────────────────────

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

async function apiFetch<T>(url: string, retries = 3): Promise<T | null> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url)
      if (res.ok) return res.json() as Promise<T>
      if ((res.status === 429 || res.status === 503) && attempt < retries) {
        await sleep(2 ** attempt * 1000) // 1s, 2s, 4s
        continue
      }
      console.warn(`  ✗ HTTP ${res.status}  ${url}`)
      return null
    } catch {
      if (attempt >= retries) { console.warn(`  ✗ 네트워크 오류  ${url}`); return null }
      await sleep(2 ** attempt * 1000)
    }
  }
  return null
}

const toISODate = () => new Date().toISOString().slice(0, 10)

// ── Part A: global per-division snapshots ──────────────────────────────────

async function runGlobal(date: string): Promise<{ ok: number; total: number }> {
  const total = DIVISIONS.length
  let ok = 0

  for (const division of DIVISIONS) {
    const params = new URLSearchParams({
      platform: PLATFORM,
      gamemode: GAMEMODE,
      region: REGION,
      competitive_division: division,
    })
    const heroes = await apiFetch<RawStat[]>(`${BASE}/heroes/stats?${params}`)
    await sleep(500)

    if (!heroes) { console.warn(`  ✗ 글로벌/${division} 수집 실패`); continue }

    const outDir = join(ROOT, 'public', 'data', 'snapshots', division)
    await mkdir(outDir, { recursive: true })
    await writeFile(
      join(outDir, `${date}.json`),
      JSON.stringify({ date, division, generatedAt: new Date().toISOString(), heroes }, null, 2),
    )
    ok++
  }

  return { ok, total }
}

// ── Part B: per-map per-division archive (gzipped) ─────────────────────────

async function fetchCompetitiveMaps(): Promise<OverfastMap[]> {
  const maps = await apiFetch<OverfastMap[]>(`${BASE}/maps`)
  if (!maps) throw new Error('/maps 응답 실패')
  return maps.filter((m) => m.gamemodes.some((g) => COMPETITIVE_GAMEMODES.has(g)))
}

async function runMapArchive(
  date: string,
  maps: OverfastMap[],
): Promise<{ ok: number; total: number }> {
  const total = maps.length * DIVISIONS.length
  let ok = 0

  type MapResult = Partial<Record<Division, RawStat[]>>
  const result: Record<string, MapResult> = {}

  for (const map of maps) {
    result[map.key] = {}
    for (const division of DIVISIONS) {
      const params = new URLSearchParams({
        platform: PLATFORM,
        gamemode: GAMEMODE,
        region: REGION,
        competitive_division: division,
        map: map.key,
      })
      const heroes = await apiFetch<RawStat[]>(`${BASE}/heroes/stats?${params}`)
      await sleep(500)

      if (heroes) { result[map.key][division] = heroes; ok++ }
      else { console.warn(`  ✗ 맵/${map.key}/${division} 수집 실패`) }
    }
  }

  const archiveDir = join(ROOT, 'public', 'data', 'maps-archive', date.slice(0, 7))
  await mkdir(archiveDir, { recursive: true })

  const raw = Buffer.from(
    JSON.stringify({ date, generatedAt: new Date().toISOString(), maps: result }),
  )
  const compressed = await gzipAsync(raw)
  await writeFile(join(archiveDir, `${date}.json.gz`), compressed)

  const rawKB  = Math.round(raw.length / 1024)
  const compKB = Math.round(compressed.length / 1024)
  const pct    = Math.round((1 - compressed.length / raw.length) * 100)
  console.log(`📦 압축 저장: ${rawKB}KB → ${compKB}KB (${pct}% 감소)`)

  return { ok, total }
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const date = toISODate()
  console.log(`\n🔄 fetch-daily  ${date}\n`)

  // Part A
  const g = await runGlobal(date)
  if (g.ok === g.total) {
    console.log(`✓ 글로벌: ${g.ok}/${g.total} 티어 수집 완료`)
  } else {
    console.log(`⚠ 글로벌: ${g.ok}/${g.total} 완료 (일부 실패)`)
  }

  // Part B
  const maps = await fetchCompetitiveMaps()
  const m = await runMapArchive(date, maps)
  if (m.ok === m.total) {
    console.log(`✓ 맵: ${m.ok}/${m.total} 수집 완료 (${maps.length}맵 × ${DIVISIONS.length}티어)`)
  } else {
    console.log(`⚠ 맵: ${m.ok}/${m.total} 완료 (일부 실패 — 다음 날 재시도)`)
  }

  console.log(g.ok === g.total && m.ok === m.total ? '\n✅ 전체 수집 완료' : '\n⚠ 부분 수집 완료')
}

main().catch((err) => {
  console.error('\n💥 fatal:', err)
  process.exit(1)
})
