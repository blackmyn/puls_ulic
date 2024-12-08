import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, InputAdornment } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

interface RequestPartDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (partName: string, quantity: number) => void;
}

const RequestPartDialog: React.FC<RequestPartDialogProps> = ({ open, onClose, onSubmit }) => {
  const [partName, setPartName] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = () => {
    onSubmit(partName, quantity);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Запрос на запчасти</DialogTitle>
      <DialogContent>
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
          onChange={(e) => setQuantity(Number(e.target.value))}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit} color="primary">
          Отправить запрос
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestPartDialog;
