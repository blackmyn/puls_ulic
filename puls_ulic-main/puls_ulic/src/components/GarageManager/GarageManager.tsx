import React, { useState } from "react";
import "./GarageManager.css";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import BuildIcon from "@mui/icons-material/Build";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import GarageManagerSettings from "./GarageManagerSettings";

const drawerWidth = 240;

interface Car {
  id: string;
  plate: string;
  model: string;
  status: string;
}

function GarageManager() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSendToMaintenanceDialogOpen, setIsSendToMaintenanceDialogOpen] =
    useState(false);
  const [isSendToRepairDialogOpen, setIsSendToRepairDialogOpen] =
    useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [actionType, setActionType] = useState<"maintenance" | "repair" | null>(
    null
  );

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleSendToMaintenance = (car: Car) => {
    setSelectedCar(car);
    setActionType("maintenance");
    setIsSendToMaintenanceDialogOpen(true);
  };

  const handleSendToRepair = (car: Car) => {
    setSelectedCar(car);
    setActionType("repair");
    setIsSendToRepairDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsSendToMaintenanceDialogOpen(false);
    setIsSendToRepairDialogOpen(false);
    setSelectedCar(null);
    setActionType(null);
  };

  const handleConfirmAction = () => {
    if (selectedCar && actionType) {
      const action = actionType === "maintenance" ? "обслуживание" : "ремонт";
      console.log(`Автомобиль ${selectedCar.plate} отправлен на ${action}.`);
      // Здесь должна быть логика отправки данных на сервер
      handleCloseDialog();
    }
  };

  const cars: Car[] = [
    {
      id: "1",
      plate: "A123BC 199",
      model: "Hyundai Solaris",
      status: "В гараже",
    },
    {
      id: "2",
      plate: "B456DE 777",
      model: "Kia Rio",
      status: "На ремонте",
    },
    // Добавьте другие автомобили
  ];

  return (
    <div className="garage-manager">
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Заведующий гаражом</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        classes={{
          paper: "drawer-paper",
        }}
      >
        <div className="drawer-header">
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
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
          Список автомобилей
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Номер</TableCell>
                <TableCell>Модель</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell>{car.plate}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<DirectionsCarFilledIcon />}
                      onClick={() => handleSendToMaintenance(car)}
                      sx={{ marginRight: 1 }}
                    >
                      Отправить на обслуживание
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<BuildIcon />}
                      onClick={() => handleSendToRepair(car)}
                    >
                      Отправить на ремонт
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Диалог для подтверждения отправки на обслуживание */}
        <Dialog
          open={isSendToMaintenanceDialogOpen}
          onClose={handleCloseDialog}
        >
          <DialogTitle>Подтверждение</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Отправить автомобиль {selectedCar?.plate} на обслуживание?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Отмена</Button>
            <Button onClick={handleConfirmAction} autoFocus>
              Подтвердить
            </Button>
          </DialogActions>
        </Dialog>

        {/* Диалог для подтверждения отправки на ремонт */}
        <Dialog
          open={isSendToRepairDialogOpen}
          onClose={handleCloseDialog}
        >
          <DialogTitle>Подтверждение</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Отправить автомобиль {selectedCar?.plate} на ремонт?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Отмена</Button>
            <Button onClick={handleConfirmAction} autoFocus>
              Подтвердить
            </Button>
          </DialogActions>
        </Dialog>

        <GarageManagerSettings />
      </div>
    </div>
  );
}

export default GarageManager;
