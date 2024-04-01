'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { Position } from 'geojson';
import GoogleMapReact from 'google-map-react';

import type { Trajectory } from '@/interfaces';

import { Marker, MarkerType } from './mapMarker';

interface Point {
    lat: number;
    lng: number;
}

export const Map: FC<{ trajectory: Trajectory }> = ({ trajectory }) => {
    const [map, setMap] = useState<any>();
    const [maps, setMaps] = useState();
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [startLocation, setStartLocation] = useState<Point>();
    const [finishLocation, setFinishLocation] = useState<Point>();

    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    const pink500 = '#ec4899';
    const defaultCenter = { lat: 51.5, lng: 0 };
    const zoom = 11;
    const pathStyle = {
        strokeColor: pink500,
        strokeWeight: 3,
    };

    const setStartAndFinishLocation = (coordinates: Position[]) => {
        const firstCoord = coordinates.at(0);
        const lastCoord = coordinates.at(coordinates.length - 1);

        if (firstCoord && lastCoord) {
            setStartLocation({ lat: firstCoord[1], lng: firstCoord[0] });
            setFinishLocation({ lat: lastCoord[1], lng: lastCoord[0] });
        }
    };

    const renderMarkers = () => {
        if (!startLocation || !finishLocation) return [];

        const markersData = [
            { location: startLocation, type: MarkerType.START },
            { location: finishLocation, type: MarkerType.FINISH },
        ];

        return markersData.map(({ location, type }, idx) => (
            <Marker
                lat={location.lat}
                lng={location.lng}
                type={type}
                key={idx}
            />
        ));
    };

    useEffect(() => {
        if (map && maps) {
            setStartAndFinishLocation(trajectory.geometry.coordinates);
            map.data.addGeoJson(trajectory);
            map.data.setStyle(pathStyle);
        }
    }, [isMapLoaded, trajectory]);

    return (
        <div className="h-full" data-testid="workout-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: `${googleMapsApiKey}` }}
                defaultCenter={defaultCenter}
                center={startLocation}
                defaultZoom={zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => {
                    setMap(map);
                    setMaps(maps);
                    setIsMapLoaded(true);
                }}
            >
                {renderMarkers()}
            </GoogleMapReact>
        </div>
    );
};
