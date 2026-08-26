"use client";

import { useEffect, useRef, useState } from "react";

const languages = [
    {
        code: "en",
        label: "English",
        flag: "/flags/usa.png",
    },
    {
        code: "es",
        label: "Español",
        flag: "/flags/es.png",
    },
    {
        code: "fr",
        label: "Français",
        flag: "/flags/fr.png",
    },
    {
        code: "nl",
        label: "Nederlands",
        flag: "/flags/nl.png",
    },
    {
        code: "da",
        label: "Dansk",
        flag: "/flags/dk.png",
    },
    {
        code: "sv",
        label: "Svenska",
        flag: "/flags/se.png",
    },
    {
        code: "fi",
        label: "Suomi",
        flag: "/flags/fi.png",
    },
    {
        code: "de",
        label: "Deutsch",
        flag: "/flags/de.png",
    },
];

type Language = (typeof languages)[number];

const LANGUAGE_PREFERENCE_KEY = "desite-language-preference";

type LanguagePreference = {
    language: Language["code"];
    country: string | null;
};

const languageByCountry: Record<string, Language["code"]> = {
    AR: "es", BO: "es", CL: "es", CO: "es", CR: "es", CU: "es", DO: "es",
    EC: "es", ES: "es", GQ: "es", GT: "es", HN: "es", MX: "es", NI: "es",
    PA: "es", PE: "es", PR: "es", PY: "es", SV: "es", UY: "es", VE: "es",
    BE: "fr", BF: "fr", BI: "fr", BJ: "fr", CA: "fr", CD: "fr", CF: "fr",
    CG: "fr", CH: "fr", CI: "fr", CM: "fr", DJ: "fr", FR: "fr", GA: "fr",
    GN: "fr", HT: "fr", KM: "fr", LU: "fr", MA: "fr", MC: "fr", MG: "fr",
    ML: "fr", NE: "fr", RE: "fr", RW: "fr", SC: "fr", SN: "fr", TD: "fr",
    TG: "fr", TN: "fr", VU: "fr", WF: "fr", YT: "fr",
    NL: "nl", SR: "nl",
    DK: "da", GL: "da",
    SE: "sv", AX: "sv",
    FI: "fi",
    AT: "de", DE: "de", LI: "de",
};

function getLanguage(code: string | null): Language {
    return languages.find((language) => language.code === code) ?? languages[0];
}

function getSavedLanguagePreference(): LanguagePreference | null {
    try {
        const value = window.localStorage.getItem(LANGUAGE_PREFERENCE_KEY);

        if (!value) {
            return null;
        }

        const preference = JSON.parse(value) as LanguagePreference;

        return languages.some((language) => language.code === preference.language)
            ? preference
            : null;
    } catch {
        return null;
    }
}

async function getVisitorCountry(): Promise<string | null> {
    // La consulta del navegador refleja la IP de salida actual, incluso si el
    // usuario cambia de VPN después de que el CDN haya asignado una región.
    try {
        const countryResponse = await fetch("https://api.country.is/", {
            cache: "no-store",
        });
        const data = (await countryResponse.json()) as { country?: string };
        const country = data.country?.trim().toUpperCase();

        if (country && /^[A-Z]{2}$/.test(country)) {
            return country;
        }
    } catch {
        // Se prueba un segundo proveedor antes de usar el servidor.
    }

    try {
        const ipResponse = await fetch("https://ipapi.co/country/", {
            cache: "no-store",
        });
        const country = (await ipResponse.text()).trim().toUpperCase();

        if (/^[A-Z]{2}$/.test(country)) {
            return country;
        }
    } catch {
        // Se usa la detección del servidor como último respaldo.
    }

    // Respaldo para bloqueadores, errores de red o límites del proveedor externo.
    const response = await fetch("/api/visitor-country", {
        cache: "no-store",
    });
    const data = (await response.json()) as { country?: string | null };

    return data.country ?? null;
}

declare global {
    interface Window {
        googleTranslateElementInit?: () => void;
        google?: any;
    }
}

export function LanguageSelector() {
    const [open, setOpen] = useState(false);

    const [currentLanguage, setCurrentLanguage] =
        useState<Language>(languages[0]);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const detectedCountryRef = useRef<string | null>(null);


    useEffect(() => {
        const clearGoogleTranslateCookie = () => {
            const hostname =
                window.location.hostname;


            document.cookie =
                "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            document.cookie =
                `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;

            document.cookie =
                `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`;
        };

        clearGoogleTranslateCookie();
    }, []);


    function waitForGoogleTranslate(
        timeout = 10000
    ): Promise<boolean> {
        return new Promise((resolve) => {
            const start = Date.now();

            const check = () => {
                if (
                    window.google?.translate
                        ?.TranslateElement
                ) {
                    resolve(true);
                    return;
                }

                if (
                    Date.now() - start >= timeout
                ) {
                    resolve(false);
                    return;
                }

                setTimeout(check, 100);
            };

            check();
        });
    }


    function waitForGoogleSelect(
        timeout = 10000
    ): Promise<HTMLSelectElement | null> {
        return new Promise((resolve) => {
            const start = Date.now();

            const check = () => {
                const select =
                    document.querySelector(
                        ".goog-te-combo"
                    ) as HTMLSelectElement | null;

                if (select) {
                    resolve(select);
                    return;
                }

                if (
                    Date.now() - start >= timeout
                ) {
                    resolve(null);
                    return;
                }

                setTimeout(check, 100);
            };

            check();
        });
    }

    function waitForGoogleLanguageOption(
        languageCode: Language["code"],
        timeout = 10000
    ): Promise<HTMLSelectElement | null> {
        return new Promise((resolve) => {
            const start = Date.now();

            const check = () => {
                const select = document.querySelector(
                    ".goog-te-combo"
                ) as HTMLSelectElement | null;
                const hasLanguage = Array.from(select?.options ?? []).some(
                    (option) => option.value === languageCode
                );

                if (select && hasLanguage) {
                    resolve(select);
                    return;
                }

                if (Date.now() - start >= timeout) {
                    resolve(null);
                    return;
                }

                setTimeout(check, 100);
            };

            check();
        });
    }


    useEffect(() => {
        const hideGoogleInterface = () => {
            /*
             * Banner
             */
            const banner =
                document.querySelector(
                    ".goog-te-banner-frame"
                ) as HTMLElement | null;

            if (banner) {
                banner.style.display = "none";
                banner.style.visibility =
                    "hidden";
                banner.style.height = "0";
            }


            document
                .querySelectorAll(".skiptranslate")
                .forEach((element) => {
                    const htmlElement =
                        element as HTMLElement;


                    if (
                        htmlElement.closest(
                            ".language-selector"
                        )
                    ) {
                        return;
                    }

                    const rect =
                        htmlElement.getBoundingClientRect();

                    if (rect.top <= 5) {
                        htmlElement.style.display =
                            "none";
                    }
                });


            document.body.style.top = "0px";
        };

        hideGoogleInterface();

        const observer =
            new MutationObserver(() => {
                hideGoogleInterface();
            });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            observer.disconnect();
        };
    }, []);


    useEffect(() => {
        let mounted = true;

        async function initializeGoogleTranslate() {
            const googleAlreadyLoaded =
                !!window.google?.translate
                    ?.TranslateElement;

            if (!googleAlreadyLoaded) {
                window.googleTranslateElementInit =
                    () => { };

                let script =
                    document.querySelector(
                        'script[data-google-translate="true"]'
                    ) as HTMLScriptElement | null;

                if (!script) {
                    script =
                        document.createElement("script");

                    script.src =
                        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

                    script.async = true;

                    script.dataset.googleTranslate =
                        "true";

                    document.body.appendChild(
                        script
                    );
                }

                const ready =
                    await waitForGoogleTranslate();

                if (!ready) {
                    console.error(
                        "Google Translate no pudo cargar."
                    );
                    return;
                }
            }

            if (!mounted) {
                return;
            }

            const container =
                document.getElementById(
                    "google_translate_element"
                );

            if (!container) {
                return;
            }

            const existingSelect =
                container.querySelector(
                    ".goog-te-combo"
                );

            if (!existingSelect) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: "en",
                        includedLanguages:
                            "es,fr,nl,da,sv,fi,de",
                        autoDisplay: false,
                    },
                    "google_translate_element"
                );
            }

            await waitForGoogleSelect();

            const savedPreference = getSavedLanguagePreference();
            let country: string | null = null;

            try {
                country = await getVisitorCountry();
                detectedCountryRef.current = country;
            } catch {
                country = null;
            }

            const detectedLanguage = getLanguage(
                country ? languageByCountry[country] ?? "en" : "en"
            );
            const keepManualLanguage = savedPreference && (
                !country ||
                savedPreference.country === null ||
                savedPreference.country === country
            );
            const language = keepManualLanguage
                ? getLanguage(savedPreference.language)
                : detectedLanguage;

            if (savedPreference && !keepManualLanguage) {
                window.localStorage.removeItem(LANGUAGE_PREFERENCE_KEY);
            }

            if (language.code === "en") {
                setCurrentLanguage(language);
                return;
            }

            const select = await waitForGoogleLanguageOption(language.code);

            if (!select || !mounted) {
                return;
            }

            // El widget crea el selector antes de registrar completamente el
            // listener de cambio. Darle un instante evita que el primer cambio
            // automático se quede solo en el estado visual del selector.
            await new Promise((resolve) => setTimeout(resolve, 300));

            if (!mounted) {
                return;
            }

            select.value = language.code;
            select.dispatchEvent(new Event("change", { bubbles: true }));
            setCurrentLanguage(language);
        }

        initializeGoogleTranslate();

        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        function handleClickOutside(
            event: MouseEvent
        ) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(
                    event.target as Node
                )
            ) {
                setOpen(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);


    async function changeLanguage(
        language: Language
    ) {

        // La preferencia se mantiene durante la visita desde el mismo país. Si
        // cambia la IP a otro país, la detección automática vuelve a tener prioridad.
        window.localStorage.setItem(
            LANGUAGE_PREFERENCE_KEY,
            JSON.stringify({
                language: language.code,
                country: detectedCountryRef.current,
            } satisfies LanguagePreference)
        );

        if (language.code === "en") {
            /*
             * Eliminar cookie
             */
            const hostname =
                window.location.hostname;

            document.cookie =
                "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            document.cookie =
                `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;

            document.cookie =
                `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`;


            setCurrentLanguage(language);

            window.location.reload();

            return;
        }

        /*
         * =======================================
         * Languages 
         * =======================================
         */

        const select =
            await waitForGoogleSelect();

        if (!select) {
            console.warn(
                "Google Translate todavía no está listo."
            );
            return;
        }


        select.value = language.code;

        select.dispatchEvent(
            new Event("change", {
                bubbles: true,
            })
        );


        setCurrentLanguage(language);


        setOpen(false);


        setTimeout(() => {
            document.body.style.top = "0px";

            const banner =
                document.querySelector(
                    ".goog-te-banner-frame"
                ) as HTMLElement | null;

            if (banner) {
                banner.style.display = "none";
                banner.style.visibility =
                    "hidden";
            }
        }, 100);
    }

    return (
        <div
            className="language-selector"
            ref={wrapperRef}
        >
            {/* Google Translate oculto */}
            <div
                id="google_translate_element"
                className="google-translate-hidden"
            />

            {/* Botón principal */}
            <button
                type="button"
                className="language-button"
                onClick={() =>
                    setOpen((value) => !value)
                }
                aria-expanded={open}
                aria-haspopup="listbox"
            >
                <span className="language-globe" aria-hidden="true">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="9"
                            stroke="currentColor"
                            strokeWidth="2"
                        />

                        <path
                            d="M3 12H21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />

                        <path
                            d="M12 3C14.5 5.4 15.5 8.4 15.5 12C15.5 15.6 14.5 18.6 12 21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />

                        <path
                            d="M12 3C9.5 5.4 8.5 8.4 8.5 12C8.5 15.6 9.5 18.6 12 21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </span>

                <img
                    src={currentLanguage.flag}
                    alt={currentLanguage.label}
                    className="language-current-flag"
                />

                <span className="language-current">
                    {currentLanguage.label}
                </span>

                <span
                    className={`language-arrow ${open ? "open" : ""
                        }`}
                >
                    ▾
                </span>
            </button>

            {/* Menú */}
            {open && (
                <div
                    className="language-menu"
                    role="listbox"
                    aria-label="Select language"
                >
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            type="button"
                            className={`language-option ${currentLanguage.code ===
                                    language.code
                                    ? "active"
                                    : ""
                                }`}
                            onClick={() =>
                                changeLanguage(language)
                            }
                            role="option"
                            aria-selected={
                                currentLanguage.code ===
                                language.code
                            }
                        >
                            <span className="language-flag">
                                <img
                                    src={language.flag}
                                    alt={language.label}
                                />
                            </span>

                            <span className="language-name">
                                {language.label}
                            </span>

                            {currentLanguage.code ===
                                language.code && (
                                    <span className="language-check">
                                        ✓
                                    </span>
                                )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
