import { useEffect, useState } from "react";
import { Service } from "../../services/Services";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, TextField } from "@mui/material";
import { ConfirmDialog } from "../../commons/ConfirmDialog";

type TaskEditDialogProps = {
  service: Service;
  show: boolean;
  onClose: () => void;
  id: number;
  originalName: string;
  originalDisplayNumber: number;
};

export const TaskEditDialog: React.FC<TaskEditDialogProps> = ({ service, show, onClose, id, originalName, originalDisplayNumber }) => {

  const [name, setName] = useState<string>(originalName);
  const [displayNumber, setDisplayNumber] = useState<number>(originalDisplayNumber);

  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

  useEffect(() => {
    setName(originalName);
    setDisplayNumber(originalDisplayNumber);
  }, [originalName, originalDisplayNumber]);

  return (
    <>
      <Dialog
        open={show}
        onClose={onClose}
      >
        <DialogTitle>
          タスク編集
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="タスク名"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <TextField
              label="表示数"
              type="number"
              value={displayNumber}
              onChange={(e) => setDisplayNumber(parseInt(e.currentTarget.value) ?? -1)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>キャンセル</Button>
          <Button variant="contained" color="primary" onClick={() => {
            setShowConfirmDialog(true)
          }}>保存</Button>
        </DialogActions>
      </Dialog>
      <ConfirmDialog
        show={showConfirmDialog}
        title="変更確認"
        content="タスク名・表示数を変更しますか？"
        okLabel="変更"
        ngLabel="キャンセル"
        onOkClick={() => {
          service.updateTask(id, name, displayNumber);
          setShowConfirmDialog(false)
          onClose()
        }}
        onNgClick={() => { setShowConfirmDialog(false) }}
        onClose={() => { setShowConfirmDialog(false) }}
      />
    </>
  )
}
