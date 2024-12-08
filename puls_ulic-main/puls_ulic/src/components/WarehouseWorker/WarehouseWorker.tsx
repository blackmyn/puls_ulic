import React, { useState } from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Button,
  MenuItem,
  Box,
  InputAdornment,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DescriptionIcon from "@mui/icons-material/Description";
import { useAuth } from "../../AuthContext"; // Подключение AuthContext
import LogoutIcon from "@mui/icons-material/Logout";

import "./WarehouseWorker.css";

function WarehouseWorker() {
  const { logout } = useAuth(); // Получение функции выхода из контекста

  const [operationType, setOperationType] = useState("receive"); // Тип операции: "receive" или "issue"
  const [partName, setPartName] = useState(""); // Название запчасти
  const [quantity, setQuantity] = useState(0); // Количество запчастей

  const handleSubmit = () => {
    if (!partName || quantity <= 0) {
      alert("Пожалуйста, заполните все поля корректно.");
      return;
    }

    if (operationType === "receive") {
      console.log(`Получение запчастей: ${partName}, количество: ${quantity}`);
    } else {
      console.log(`Выдача запчастей: ${partName}, количество: ${quantity}`);
    }

    // Очистка полей после отправки
    setPartName("");
    setQuantity(0);
  };

  return (
    <div className="warehouse-worker">
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <MenuIcon sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Работник склада
          </Typography>
          {/* Кнопка выхода */}
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={logout}
          >
            Выйти
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          maxWidth: "600px",
          margin: "40px auto",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Работа с запчастями
        </Typography>
        <TextField
          select
          label="Тип операции"
          value={operationType}
          onChange={(e) => setOperationType(e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="receive">Получение</MenuItem>
          <MenuItem value="issue">Выдача</MenuItem>
        </TextField>

        <TextField
          label="Название запчасти"
          value={partName}
          onChange={(e) => setPartName(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DescriptionIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Количество"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 0)}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                #
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Подтвердить
        </Button>
      </Box>
    </div>
  );
}

export default WarehouseWorker;
