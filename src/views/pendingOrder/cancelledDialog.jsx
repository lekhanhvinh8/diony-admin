import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { adminCancelOrder } from "../../app/services/orderService";
import { adminCancelledReasons } from "../../config.json";
import { reloadPendingOrders } from "./../../app/store/ui/pendingOrders";

export default function CancelledDialog({ order, dialogOpen, setDialogOpen }) {
  const dispatch = useDispatch();
  const [selectedReasonIndex, selectReasonIndex] = useState("0");

  return (
    <Box>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Are you sure to cancel an order ?</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Please select a reason for cancellation
            </FormLabel>
            <RadioGroup
              aria-label="gender"
              name="controlled-radio-buttons-group"
              value={selectedReasonIndex}
              onChange={(event) => {
                selectReasonIndex(event.target.value);
              }}
            >
              {adminCancelledReasons.map((element, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    value={index}
                    label={element.reason}
                    control={<Radio />}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Back</Button>
          <Button
            onClick={async () => {
              if (order) {
                try {
                  await adminCancelOrder(
                    order.id,
                    adminCancelledReasons[Number.parseInt(selectedReasonIndex)]
                      .reason
                  );

                  dispatch(reloadPendingOrders());

                  setDialogOpen(false);
                  toast.success("Cancel an order successfully");
                } catch (ex) {
                  setDialogOpen(false);
                  toast.error("Cancel an order failure");
                }
              }
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
