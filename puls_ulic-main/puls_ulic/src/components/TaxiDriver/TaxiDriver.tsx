import React, { useState } from "react";
import "./TaxiDriver.css";
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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";  // Импортируем иконку для кнопки добавления
import { Link } from "react-router-dom";

const drawerWidth = 240;

interface Tariff {
  id: string;
  name: string;
  price: number; // Цена за километр
}

function TaxiDriver() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditingTariff, setIsEditingTariff] = useState(false);
  const [isAddingTariff, setIsAddingTariff] = useState(false); // Состояние для диалога добавления тарифа
  const [editingTariffId, setEditingTariffId] = useState<string | null>(null);
  const [tariffs, setTariffs] = useState<Tariff[]>([
    { id: "1", name: "Эконом", price: 0.1 },
    { id: "2", name: "Комфорт", price: 0.15 },
    { id: "3", name: "Бизнес", price: 0.25 },
  ]);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleEditTariff = (tariffId: string) => {
    setIsEditingTariff(true);
    setEditingTariffId(tariffId);
  };

  const handleCloseEditTariffDialog = () => {
    setIsEditingTariff(false);
    setEditingTariffId(null);
  };

  const handleAddTariff = () => {
    setIsAddingTariff(true); // Открыть диалог добавления нового тарифа
  };

  const handleCloseAddTariffDialog = () => {
    setIsAddingTariff(false);
  };

  const handleSaveTariff = (updatedTariff: Tariff) => {
    setTariffs((prevTariffs) =>
      prevTariffs.map((t) => (t.id === updatedTariff.id ? updatedTariff : t))
    );
    handleCloseEditTariffDialog();
  };

  const handleAddNewTariff = (newTariff: Tariff) => {
    setTariffs([...tariffs, newTariff]);  // Добавляем новый тариф в список
    handleCloseAddTariffDialog();
  };

  return (
    <div className="taxi-driver">
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
          <Typography variant="h6">Таксировщик</Typography>
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
          Список тарифов
        </Typography>

        {/* Кнопка добавления нового тарифа */}
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={handleAddTariff}
          sx={{ marginBottom: 2 }}
        >
          Добавить тариф
        </Button>

        {/* Таблица тарифов */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell>Цена за километр (руб.)</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tariffs.map((tariff) => (
                <TableRow key={tariff.id}>
                  <TableCell>{tariff.name}</TableCell>
                  <TableCell>{tariff.price}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => handleEditTariff(tariff.id)}
                    >
                      Изменить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Диалог редактирования тарифа */}
        <Dialog open={isEditingTariff} onClose={handleCloseEditTariffDialog}>
          <DialogTitle>Редактирование тарифа</DialogTitle>
          <DialogContent>
            {editingTariffId &&
              tariffs.find((t) => t.id === editingTariffId) && (
                <EditTariffForm
                  tariff={tariffs.find((t) => t.id === editingTariffId)!}
                  onSave={handleSaveTariff}
                  onCancel={handleCloseEditTariffDialog}
                />
              )}
          </DialogContent>
        </Dialog>

        {/* Диалог добавления нового тарифа */}
        <Dialog open={isAddingTariff} onClose={handleCloseAddTariffDialog}>
          <DialogTitle>Добавление нового тарифа</DialogTitle>
          <DialogContent>
            <AddTariffForm onAdd={handleAddNewTariff} onCancel={handleCloseAddTariffDialog} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

interface EditTariffFormProps {
  tariff: Tariff;
  onSave: (updatedTariff: Tariff) => void;
  onCancel: () => void;
}

function EditTariffForm({ tariff, onSave, onCancel }: EditTariffFormProps) {
  const [editedTariff, setEditedTariff] = useState<Tariff>(tariff);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTariff({ ...editedTariff, [name]: parseFloat(value) || 0 });
  };

  const handleSave = () => {
    onSave(editedTariff);
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        label="Название"
        variant="outlined"
        name="name"
        value={editedTariff.name}
        disabled // Название тарифа не редактируется
        fullWidth
        margin="normal"
      />
      <TextField
        label="Цена за километр"
        variant="outlined"
        name="price"
        type="number"
        value={editedTariff.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <DialogActions>
        <Button onClick={onCancel}>Отмена</Button>
        <Button onClick={handleSave} color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Box>
  );
}

interface AddTariffFormProps {
  onAdd: (newTariff: Tariff) => void;
  onCancel: () => void;
}

function AddTariffForm({ onAdd, onCancel }: AddTariffFormProps) {
  const [newTariff, setNewTariff] = useState<Tariff>({ id: "", name: "", price: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTariff({ ...newTariff, [name]: name === "price" ? parseFloat(value) : value });
  };

  const handleAdd = () => {
    const newId = Math.random().toString(36).substr(2, 9); // Генерация случайного id
    onAdd({ ...newTariff, id: newId });
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        label="Название"
        variant="outlined"
        name="name"
        value={newTariff.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Цена за километр"
        variant="outlined"
        name="price"
        type="number"
        value={newTariff.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <DialogActions>
        <Button onClick={onCancel}>Отмена</Button>
        <Button onClick={handleAdd} color="primary">
          Добавить
        </Button>
      </DialogActions>
    </Box>
  );
}

export default TaxiDriver;
