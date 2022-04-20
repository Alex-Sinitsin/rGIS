import React from 'react';
import {Map} from "react-yandex-maps";

import "./map.css";

const MapYandex= () => {
    const mapState = { center: [56.84, 60.59], zoom: 12, controls: ['fullscreenControl', 'zoomControl'] };
    const mapModules = ['control.ZoomControl', 'control.FullscreenControl'];
    return (
        <div className="yandexMap">
            <Map className="map" state={mapState} modules={mapModules} />
        </div>
    );
};

export default MapYandex;
