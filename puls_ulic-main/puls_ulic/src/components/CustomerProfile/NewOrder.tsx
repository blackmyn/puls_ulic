import React, { useState, useEffect } from "react";
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
import ChildCareIcon from "@mui/icons-material/ChildCare";
import PetsIcon from "@mui/icons-material/Pets";
import "./NewOrder.css";
import { getDistance } from "geolib";
import OrderStatusContainer from "./OrderStatusContainer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface Location {
  lat: number;
  lng: number;
}

interface Tariff {
  id: number;
  name: string;
  cost_per_km: number;
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


function LocationMarker({
  onAddressChange,
  onMarkersChange,
}: LocationMarkerProps) {
  const [markers, setMarkers] = useState<Location[]>([]);

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
  const [showOrderStatus, setShowOrderStatus] = useState(false); 
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTariffs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tariffs");
        const data = await response.json();
        setTariffs(data);
      } catch (error) {
        console.error("Ошибка загрузки тарифов:", error);
      }
    };
    fetchTariffs();
  }, []);

  const handleTariffSelect = (tariff: string) => {
    setSelectedTariff(tariff);
    if (distance !== null) {
      const selectedTariffObj = tariffs.find((t) => t.name === tariff);
      if (selectedTariffObj) {
        const calculatedPrice =
          (distance / 1000) * selectedTariffObj.cost_per_km;
        setPrice(Number(calculatedPrice.toFixed(2)));
      }
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

        Promise.all(newMarkers.map(marker => reverseGeocode(marker.lat, marker.lng)))
            .then(newAddresses => setAddresses(newAddresses))
            .catch(error => console.error("Ошибка получения адресов:", error));

    }
};

const handlePayment = async () => {
  if (price !== null && distance !== null && selectedTariff) {
    try {
      const selectedTariffObj = tariffs.find((t) => t.name === selectedTariff);
      if (!selectedTariffObj) {
        setPaymentStatus("Ошибка: выбранный тариф не найден.");
        return;
      }

      const payload = {
        users_id: localStorage.getItem("userId"), 
        tariffs_id: selectedTariffObj.id,
        pickup_location: addresses[0],
        dropoff_location: addresses[1],
        cost: price,
        mileage: distance / 1000, 
        payment_method: paymentMethod, 
      };

      const response = await axios.post(
        "http://localhost:5000/api/createuncompletedorders",
        payload
      );
      

      if (response.status === 200 && response.data.id) {
        const { id } = response.data;
        setPaymentStatus("Заказ успешно создан.");
        navigate(`/orderstatus/${id}`);
      } else {
        setPaymentStatus("Ошибка: не удалось создать заказ.");
      }      
    } catch (err) {
      console.error("Ошибка при отправке данных:", err);
      setPaymentStatus("Ошибка при создании заказа.");
    }
  } else {
    setPaymentStatus("Ошибка: не удалось вычислить стоимость.");
  }
};

  const handleCancelOrder = () => {
    setShowOrderStatus(false); 
    navigate("/"); 
  };

  return (
    <div className="new-order-page">
      <div className={`container ${showOrderStatus ? "hidden" : ""}`}> 
        <Link to="/"> <div className="company-info">
          <img
            src="https://i.ibb.co/6J4cQ2H/logo.png"
            alt="Логотип компании"
            className="company-logo"
          />
        </div>
</Link>
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
              {tariffs.map((tariff) => (
                <li
                  key={tariff.id}
                  className={`tariff-item ${
                    selectedTariff === tariff.name ? "active" : ""
                  }`}
                  onClick={() => handleTariffSelect(tariff.name)}
                >
                  <div className="tariff-info">
                    <span className="tariff-name">{tariff.name}</span>
                    <span className="tariff-price">
                      ~ {tariff.cost_per_km} руб./км
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <FormControl component="fieldset" className="payment-method">
            <FormLabel component="legend">Способ оплаты</FormLabel>
              <RadioGroup
              aria-label="payment-method"
              name="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
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

          <Button
            variant="contained"
            color="primary"
            className="payment-button"
            onClick={handlePayment}
          >
            Заказать такси
          </Button>

          {paymentStatus && (
            <p className="payment-status">{paymentStatus}</p>
          )}
        </div>
        {showOrderStatus && (
          <div className="">
            <OrderStatusContainer />
            <Button variant="outlined" color="error" onClick={handleCancelOrder}>
              Отменить заказ
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewOrder;