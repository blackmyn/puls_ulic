import React, { useState } from "react";
import "./Dispatcher.css";
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
  TextField,
  DialogActions,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import DriverSettings from "./DispatcherSettings"; // Импорт компонента настроек

const drawerWidth = 240;

interface Order {
  id: string;
  clientName: string;
  from: string;
  to: string;
  status: string;
}

function Dispatcher() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      clientName: "Иван Иванов",
      from: "ул. Пушкина, 10",
      to: 'ТЦ "Галерея"',
      status: "В ожидании",
    },
    {
      id: "2",
      clientName: "Петр Петров",
      from: "ул. Ленина, 5",
      to: "Аэропорт",
      status: "Назначен водителю",
    },
  ]);

  //  Состояния для диалоговых окон
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  //  Состояние для нового заказа
  const [newOrder, setNewOrder] = useState<Order>({
    id: "",
    clientName: "",
    from: "",
    to: "",
    status: "",
  });

  //  Состояние для редактируемого заказа
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
    // Состояние для выбранного пункта меню
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);

  //  Обработчики событий для открытия/закрытия диалоговых окон
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleOpenAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
    setNewOrder({ id: "", clientName: "", from: "", to: "", status: "" });
  };

  const handleOpenEditDialog = (order: Order) => {
    setEditingOrder(order);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingOrder(null);
  };

  const handleOpenDeleteDialog = (order: Order) => {
    setEditingOrder(order);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setEditingOrder(null);
  };

  //  Обработчики событий для добавления, редактирования и удаления заказов
  const handleAddOrder = () => {
    setOrders([
      ...orders,
      { ...newOrder, id: (Math.random() * 10000).toFixed(0) },
    ]);
    handleCloseAddDialog();
  };

  const handleEditOrder = () => {
    if (editingOrder) {
      setOrders(
        orders.map((order) =>
          order.id === editingOrder.id ? editingOrder : order
        )
      );
      handleCloseEditDialog();
    }
  };

  const handleDeleteOrder = () => {
    if (editingOrder) {
      setOrders(orders.filter((order) => order.id !== editingOrder.id));
      handleCloseDeleteDialog();
    }
  };

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleMenuItemClick = (menuItem: string) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="dispatcher">
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
          <Typography variant="h6" flexGrow={1}>
            Диспетчер
          </Typography>
          <Button onClick={handleLogout} color="inherit">
            Выйти
          </Button>
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
          <ListItem
            button
            key="settings"
            onClick={() => handleMenuItemClick("settings")}
            selected={selectedMenuItem === "settings"}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Настройки" />
          </ListItem>
          {/* Добавьте другие пункты меню здесь */}
        </List>
      </Drawer>

      <div className="container">
        <Typography variant="h4" component="h2" gutterBottom>
          Список заказов
        </Typography>

        {/*  Кнопка "Добавить заказ"  */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleOpenAddDialog}
          sx={{ mb: 2 }}
        >
          Добавить заказ
        </Button>

        {/*  Таблица заказов  */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Клиент</TableCell>
                <TableCell>Откуда</TableCell>
                <TableCell>Куда</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.clientName}</TableCell>
                  <TableCell>{order.from}</TableCell>
                  <TableCell>{order.to}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => handleOpenEditDialog(order)}
                      sx={{ mr: 1 }}
                    >
                      Редактировать
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleOpenDeleteDialog(order)}
                    >
                      Удалить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/*  Диалог добавления заказа  */}
        <Dialog open={isAddDialogOpen} onClose={handleCloseAddDialog}>
          <DialogTitle>Добавление заказа</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Имя клиента"
              fullWidth
              variant="standard"
              value={newOrder.clientName}
              onChange={(e) =>
                setNewOrder({ ...newOrder, clientName: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Откуда"
              fullWidth
              variant="standard"
              value={newOrder.from}
              onChange={(e) =>
                setNewOrder({ ...newOrder, from: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Куда"
              fullWidth
              variant="standard"
              value={newOrder.to}
              onChange={(e) => setNewOrder({ ...newOrder, to: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Статус"
              fullWidth
              variant="standard"
              value={newOrder.status}
              onChange={(e) =>
                setNewOrder({ ...newOrder, status: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog}>Отмена</Button>
            <Button onClick={handleAddOrder}>Добавить</Button>
          </DialogActions>
        </Dialog>

        {/*  Диалог редактирования заказа  */}
        <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog}>
          <DialogTitle>Редактирование заказа</DialogTitle>
          <DialogContent>
            {editingOrder && (
              <>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Имя клиента"
                  fullWidth
                  variant="standard"
                  value={editingOrder.clientName}
                  onChange={(e) =>
                    setEditingOrder({
                      ...editingOrder,
                      clientName: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Откуда"
                  fullWidth
                  variant="standard"
                  value={editingOrder.from}
                  onChange={(e) =>
                    setEditingOrder({ ...editingOrder, from: e.target.value })
                  }
                />
                <TextField
                  margin="dense"
                  label="Куда"
                  fullWidth
                  variant="standard"
                  value={editingOrder.to}
                  onChange={(e) =>
                    setEditingOrder({ ...editingOrder, to: e.target.value })
                  }
                />
                <TextField
                  margin="dense"
                  label="Статус"
                  fullWidth
                  variant="standard"
                  value={editingOrder.status}
                  onChange={(e) =>
                    setEditingOrder({ ...editingOrder, status: e.target.value })
                  }
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog}>Отмена</Button>
            <Button onClick={handleEditOrder}>Сохранить</Button>
          </DialogActions>
        </Dialog>

        {/*  Диалог удаления заказа  */}
        <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Удаление заказа</DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog}>Отмена</Button>
            <Button onClick={handleDeleteOrder} color="error">
              Удалить
            </Button>
          </DialogActions>
        </Dialog>
        {selectedMenuItem === "settings" && <DriverSettings />}
      </div>
    </div>
  );
}

export default Dispatcher;