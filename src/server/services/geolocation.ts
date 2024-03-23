'use server';

import { Position } from 'geojson';

import { Geolocation } from '@/db/models';

export const getGeolocationById = async (id: string) =>
    await Geolocation.findByPk(id);

export const createGeolocation = async (coordinates: Position[] | null) => {
    if (!coordinates || coordinates?.length === 0) {
        return;
    }

    const geolocation = await Geolocation.create({
        geometry: {
            type: 'LineString',
            coordinates: coordinates,
        },
    });

    return geolocation.id;
};
