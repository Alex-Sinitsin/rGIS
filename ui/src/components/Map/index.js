import React, {useEffect} from 'react';
import {Clusterer, Map, Placemark} from "react-yandex-maps";
import {connect} from "react-redux";

import "./map.css";
import { getItems as getItemsAction} from "../../redux/modules/items";

const MapYandex = ({user, items, getItems, setSelectedItem}) => {

    useEffect(() => {
        user && getItems();
    }, [user, getItems]);

    let mapState = {center: [56.84, 60.59], zoom: 12, controls: ['fullscreenControl', 'zoomControl']};
    const mapModules = ['control.ZoomControl', 'control.FullscreenControl'];

    const mapIcon = (itemType) => {
        switch (itemType) {
            case "Рестораны":
            case "Кафе":
                return "islands#redFoodIcon";
            case "Бизнес-центры":
                return "islands#nightPocketIcon";
            default:
                return "islands#greenStarIcon";
        }
    }

    return (
        <div className="yandexMap">
            <Map className="map" state={mapState} modules={mapModules}>
                <Clusterer
                    options={{
                        preset: 'islands#invertedVioletClusterIcons',
                        groupByCoordinates: false,
                        clusterDisableClickZoom: true,
                        clusterHideIconOnBalloonOpen: false,
                        geoObjectHideIconOnBalloonOpen: false,
                    }}
                >
                    {items.map(item => {
                            const placeMark = {
                                geometry: [item?.lat, item?.lon],
                                options: {
                                    preset: mapIcon(item?.rubric),
                                },
                                properties: {
                                    balloonContentHeader: `${item?.name} <span class="item-rubric">${item?.rubric}</span>`,
                                    balloonContentBody: item?.address,
                                    hintContent: item?.name
                                },
                                onClick: ((ev) => {
                                    const pm = ev.get('target');
                                    const name = pm.properties._data.hintContent;
                                    const sItem = items.filter(itm => itm.name === name)[0];
                                    setSelectedItem(sItem);
                                }),
                                modules: ['geoObject.addon.balloon', 'geoObject.addon.hint']
                            };

                            return <Placemark key={item.id} {...placeMark} />
                        }
                    )}
                </Clusterer>
            </Map>
        </div>
    );
};

export default connect(
    ({items}) => ({items: items.items}),
    ({getItems: getItemsAction})
)(MapYandex);
