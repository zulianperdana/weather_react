export interface City {
    name: string;
    country: string;
    region: string;
    lon: number;
    lat: number;
    timezone_id: string;
    utc_offset: number;
}

const getKey = (city: City): string => {
    return city.name;
};

export { getKey };
