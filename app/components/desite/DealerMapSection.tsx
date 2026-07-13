"use client";

import { useState } from "react";

const dealerLocations = [
  { label: "Australia", lat: -25.2744, lng: 133.7751 },
  { label: "Sweden", lat: 60.1282, lng: 18.6435 },
  { label: "Texas, USA", lat: 31.9686, lng: -99.9018 },
  { label: "Tennessee, USA", lat: 35.5175, lng: -86.5804 },
  { label: "Pennsylvania, USA", lat: 41.2033, lng: -77.1945 },
  { label: "Missouri, USA", lat: 37.9643, lng: -91.8318 },
  { label: "Washington, USA", lat: 47.7511, lng: -120.7401 },
  { label: "Ontario, Canada", lat: 50, lng: -85 },
  { label: "British Columbia, Canada", lat: 53.7267, lng: -127.6476 },
  { label: "New Brunswick, Canada", lat: 46.5653, lng: -66.4619 },
  { label: "Costa Rica", lat: 9.7489, lng: -83.7534 },
  { label: "China", lat: 35.8617, lng: 104.1954 },
];

const dealerGroups = [
  "Australia",
  "Sweden",
  "USA: TX, TN, PA, MO, WA",
  "Canada: ON, BC, NB",
  "Costa Rica",
  "China",
];

function projectLocation(lat: number, lng: number) {
  return {
    x: ((lng + 180) / 360) * 100,
    y: ((90 - lat) / 180) * 100,
  };
}

export function DealerMapSection() {
  const [activeLocation, setActiveLocation] = useState(dealerLocations[2]);
  const activePoint = projectLocation(activeLocation.lat, activeLocation.lng);

  return (
    <article
      aria-labelledby="dealer-network-title"
      className="dealer-map-panel"
    >
      <div className="dealer-map-copy">
        <h3 id="dealer-network-title">Dealer Network</h3>
        <p>
          DeSite Products is supported by a growing dealer network across North
          America and international markets.
        </p>
        <ul className="dealer-location-list" aria-label="Dealer network locations">
          {dealerGroups.map((location) => (
            <li key={location}>{location}</li>
          ))}
        </ul>
      </div>

      <div
        aria-label="Interactive dealer network map with markers for global dealer locations"
        className="dealer-map-shell"
      >
        <svg
          aria-hidden="true"
          className="dealer-map-art"
          focusable="false"
          viewBox="0 0 1000 520"
        >
          <rect className="dealer-map-ocean" height="520" rx="18" width="1000" />
          <path
            className="dealer-map-grid"
            d="M120 0v520M260 0v520M400 0v520M540 0v520M680 0v520M820 0v520M0 120h1000M0 245h1000M0 370h1000"
          />
          <path
            className="dealer-map-land"
            d="M113 139c58-48 158-55 227-15 48 28 52 72 17 102-42 36-125 30-154 75-18 29-2 63-33 87-38 29-120 8-134-42-13-48 51-72 41-119-8-38-42-49 36-88Zm342 109c40-31 117-35 171-10 46 22 65 68 36 100-34 37-112 24-148 63-25 28-11 75-56 88-43 13-88-31-82-74 6-40 52-44 54-81 3-37-31-58 25-86Zm281-57c47-42 141-44 187-7 40 32 25 81-25 102-39 17-83 5-115 32-36 30-9 91-58 103-45 11-78-44-62-83 16-41 64-36 71-76 5-28-28-39 2-71Zm99 225c46-10 100 13 111 52 8 31-19 57-56 56-46-1-103-43-93-77 4-16 18-26 38-31Z"
          />
        </svg>

        <div className="dealer-map-markers">
          {dealerLocations.map((location) => {
            const point = projectLocation(location.lat, location.lng);
            const isActive = activeLocation.label === location.label;

            return (
              <button
                aria-label={`Dealer Location: ${location.label}`}
                className={`dealer-marker ${isActive ? "dealer-marker-active" : ""}`}
                key={location.label}
                onBlur={() => setActiveLocation(dealerLocations[2])}
                onClick={() => setActiveLocation(location)}
                onFocus={() => setActiveLocation(location)}
                onMouseEnter={() => setActiveLocation(location)}
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                type="button"
              >
                <span aria-hidden="true" />
              </button>
            );
          })}
        </div>

        <div
          className="dealer-map-tooltip"
          role="status"
          style={{ left: `${activePoint.x}%`, top: `${activePoint.y}%` }}
        >
          Dealer Location: {activeLocation.label}
        </div>
      </div>
    </article>
  );
}
