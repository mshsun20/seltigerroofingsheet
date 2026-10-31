"use client";
import React from "react";
import "@/styles/components/googlemap.css";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    InfoWindow,
    Pin,
    useAdvancedMarkerRef,
    useMapsLibrary,
} from "@vis.gl/react-google-maps";

// Default location information
const DEFAULT_LOCATION = {
    name: "Shyam Metals & Energy Limited - SEL Tiger",
    address: "P-19, Plate D, 403, Taratala Rd, CPT Colony, Taratala, Kolkata, West Bengal 700088",
    rating: 4.1,
    reviewCount: 54,
};

// Default Kolkata map center (used while geocoding)
const DEFAULT_CENTER = {
    lat: 22.5726,
    lng: 88.3639,
};

const googleMapId = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID


// --------------------------------------------
// Map Content Component
// --------------------------------------------

const MapContent = React.memo(function MapContent({
    name,
    address,
    rating,
    reviewCount,
    zoom = 16,
}) {

    const geocodingLib = useMapsLibrary("geocoding");

    const geocoder = React.useMemo(() => {
        if (!geocodingLib) return null;
        return new geocodingLib.Geocoder();
    }, [geocodingLib]);


    const [markerRef, marker] = useAdvancedMarkerRef();

    const [position, setPosition] = React.useState(null);

    const [center, setCenter] = React.useState(DEFAULT_CENTER);

    const [infoWindowOpen, setInfoWindowOpen] = React.useState(true);

    const [error, setError] = React.useState("");


    // --------------------------------------------
    // Convert Address into Latitude / Longitude
    // --------------------------------------------

    React.useEffect(() => {

        if (!geocoder) return;

        let active = true;

        const findLocation = async () => {

            try {

                setError("");

                const response = await geocoder.geocode({
                    address: address,
                });

                if (!active) return;

                const result = response.results?.[0];

                if (!result) {
                    throw new Error("Location not found.");
                }

                const coordinates =
                    result.geometry.location.toJSON();

                setPosition(coordinates);

                setCenter(coordinates);

            } catch (err) {

                if (!active) return;

                console.error(
                    "Google Maps Geocoding Error:",
                    err
                );

                setError(
                    "Unable to locate this address. Please check " +
                    "Google Maps billing, API activation and API key restrictions."
                );

            }

        };

        findLocation();

        return () => {
            active = false;
        };

    }, [geocoder, address]);


    // --------------------------------------------
    // Google Maps URLs
    // --------------------------------------------

    const encodedAddress = encodeURIComponent(`${name}, ${address}`);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;


    return (

        <div className="google-map-wrapper">

            <Map
                mapId={ googleMapId || "DEMO_MAP_ID" }
                center={center}
                zoom={position ? zoom : 12}
                gestureHandling="greedy"
                disableDefaultUI={false}
                zoomControl={true}
                mapTypeControl={false}
                streetViewControl={true}
                fullscreenControl={true}
                className="google-map-canvas"
            >
                {/* Location Marker */}
                {position && (
                    <AdvancedMarker
                        ref={markerRef}

                        position={position}

                        title={name}

                        onClick={() => {
                            setInfoWindowOpen(true);
                        }}
                    >

                        <Pin
                            background="#D93025"
                            borderColor="#B31412"
                            glyphColor="#FFFFFF"
                        />

                    </AdvancedMarker>

                )}


                {/* Location Information Popup */}

                {position && marker && infoWindowOpen && (

                    <InfoWindow
                        anchor={marker}

                        onClose={() => {
                            setInfoWindowOpen(false);
                        }}

                        maxWidth={300}
                    >

                        <div className="google-map-info">

                            <h3 className="google-map-title">
                                {name}
                            </h3>

                            <p className="google-map-address">
                                {address}
                            </p>


                            {/* Rating */}

                            {rating != null && (

                                <div className="google-map-rating">

                                    <span>
                                        {rating}
                                    </span>

                                    <span className="google-map-star">
                                        ★
                                    </span>

                                    {reviewCount != null && (
                                        <span className="google-map-reviews">
                                            ({reviewCount} reviews)
                                        </span>
                                    )}

                                </div>

                            )}


                            {/* Map Actions */}

                            <div className="google-map-actions">

                                <a
                                    href={googleMapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="google-map-open"
                                >
                                    <span>↗</span>
                                    Open in Maps
                                </a>

                                <a
                                    href={directionsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="google-map-directions"
                                    aria-label="Get directions"
                                    title="Get Directions"
                                >
                                    ➤
                                </a>

                            </div>

                        </div>

                    </InfoWindow>

                )}

            </Map>


            {/* Geocoding Error */}

            {error && (

                <div className="google-map-error">
                    {error}
                </div>

            )}

        </div>

    );

});


// --------------------------------------------
// Main Reusable Component
// --------------------------------------------

const GoogleMap = ({
    name = DEFAULT_LOCATION.name,
    address = DEFAULT_LOCATION.address,
    rating = DEFAULT_LOCATION.rating,
    reviewCount = DEFAULT_LOCATION.reviewCount,
    zoom = 16,
    height = "445px",
}) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
        return (
            <div className="google-map-error">
                Google Maps API key is missing.
                Please configure your .env.local file.
            </div>
        );
    }

    return (
        <div
            className="google-map-container"
            style={{ height }}
        >

            <APIProvider apiKey={apiKey}>
                <MapContent
                    name={name}
                    address={address}
                    rating={rating}
                    reviewCount={reviewCount}
                    zoom={zoom}
                />

            </APIProvider>

        </div>

    );

};


export default React.memo(GoogleMap);
