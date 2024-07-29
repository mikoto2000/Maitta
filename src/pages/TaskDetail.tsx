import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Menu, MenuItem, Stack, styled } from "@mui/material";
import { MockService } from "../services/MockService";
import { Service } from "../services/Services";
import { useEffect, useRef, useState } from "react";
import { TaskInfo } from "../types";
import { useNavigate, useParams } from "react-router";

import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import toast, { Toaster } from "react-hot-toast";

const DeleteMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.error.main,
}));

type TaskDetailProps = {
  service?: Service;
};

export const TaskDetail: React.FC<TaskDetailProps> = ({ service = new MockService() }) => {

  const navigate = useNavigate();

  const scrollbarWidth = window.innerWidth - document.body.clientWidth;

  const [taskInfo, setTaskInfo] = useState<TaskInfo | null>(null);
  const { id } = useParams<{ id: string }>();

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuIcon = useRef(null);

  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

  useEffect(() => {
    const ti = service.getTaskById(parseInt(id ?? "0"));
    setTaskInfo(ti);
  }, []);

  return (
    <>
      <AppBar sx={{ fontSize: "2em", height: "1em" }}>
        <Stack direction="row">
          <ArrowBackIcon
            sx={{ flexGrow: "0", fontSize: "1em" }}
            onClick={() => navigate(-1)}
          />
          <Box sx={{ flexGrow: "1" }}>{taskInfo?.name}</Box>
          <MenuIcon
            ref={menuIcon}
            sx={{ flexGrow: "0", fontSize: "1em", marginRight: `${scrollbarWidth}px` }}
            onClick={() => setShowMenu(true)}
          />
        </Stack>
      </AppBar>
      <Stack
        divider={<Divider flexItem />}
        spacing={2}
      >
        {
          taskInfo?.history.map((e) => <Box>{e.format()}</Box>)
        }
      </Stack>
      <Menu
        anchorEl={menuIcon.current}
        open={showMenu}
        onClose={() => setShowMenu(false)}
      >
        <MenuItem>
          タスクを編集
        </MenuItem>
        <DeleteMenuItem
          onClick={() => setShowConfirmDialog(true)}
        >
          タスクを削除
        </DeleteMenuItem>
      </Menu>
      <Dialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
      >
        <DialogTitle>削除確認</DialogTitle>
        <DialogContent>
          {`タスク ID: ${id} のタスクを削除しますか？`}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDialog(false)}>キャンセル</Button>
          <Button variant="contained" color="error" onClick={() => {
            if (id) {
              const taskId = parseInt(id)
              if (taskId) {
                service.deleteTask(taskId);
                navigate(-1)
              } else {
                toast.error("タスク ID のパースに失敗しました。")
              }
            } else {
              toast.error("タスク ID が指定されていません。")
            }
          }}>削除</Button>
        </DialogActions>
      </Dialog>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </>
  )
}
