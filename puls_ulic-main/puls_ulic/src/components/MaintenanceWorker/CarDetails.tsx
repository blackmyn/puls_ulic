import React from "react";
import "./CarDetails.css";
import { Typography, Box, TextField, Button, Divider } from "@mui/material";

interface CarDetailsProps {
  carId: string;
}

function CarDetails({ carId }: CarDetailsProps) {
  //  Здесь можно получить данные автомобиля по carId из API или
  //  использовать фиктивные данные
  const carData = {
    plate: "A123BC 199",
    model: "Hyundai Solaris",
    year: 2020,
    mileage: "50 000 км",
    lastMaintenance: "10.08.2023",
    //  Добавьте другие данные
  };

  const handleReturnToGarage = () => {
    //  Логика возврата автомобиля в гараж
    console.log("Автомобиль с номером", carData.plate, "возвращен в гараж");
  };

  return (
    <Box sx={{ flexGrow: 1, border: "1px solid #ccc", borderRadius: 2, p: 2 }}>
      <Typography variant="h6" component="h3">
        Детали автомобиля
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body1" gutterBottom>
        Номер: {carData.plate}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Модель: {carData.model}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Год выпуска: {carData.year}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Пробег: {carData.mileage}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Последнее ТО: {carData.lastMaintenance}
      </Typography>
      {/*  Добавьте другие поля с информацией */}
      <Divider sx={{ my: 2 }} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleReturnToGarage}
      >
        Возврат в гараж
      </Button>
    </Box>
  );
}

export default CarDetails;
