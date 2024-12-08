import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  FormGroup,
  InputAdornment,
  Button,  
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import PetsIcon from "@mui/icons-material/Pets";
import "./NewOrder.css";
import { getDistance } from "geolib";

interface Location {
  lat: number;
  lng: number;
}

interface LocationMarkerProps {
  onAddressChange: (index: number, address: string) => void;
  onMarkersChange: (markers: Location[]) => void;
}

function calculateDistance(
  point1: { latitude: number; longitude: number },
  point2: { latitude: number; longitude: number }
): number {
  return getDistance(point1, point2);
}

function LocationMarker({
  onAddressChange,
  onMarkersChange,
}: LocationMarkerProps) {
  const [markers, setMarkers] = useState<Location[]>([]);

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );
      const data = await response.json();
      return data.display_name || "Адрес не найден";
    } catch (error) {
      console.error("Ошибка геокодирования:", error);
      return "Ошибка получения адреса";
    }
  };

  useMapEvents({
    async click(e) {
      if (markers.length < 2) {
        const newMarker = e.latlng;
        const address = await reverseGeocode(newMarker.lat, newMarker.lng);
        const updatedMarkers = [...markers, newMarker];
        setMarkers(updatedMarkers);
        onAddressChange(markers.length, address);
        onMarkersChange(updatedMarkers);
      }
    },
  });

  return markers.map((marker, index) => (
    <Marker
      key={index}
      position={marker}
      icon={L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      })}
    >
      <Popup>
        {index === 0 ? "Откуда" : "Куда"}: <br />
        {marker.lat}, {marker.lng}
      </Popup>
    </Marker>
  ));
}

function NewOrder() {
  const [selectedTariff, setSelectedTariff] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<string[]>(["", ""]);
  const [markers, setMarkers] = useState<Location[]>([]);
  const [distance, setDistance] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);  

  const handleTariffSelect = (tariff: string) => {
    setSelectedTariff(tariff);
    if (distance !== null) {
      const pricePerKm = {
        Эконом: 2.5,
        Комфорт: 3.8,
        Бизнес: 6.0,
      };
      const calculatedPrice =
        (distance / 1000) * pricePerKm[tariff as keyof typeof pricePerKm]; 
      setPrice(Number(calculatedPrice.toFixed(2)));
    }
  };

  const handleAddressChange = (index: number, address: string) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index] = address;
    setAddresses(updatedAddresses);
  };

  const handleMarkerUpdate = (newMarkers: Location[]) => {
    setMarkers(newMarkers);
    if (newMarkers.length === 2) {
      const calculatedDistance = calculateDistance(
        { latitude: newMarkers[0].lat, longitude: newMarkers[0].lng },
        { latitude: newMarkers[1].lat, longitude: newMarkers[1].lng }
      );
      setDistance(calculatedDistance);
      if (selectedTariff) {
        handleTariffSelect(selectedTariff); 
      }
    }
  };

  const handlePayment = () => {
    if (price !== null) {
      setPaymentStatus(`Оплата успешно проведена. Сумма: ${price} руб.`);
    } else {
      setPaymentStatus("Ошибка: не удалось вычислить стоимость.");
    }
  };

  return (
    <div className="new-order-page">
      <div className="container">
        <div className="company-info">
          <img
            src="https://i.ibb.co/6J4cQ2H/logo.png"
            alt="Логотип компании"
            className="company-logo"
          />
        </div>

        <h2>Новый заказ</h2>

        <div className="map-container">
          <MapContainer
            center={[55.75, 37.57]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "400px" }}
          >
            <TileLayer
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker
              onAddressChange={handleAddressChange}
              onMarkersChange={handleMarkerUpdate}
            />
          </MapContainer>
        </div>

        <div className="order-form">
          <div className="location-input">
            <TextField
              label="Откуда"
              variant="outlined"
              fullWidth
              value={addresses[0]}
              className="location-input-field"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" className="icon-adornment">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="location-input">
            <TextField
              label="Куда"
              variant="outlined"
              fullWidth
              value={addresses[1]}
              className="location-input-field"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" className="icon-adornment">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {distance !== null && (
            <p className="distance">Расстояние: {(distance / 1000).toFixed(2)} км</p>
          )}
          {price !== null && (
            <p className="price">Стоимость: {price} руб.</p>
          )}

          <div className="tariff-selection">
            <h3>Тариф</h3>
            <ul>
              <li
                className={`tariff-item ${
                  selectedTariff === "Эконом" ? "active" : ""
                }`}
                onClick={() => handleTariffSelect("Эконом")}
              >
                <div className="tariff-info">
                  <span className="tariff-name">Эконом</span>
                  <span className="tariff-price">~ 2.5 руб./км</span>
                </div>
              </li>
              <li
                className={`tariff-item ${
                  selectedTariff === "Комфорт" ? "active" : ""
                }`}
                onClick={() => handleTariffSelect("Комфорт")}
              >
                <div className="tariff-info">
                  <span className="tariff-name">Комфорт</span>
                  <span className="tariff-price">~ 3.8 руб./км</span>
                </div>
              </li>
              <li
                className={`tariff-item ${
                  selectedTariff === "Бизнес" ? "active" : ""
                }`}
                onClick={() => handleTariffSelect("Бизнес")}
              >
                <div className="tariff-info">
                  <span className="tariff-name">Бизнес</span>
                  <span className="tariff-price">~ 6.0 руб./км</span>
                </div>
              </li>
            </ul>
          </div>

          <FormControl component="fieldset" className="payment-method">
            <FormLabel component="legend">Способ оплаты</FormLabel>
            <RadioGroup
              aria-label="payment-method"
              name="paymentMethod"
              defaultValue="cash"
            >
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label="Наличные"
              />
              <FormControlLabel
                value="card"
                control={<Radio />}
                label="Карта"
              />
            </RadioGroup>
          </FormControl>

          <div className="additional-options">
            <h3>Дополнительные опции</h3>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <>
                    <ChildCareIcon /> Детское кресло
                  </>
                }
              />
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <>
                    <PetsIcon /> Перевозка животных
                  </>
                }
              />
            </FormGroup>
          </div>

          {/* Кнопка оплаты */}
          <Button
            variant="contained"
            color="primary"
            className="payment-button"
            onClick={handlePayment}
          >
            Оплатить заказ
          </Button>

          {paymentStatus && (
            <p className="payment-status">{paymentStatus}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewOrder;
