import React, { useEffect } from "react";
import todo from "@/models/index/todo";
import { Box, Paper, Checkbox, ActionIcon } from "@mantine/core";
import { IconCircleMinus } from "@tabler/icons-react";

interface Props {
  aTodo: todo;
  deleteTodo: (id: number) => void;
}

export default function TodoList(props: Props) {
  const { id, title, completed } = props.aTodo;
  const [checked, setChecked] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    setChecked(completed);
  }, []);

  const handleCheck = () => {
    setChecked(!checked);
  };

  const handleDelete = () => {
    setMounted(false);
    setTimeout(() => {
      props.deleteTodo(id);
    }, 200); // Wait for the transition to finish before deleting the todo
  };

  return (
    <div>
      <Paper
        withBorder
        display={"flex"}
        p={"sm"}
        my={"sm"}
        sx={{
          alignItems: "center",
          transition: "all 0.2s",
          transform: mounted ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "top",
          opacity: mounted ? 1 : 0,
          pointerEvents: mounted ? "auto" : "none",
          "&:hover": { backgroundColor: "#f5f5f5" },
        }}
      >
        <Box
          onClick={handleCheck}
          p={"xs"}
          className="flex items-center cursor-pointer w-[95%]"
        >
          <Checkbox checked={checked} onChange={handleCheck} />
          <Box ml="sm">{title}</Box>
        </Box>
        <ActionIcon className="ml-auto rounded-full" onClick={handleDelete}>
          <IconCircleMinus size={20} color="red" />
        </ActionIcon>
      </Paper>
    </div>
  );
}
