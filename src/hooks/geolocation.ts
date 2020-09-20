import { useEffect, useState } from 'react';

export default function useLocation() {
    const [location, setLocation] = useState('');
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { coords } = position;
                const { latitude, longitude } = coords;
                setLocation(`${latitude},${longitude}`);
            });
        } else {
            setLocation(``);
        }
    }, []);
    return location;
}
