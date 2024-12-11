import React, { useState } from "react";
import "./OrderList.css";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  ListItemIcon,
  Divider,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";

interface OrderItem {
  id: string;
  from: string;
  to: string;
  status: "Новый" | "Принят" | "Выполнен";
}

function OrderList() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: "1",
      from: "ул. Пушкина, 10",
      to: 'ТЦ "Галерея" ',
      status: "Новый",
    },
    {
      id: "2",
      from: "Аэропорт",
      to: " ул. Ленина, 5  ",
      status: "Принят",
    },
    {
      id: "3",
      from: "ул. Советская, 25",
      to: "Ж/д вокзал ",
      status: "Выполнен",
    },
  ]);

  const handleAcceptOrder = (orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "Принят" } : order
      )
    );
  };

  const handleCompleteOrder = () => {
    navigate("/acceptedorder"); 
  };

  return (
    <div className="order-list-section">
      <Typography variant="h5" component="h3" gutterBottom>
        Список заказов
      </Typography>
      <List>
        {orders.map((order) => (
          <React.Fragment key={order.id}>
            <ListItem>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" component="span">
                    {order.from} - {order.to}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    component="span"
                    className={`order-status ${order.status.toLowerCase()}`}
                  >
                    {order.status}
                  </Typography>
                }
              />
              {order.status === "Новый" && (
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => handleAcceptOrder(order.id)}
                >
                  Принять
                </Button>
              )}
              {order.status === "Принят" && (
                <Button
                  variant="contained"
                  color="info"
                  onClick={handleCompleteOrder}
                >
                  Выполнить
                </Button>
              )}
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default OrderList;