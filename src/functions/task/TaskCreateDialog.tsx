import { useState } from "react";
import { Service } from "../../services/Services";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, TextField } from "@mui/material";
import { ConfirmDialog } from "../../commons/ConfirmDialog";

type TaskCreateDialogProps = {
  service: Service;
  show: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export const TaskCreateDialog: React.FC<TaskCreateDialogProps> = ({ service, show, onClose, onCreated }) => {

  const [name, setName] = useState<string>("");
  const [displayNumber, setDisplayNumber] = useState<number>(1);

  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

  return (
    <>
      <Dialog
        open={show}
        onClose={onClose}
      >
        <DialogTitle>
          タスク作成
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
        title="作成確認"
        content="タスクを作成しますか？"
        okLabel="作成"
        ngLabel="キャンセル"
        onOkClick={() => {
          service.createTask(name, displayNumber);
          onCreated();
          setShowConfirmDialog(false)
          onClose()
        }}
        onNgClick={() => { setShowConfirmDialog(false) }}
        onClose={() => { setShowConfirmDialog(false) }}
      />
    </>
  )
}

