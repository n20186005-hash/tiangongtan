import type { APIRoute } from 'astro';

export const prerender = false;

const LAT = 24.799498;
const LON = 120.957721;
const CACHE_TTL_MS = 30 * 60 * 1000;

interface CachedWeather {
  fetchedAt: number;
  payload: unknown;
}

let memoryCache: CachedWeather | null = null;

const WEATHER_CODES: Record<number, { label: string; icon: string }> = {
  0: { label: '晴朗', icon: '☀️' },
  1: { label: '大致晴朗', icon: '🌤️' },
  2: { label: '局部多雲', icon: '⛅' },
  3: { label: '陰天', icon: '☁️' },
  45: { label: '有霧', icon: '🌫️' },
  48: { label: '霧淞', icon: '🌫️' },
  51: { label: '細雨', icon: '🌦️' },
  53: { label: '毛毛雨', icon: '🌦️' },
  55: { label: '強毛毛雨', icon: '🌧️' },
  56: { label: '凍毛毛雨', icon: '🌧️' },
  57: { label: '強凍毛毛雨', icon: '🌧️' },
  61: { label: '小雨', icon: '🌧️' },
  63: { label: '中雨', icon: '🌧️' },
  65: { label: '大雨', icon: '🌧️' },
  66: { label: '凍雨', icon: '🌧️' },
  67: { label: '強凍雨', icon: '🌧️' },
  71: { label: '小雪', icon: '🌨️' },
  73: { label: '中雪', icon: '🌨️' },
  75: { label: '大雪', icon: '❄️' },
  77: { label: '雪粒', icon: '🌨️' },
  80: { label: '陣雨', icon: '🌦️' },
  81: { label: '強陣雨', icon: '🌧️' },
  82: { label: '暴雨', icon: '⛈️' },
  85: { label: '陣雪', icon: '🌨️' },
  86: { label: '強陣雪', icon: '❄️' },
  95: { label: '雷陣雨', icon: '⛈️' },
  96: { label: '雷陣雨伴冰雹', icon: '⛈️' },
  99: { label: '強雷暴冰雹', icon: '⛈️' }
};

function describe(code: number) {
  return WEATHER_CODES[code] ?? { label: '多變天氣', icon: '🌡️' };
}

function transform(data: any) {
  const current = data.current ?? {};
  const daily = data.daily ?? {};
  const todayCode = Number(current.weather_code ?? 0);
  const todayDesc = describe(todayCode);
  const popToday = Array.isArray(daily.precipitation_probability_max)
    ? daily.precipitation_probability_max[0]
    : undefined;
  const rainCodes = [61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99];
  const needUmbrella =
    (Number(current.precipitation ?? 0) > 0.1) ||
    (typeof popToday === 'number' && popToday >= 50) ||
    rainCodes.includes(todayCode);

  const days = (daily.time ?? []).map((t: string, i: number) => {
    const d = describe(Number(daily.weather_code?.[i] ?? 0));
    return {
      date: t,
      code: Number(daily.weather_code?.[i] ?? 0),
      label: d.label,
      icon: d.icon,
      tmax: daily.temperature_2m_max?.[i],
      tmin: daily.temperature_2m_min?.[i],
      pop: daily.precipitation_probability_max?.[i],
      uvMax: daily.uv_index_max?.[i]
    };
  });

  return {
    updatedAt: current.time,
    current: {
      temp: current.temperature_2m,
      feels: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      wind: current.wind_speed_10m,
      code: todayCode,
      label: todayDesc.label,
      icon: todayDesc.icon,
      precipitation: current.precipitation,
      uv: current.uv_index
    },
    needUmbrella,
    popToday,
    days
  };
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, s-maxage=1800'
    }
  });
}

export const GET: APIRoute = async () => {
  const now = Date.now();
  if (memoryCache && now - memoryCache.fetchedAt < CACHE_TTL_MS) {
    return jsonResponse(memoryCache.payload);
  }

  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', String(LAT));
  url.searchParams.set('longitude', String(LON));
  url.searchParams.set(
    'current',
    'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation,uv_index'
  );
  url.searchParams.set(
    'daily',
    'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,sunrise,sunset'
  );
  url.searchParams.set('timezone', 'Asia/Taipei');
  url.searchParams.set('forecast_days', '7');
  url.searchParams.set('wind_speed_unit', 'ms');

  try {
    const res = await fetch(url.toString(), {
      headers: { Accept: 'application/json' }
    });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const data = await res.json();
    const payload = transform(data);
    memoryCache = { fetchedAt: now, payload };
    return jsonResponse(payload);
  } catch {
    if (memoryCache) return jsonResponse(memoryCache.payload);
    return jsonResponse({ error: 'weather_unavailable' }, 503);
  }
};
