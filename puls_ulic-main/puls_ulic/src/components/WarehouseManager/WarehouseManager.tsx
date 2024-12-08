import React, { useState } from "react";
import "./WarehouseManager.css";
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
  Tabs,
  Tab,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HistoryIcon from "@mui/icons-material/History";
import ShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link } from "react-router-dom";
import WarehouseManagerSettings from "./WarehouseManagerSettings";

const drawerWidth = 240;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface RequestItem {
  id: string;
  partName: string;
  quantity: number;
  requester: string;
  status: string;
}

interface HistoryItem {
  id: string;
  partName: string;
  quantity: number;
  type: string;
  date: string;
}

interface OrderItem {
  partName: string;
  quantity: number;
  supplier: string;
}

function WarehouseManager() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(
    null
  );

  const [requestItems, setRequestItems] = useState<RequestItem[]>([
    {
      id: "1",
      partName: "Тормозные колодки",
      quantity: 5,
      requester: "Иван Иванов",
      status: "Ожидает",
    },
    {
      id: "2",
      partName: "Свечи зажигания",
      quantity: 10,
      requester: "Петр Петров",
      status: "Одобрено",
    },
    {
      id: "3",
      partName: "Воздушный фильтр",
      quantity: 3,
      requester: "Сидоров Сидор",
      status: "Отклонено",
    },
  ]);

  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([
    {
      id: "1",
      partName: "Тормозные колодки",
      quantity: 10,
      type: "Приход",
      date: "2023-08-25 10:00",
    },
    {
      id: "2",
      partName: "Свечи зажигания",
      quantity: 5,
      type: "Расход",
      date: "2023-08-26 14:30",
    },
  ]);

  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { partName: "Масляный фильтр", quantity: 10, supplier: "Поставщик 1" },
  ]);
  const [newOrder, setNewOrder] = useState<OrderItem>({
    partName: "",
    quantity: 0,
    supplier: "",
  });

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleOpenApproveDialog = (request: RequestItem) => {
    setSelectedRequest(request);
    setIsApproveDialogOpen(true);
  };

  const handleCloseApproveDialog = () => {
    setIsApproveDialogOpen(false);
    setSelectedRequest(null);
  };

  const handleApproveRequest = () => {
    if (selectedRequest) {
      setRequestItems((prevRequests) =>
        prevRequests.map((item) =>
          item.id === selectedRequest.id
            ? { ...item, status: "Одобрено" }
            : item
        )
      );
      handleCloseApproveDialog();
    }
  };

  const handleOpenRejectDialog = (request: RequestItem) => {
    setSelectedRequest(request);
    setIsRejectDialogOpen(true);
  };

  const handleCloseRejectDialog = () => {
    setIsRejectDialogOpen(false);
    setSelectedRequest(null);
  };

  const handleRejectRequest = () => {
    if (selectedRequest) {
      setRequestItems((prevRequests) =>
        prevRequests.map((item) =>
          item.id === selectedRequest.id
            ? { ...item, status: "Отклонено" }
            : item
        )
      );
      handleCloseRejectDialog();
    }
  };

  const handleOpenOrderDialog = () => {
    setIsOrderDialogOpen(true);
  };

  const handleCloseOrderDialog = () => {
    setIsOrderDialogOpen(false);
    setNewOrder({ partName: "", quantity: 0, supplier: "" });
  };

  const handleAddOrder = () => {
    setOrderItems([...orderItems, newOrder]);
    handleCloseOrderDialog();
  };

  return (
    <div className="warehouse-manager">
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
          <Typography variant="h6">Начальник склада</Typography>
          
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
          Управление складом
        </Typography>

        {/* Вкладки */}
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={activeTab}
              onChange={handleChangeTab}
              aria-label="basic tabs example"
            >
              <Tab
                label="Запросы"
                icon={<ShoppingCartIcon />}
                {...a11yProps(0)}
              />
              <Tab label="История" icon={<HistoryIcon />} {...a11yProps(1)} />
              <Tab
                label="Заказ материалов"
                icon={<ShoppingCartIcon />}
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <TabPanel value={activeTab} index={0}>
            {/* Таблица запросов */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Запчасть</TableCell>
                    <TableCell>Количество</TableCell>
                    <TableCell>Заказчик</TableCell>
                    <TableCell>Статус</TableCell>
                    <TableCell>Действия</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requestItems.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.partName}</TableCell>
                      <TableCell>{request.quantity}</TableCell>
                      <TableCell>{request.requester}</TableCell>
                      <TableCell>
                        <Chip
                          label={request.status}
                          color={
                            request.status === "Ожидает"
                              ? "default"
                              : request.status === "Одобрено"
                              ? "success"
                              : "error"
                          }
                        />
                      </TableCell>
                      <TableCell>
                        {request.status === "Ожидает" && (
                          <>
                            <Button
                              variant="contained"
                              color="success"
                              startIcon={<CheckCircleIcon />}
                              onClick={() => handleOpenApproveDialog(request)}
                              sx={{ mr: 1 }}
                            >
                              Одобрить
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              startIcon={<CancelIcon />}
                              onClick={() => handleOpenRejectDialog(request)}
                              sx={{ mr: 1 }}
                            >
                              Отклонить
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Диалог одобрения запроса */}
            <Dialog
              open={isApproveDialogOpen}
              onClose={handleCloseApproveDialog}
            >
              <DialogTitle>Одобрение запроса</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Одобрить запрос на {selectedRequest?.quantity}{" "}
                  {selectedRequest?.partName} от {selectedRequest?.requester}?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseApproveDialog}>Отмена</Button>
                <Button
                  onClick={handleApproveRequest}
                  color="primary"
                  autoFocus
                >
                  Одобрить
                </Button>
              </DialogActions>
            </Dialog>

            {/* Диалог отклонения запроса */}
            <Dialog open={isRejectDialogOpen} onClose={handleCloseRejectDialog}>
              <DialogTitle>Отклонение запроса</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Отклонить запрос на {selectedRequest?.quantity}{" "}
                  {selectedRequest?.partName} от {selectedRequest?.requester}?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseRejectDialog}>Отмена</Button>
                <Button onClick={handleRejectRequest} color="error" autoFocus>
                  Отклонить
                </Button>
              </DialogActions>
            </Dialog>
          </TabPanel>

          {/*  Вкладка "История"  */}
          <TabPanel value={activeTab} index={1}>
            {/* Таблица истории */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Дата</TableCell>
                    <TableCell>Запчасть</TableCell>
                    <TableCell>Количество</TableCell>
                    <TableCell>Тип операции</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historyItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.partName}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/*  Вкладка "Заказ материалов"  */}
          <TabPanel value={activeTab} index={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleOpenOrderDialog}
              sx={{ mb: 2 }}
            >
              Создать заказ
            </Button>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Запчасть</TableCell>
                    <TableCell>Количество</TableCell>
                    <TableCell>Поставщик</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.partName}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Box>

        {/* Диалог создания заказа */}
        <Dialog open={isOrderDialogOpen} onClose={handleCloseOrderDialog}>
          <DialogTitle>Создать заказ</DialogTitle>
          <DialogContent>
            <TextField
              label="Название запчасти"
              fullWidth
              margin="normal"
              value={newOrder.partName}
              onChange={(e) =>
                setNewOrder({ ...newOrder, partName: e.target.value })
              }
            />
            <TextField
              label="Количество"
              type="number"
              fullWidth
              margin="normal"
              value={newOrder.quantity}
              onChange={(e) =>
                setNewOrder({
                  ...newOrder,
                  quantity: parseInt(e.target.value, 10) || 0,
                })
              }
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="supplier-select-label">Поставщик</InputLabel>
              <Select
                labelId="supplier-select-label"
                id="supplier-select"
                value={newOrder.supplier}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, supplier: e.target.value })
                }
              >
                <MenuItem value="Поставщик 1">Поставщик 1</MenuItem>
                <MenuItem value="Поставщик 2">Поставщик 2</MenuItem>
                {/*  Добавьте других поставщиков  */}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseOrderDialog}>Отмена</Button>
            <Button onClick={handleAddOrder} color="primary">
              Создать заказ
            </Button>
          </DialogActions>
        </Dialog>
        <WarehouseManagerSettings></WarehouseManagerSettings>
      </div>
    </div>
  );
}

export default WarehouseManager;
