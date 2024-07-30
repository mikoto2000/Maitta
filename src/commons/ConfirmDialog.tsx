import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import React from "react";
import toast from "react-hot-toast";

type ConfirmDialogProps = {
  show: boolean;
  title: string;
  content: string;
  okLabel: string;
  ngLabel: string;
  onOkClick: () => void;
  onNgClick: () => void;
  onClose: () => void;
};

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  show,
  title,
  content,
  okLabel,
  ngLabel,
  onOkClick,
  onNgClick,
  onClose,
}) => {

  return (
      <Dialog
        open={show}
        onClose={() => onClose}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button onClick={onNgClick}>{ngLabel}</Button>
          <Button variant="contained" color="error" onClick={onOkClick}>{okLabel}</Button>
        </DialogActions>
      </Dialog>
  )
}
