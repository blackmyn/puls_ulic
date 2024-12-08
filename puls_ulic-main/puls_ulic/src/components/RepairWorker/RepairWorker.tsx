import React, { useState } from "react";
import { Button, Typography, Table, TableHead, TableRow, TableCell, TableBody, AppBar, Toolbar, IconButton, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import GarageIcon from "@mui/icons-material/Garage";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import RequestPartDialog from "../MaintenanceWorker/RequestPartDialog";  // Импортируем форму запроса
import "./RepairWorker.css";

const drawerWidth = 240;

interface Car {
  id: string;
  plate: string;
  model: string;
  status: string;
  description: string;
  owner: string;
  mileage: number;
  lastServiceDate: string;
}

function RepairWorker() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);  // Добавляем состояние для открытия формы запроса на запчасти

  const cars: Car[] = [
    {
      id: "1",
      plate: "A123BC 199",
      model: "Hyundai Solaris",
      status: "В ремонте",
      description: "Замена тормозных колодок",
      owner: "Иван Иванов",
      mileage: 120000,
      lastServiceDate: "2023-12-01",
    },
    {
      id: "2",
      plate: "B456DE 777",
      model: "Kia Rio",
      status: "Диагностика",
      description: "Проверка двигателя",
      owner: "Петр Петров",
      mileage: 85000,
      lastServiceDate: "2024-02-15",
    },
  ];

  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);

  const handleViewDetails = (car: Car) => {
    setSelectedCar(car);
    setIsDetailsDialogOpen(true);
  };

  const handleCloseDetailsDialog = () => {
    setIsDetailsDialogOpen(false);
    setSelectedCar(null);
  };

  const handleRequestFormOpen = () => {
    setIsRequestFormOpen(true);
  };

  const handleRequestFormClose = () => {
    setIsRequestFormOpen(false);
  };

  const handleSubmitRequest = (partName: string, quantity: number) => {
    console.log("Запрос на запчасти:", partName, quantity);
    // Логика отправки запроса на сервер
  };

  return (
    <div className="repair-worker">
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Ремонтный рабочий
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="logout">
            <LogoutIcon />
            Выйти
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" anchor="left" open={isDrawerOpen} onClose={handleDrawerClose}>
        <List>
          <ListItem>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Настройки" />
          </ListItem>
        </List>
      </Drawer>

      <div className="container">
        <Typography variant="h4" component="h2" gutterBottom>
          Список автомобилей в ремонте
        </Typography>
        <Button variant="contained" color="primary" onClick={handleRequestFormOpen}>
          Запросить запчасти
        </Button>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Номер</TableCell>
              <TableCell>Модель</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.id}>
                <TableCell>{car.plate}</TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.status}</TableCell>
                <TableCell>{car.description}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" startIcon={<InfoIcon />} onClick={() => handleViewDetails(car)}>
                    Подробнее
                  </Button>
                  <Button variant="contained" color="secondary" startIcon={<GarageIcon />}>
                    Вернуть в гараж
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDetailsDialogOpen} onClose={handleCloseDetailsDialog}>
          <DialogTitle>Детали автомобиля</DialogTitle>
          <DialogContent>
            {selectedCar && (
              <>
                <Typography>Номер: {selectedCar.plate}</Typography>
                <Typography>Модель: {selectedCar.model}</Typography>
                <Typography>Владелец: {selectedCar.owner}</Typography>
                <Typography>Пробег: {selectedCar.mileage} км</Typography>
                <Typography>Последнее ТО: {selectedCar.lastServiceDate}</Typography>
                <Typography>Описание: {selectedCar.description}</Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDetailsDialog}>Закрыть</Button>
          </DialogActions>
        </Dialog>

        {/* Форма запроса на запчасти */}
        <RequestPartDialog open={isRequestFormOpen} onClose={handleRequestFormClose} onSubmit={handleSubmitRequest} />
      </div>
    </div>
  );
}

export default RepairWorker;
