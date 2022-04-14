import React, {useEffect} from 'react';

import { load } from "@2gis/mapgl";

const MapGL = () => {
    const MapWrapper = React.memo(
        () => {
            return <div id="map-container" style={{ width: '100%', height: '100%' }}></div>;
        },
        () => true,
    );

    useEffect(() => {
        let map;
        load().then((mapglAPI) => {
            map = new mapglAPI.Map('map-container', {
                center: [55.31878, 25.23584],
                zoom: 13,
                key: 'rugbeb3610',
            })
        });

        return () => map.destroy();
    }, [])

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <MapWrapper />
        </div>
    );
};

export default MapGL;
