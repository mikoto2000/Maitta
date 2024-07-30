import { AppBar, Box, Divider, Menu, MenuItem, Stack, styled } from "@mui/material";
import { MockService } from "../services/MockService";
import { Service } from "../services/Services";
import { useEffect, useRef, useState } from "react";
import { TaskInfo } from "../types";
import { useNavigate, useParams } from "react-router";

import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import toast, { Toaster } from "react-hot-toast";
import { TaskEditDialog } from "../functions/task/TaskEditDialog";
import { ConfirmDialog } from "../commons/ConfirmDialog";

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
  const [showTaskEditDialog, setShowTaskEditDialog] = useState<boolean>(false);

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
          <Box sx={{ flexGrow: "1" }}>{taskInfo?.name}(id: {id})</Box>
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
        <MenuItem
          onClick={() => setShowTaskEditDialog(true)}
        >
          タスクを編集
        </MenuItem>
        <DeleteMenuItem
          onClick={() => setShowConfirmDialog(true)}
        >
          タスクを削除
        </DeleteMenuItem>
      </Menu>
      <ConfirmDialog
        show={showConfirmDialog}
        title="削除確認"
        content={`タスク ID: ${id} のタスクを削除しますか？`}
        okLabel="削除"
        ngLabel="キャンセル"
        onOkClick={() => {
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
        }}
        onNgClick={() => setShowConfirmDialog(false)}
        onClose={() => setShowConfirmDialog(false)}
      />
      <TaskEditDialog
        show={showTaskEditDialog}
        service={service}
        id={taskInfo?.id ?? 0}
        originalName={taskInfo?.name ?? ""}
        originalDisplayNumber={taskInfo?.displayNumber ?? 0}
        onClose={() => setShowTaskEditDialog(false)}
      />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </>
  )
}
