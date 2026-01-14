# Bygg Weather API-modulen

Vi separerer ansvarsområder ved å legge vær-API-logikken i en egen fil.

Copy paste følgende innhold inn i `src/weather.ts`:

::: warning User-Agent påkrevd
Erstatt `your.email@example.com` med din faktiske e-postadresse. MET Norge krever dette.
:::

```typescript
const USER_AGENT = "WeatherMCPServer/1.0 your.email@example.com";

const MET_API_BASE = "https://api.met.no/weatherapi/locationforecast/2.0";
const NOMINATIM_BASE = "https://nominatim.openstreetmap.org";

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getForecastByCoordinates(
  lat: number,
  lon: number
): Promise<string> {
  const latitude = lat.toFixed(4);
  const longitude = lon.toFixed(4);

  const url = `${MET_API_BASE}/compact?lat=${latitude}&lon=${longitude}`;
  const data = await fetchJson<any>(url);

  if (!data) {
    return "Unable to fetch weather data";
  }

  return JSON.stringify(data, null, 2);
}

export async function getForecastByLocation(location: string): Promise<string> {
  const geoUrl = `${NOMINATIM_BASE}/search?q=${encodeURIComponent(
    location
  )}&format=json&limit=1`;
  const geoResults = await fetchJson<
    Array<{ lat: string; lon: string; display_name: string }>
  >(geoUrl);

  if (!geoResults || geoResults.length === 0) {
    return `Could not find location: ${location}`;
  }

  const { lat, lon, display_name } = geoResults[0];
  const latitude = parseFloat(lat).toFixed(4);
  const longitude = parseFloat(lon).toFixed(4);

  const url = `${MET_API_BASE}/compact?lat=${latitude}&lon=${longitude}`;
  const data = await fetchJson<any>(url);

  if (!data) {
    return `Unable to fetch weather for ${display_name}`;
  }

  return `Location: ${display_name}\n\n${JSON.stringify(data, null, 2)}`;
}
```

## Hvordan Weather-modulen fungerer

1. **`fetchJson`** - En generisk hjelpefunksjon som håndterer HTTP-forespørsler med riktige headers
2. **`getForecastByCoordinates`** - Henter vær direkte ved hjelp av breddegrad/lengdegrad
3. **`getForecastByLocation`** - Geokoder først stedsnavnet til koordinater, deretter henter vær

Funksjonene returnerer rå JSON-data fordi Claude (og andre LLM-er) er utmerkede til å tolke strukturert data og presentere det på en samtalepreget måte til brukere.

## Neste steg

Nå som vi har vær-API-modulen klar, la oss [bygge MCP-serveren](/tutorials/basic-mcp-server/mcp-server).
