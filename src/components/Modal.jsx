import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";

const Modal = ({ open, onClose, children, title }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        borderBottom={"1px solid #eee"}
      >
        <DialogTitle>{title}</DialogTitle>
        <IconButton sx={{ mr: 3 }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <DialogContent
        sx={{
          overflowX: "hidden",
        }}
      >
        <Box
          sx={{
            width: {
              xs: "60vw",
              md: "40vw",
            },
          }}
        >
          {children}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
