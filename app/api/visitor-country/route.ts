import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const noStoreHeaders = {
    "Cache-Control": "private, no-store, max-age=0",
};

const COUNTRY_HEADERS = [
    "cf-ipcountry",
    "x-vercel-ip-country",
    "cloudfront-viewer-country",
    "x-amzn-geo-country",
    "x-geo-country",
] as const;

function validCountryCode(value: string | null): string | null {
    const country = value?.trim().toUpperCase();

    return country && /^[A-Z]{2}$/.test(country) ? country : null;
}

function getVisitorIp(request: NextRequest): string | null {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip");

    if (!ip || ip === "::1" || ip.startsWith("127.") || ip.startsWith("10.")) {
        return null;
    }

    return ip;
}

export async function GET(request: NextRequest) {
    for (const header of COUNTRY_HEADERS) {
        const country = validCountryCode(request.headers.get(header));

        if (country) {
            return NextResponse.json({ country }, { headers: noStoreHeaders });
        }
    }

    const ip = getVisitorIp(request);

    if (!ip) {
        return NextResponse.json({ country: null }, { headers: noStoreHeaders });
    }

    try {
        // Fallback para hosts que no añaden un encabezado de geolocalización.
        // La IP no se guarda ni se envía al navegador.
        const response = await fetch(`https://api.country.is/${encodeURIComponent(ip)}`, {
            cache: "no-store",
            signal: AbortSignal.timeout(2_500),
        });
        const data = response.ok
            ? (await response.json()) as { country?: string }
            : null;
        const country = validCountryCode(data?.country ?? null);

        if (country) {
            return NextResponse.json({ country }, { headers: noStoreHeaders });
        }
    } catch {
        // Se intenta el segundo proveedor.
    }

    try {
        const response = await fetch(`https://ipapi.co/${encodeURIComponent(ip)}/country/`, {
            cache: "no-store",
            signal: AbortSignal.timeout(2_500),
        });
        const country = response.ok
            ? validCountryCode(await response.text())
            : null;

        return NextResponse.json({ country }, { headers: noStoreHeaders });
    } catch {
        // Si los proveedores no están disponibles, el cliente conserva inglés.
        return NextResponse.json({ country: null }, { headers: noStoreHeaders });
    }
}
