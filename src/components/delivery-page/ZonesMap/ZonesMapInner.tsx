"use client";

import { YMaps, Map, Polygon, Placemark } from "@pbe/react-yandex-maps";
import { FACTORY_COORDS, YANDEX_MAPS_API_KEY } from "@/constants/operator";
import "./ZonesMap.module.css";
import nnOblast from "./nn.geojson.js";

const mapState = {
  center: [56.326887, 44.005986],
  zoom: 7,
};

const placemarkPosition = [FACTORY_COORDS.lat, FACTORY_COORDS.lon];

const ZonesMapInner = () => (
  <YMaps query={{ apikey: YANDEX_MAPS_API_KEY, lang: "ru_RU" }}>
    <div className="map-container">
      <Map defaultState={mapState} width="100%" height="600px">
        <Placemark
          geometry={placemarkPosition}
          properties={{
            iconCaption: "Кирпичный завод Ковернино",
          }}
        />
        <Polygon
          geometry={nnOblast.geometry.coordinates}
          onMouseEnter={(e: { originalEvent: { target: { options: { set: (key: string, value: string) => void } } } }) =>
            e.originalEvent.target.options.set("fillColor", "#00FF00")
          }
          onMouseLeave={(e: { originalEvent: { target: { options: { set: (key: string, value: string) => void } } } }) =>
            e.originalEvent.target.options.set("fillColor", "#00AF00")
          }
          properties={{ hintContent: "Тариф 1" }}
          modules={["geoObject.addon.hint"]}
          options={{
            fillColor: "#00AF00",
            fillOpacity: 0.4,
            openEmptyHint: true,
            strokeColor: "#006400",
            strokeOpacity: 0.9,
            strokeWidth: 3,
          }}
        />
      </Map>
    </div>
  </YMaps>
);

export default ZonesMapInner;
