import React from "react";
import { YMaps, Map, Polygon, Placemark } from "@pbe/react-yandex-maps";
import "./ZonesMap.module.css";
import nnOblast from "./nn.geojson.js";

const ZonesMap = () => {
  const mapState = {
    center: [56.326887, 44.005986],
    zoom: 7,
  };

  const placemarkPosition = [57.147764, 43.803196];

  return (
    <YMaps query={{ apikey: "f1423869-80d1-4c88-8150-8643fdf24b7b" }}>
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
            onMouseEnter={(e: any) =>
              e.originalEvent.target.options.set("fillColor", "#00FF00")
            }
            onMouseLeave={(e: any) =>
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
};

export default ZonesMap;
