import { AppBar, Box, Divider, Menu, MenuItem, Stack, styled } from "@mui/material";
import { Service } from "../services/Services";
import { useEffect, useRef, useState } from "react";
import { TaskInfo } from "../types";
import { useNavigate, useParams } from "react-router";

import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import toast, { Toaster } from "react-hot-toast";
import { TaskEditDialog } from "../functions/task/TaskEditDialog";
import { ConfirmDialog } from "../commons/ConfirmDialog";
import { TauriService } from "../services/TauriService";

const DeleteMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.error.main,
}));

const scrollbarWidth = window.innerWidth - document.body.clientWidth;

const StyledHeader = styled(AppBar)(() => ({
  fontSize: "1.5em",
  height: "1.5em"
}));

const StyledMenuIcon = styled(MenuIcon)(() => ({
  flexGrow: "0",
  fontSize: "1.5em",
  marginRight: `${scrollbarWidth}px`
}));

type TaskDetailProps = {
  service?: Service;
};

export const TaskDetail: React.FC<TaskDetailProps> = ({ service = new TauriService() }) => {

  const navigate = useNavigate();

  const [taskInfo, setTaskInfo] = useState<TaskInfo | null>(null);
  const { id } = useParams<{ id: string }>();

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuIcon = useRef(null);

  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [showTaskEditDialog, setShowTaskEditDialog] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const ti = await service.getTaskById(parseInt(id ?? "0"));
      setTaskInfo(ti);
    })()
  }, []);

  return (
    <>
      <StyledHeader>
        <Stack direction="row">
          <ArrowBackIcon
            sx={{ flexGrow: "0", fontSize: "1.5em" }}
            onClick={() => navigate(-1)}
          />
          <Box sx={{ flexGrow: "1" }}>{taskInfo?.name}(id: {id})</Box>
          <StyledMenuIcon
            ref={menuIcon}
            onClick={() => setShowMenu(true)}
          />
        </Stack>
      </StyledHeader>
      <Stack
        divider={<Divider flexItem />}
        spacing={2}
      >
        {
          taskInfo?.history.map((e) => <Stack>
            <Box>{e.format()}</Box>
            <Box>({e.fromNow()})</Box>
          </Stack>)
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
        onOkClick={async () => {
          if (id) {
            const taskId = parseInt(id)
            if (taskId) {
              await service.deleteTask(taskId);
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
        onChange={async () => {
          const ti = await service.getTaskById(parseInt(id ?? "0"));
          setTaskInfo(ti);
        }}
        onClose={() => setShowTaskEditDialog(false)}
      />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </>
  )
}
