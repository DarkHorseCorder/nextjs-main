/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Snackbar,
  SnackbarProps,
  SnackbarOrigin,
  Alert as MuiAlert,
  Box,
  Typography,
} from "@mui/material";
import clsx from "clsx";

import {
  useNotificationContext,
  undoableEventEmitter,
  useTranslate,
} from "ra-core";
import { styles } from "./style";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const defaultAnchorOrigin: SnackbarOrigin = {
  vertical: "bottom",
  horizontal: "center",
};

const PREFIX = "RaNotification";

export const NotificationClasses: any = {
  success: `${PREFIX}-success`,
  error: `${PREFIX}-error`,
  warning: `${PREFIX}-warning`,
  undo: `${PREFIX}-undo`,
  multiLine: `${PREFIX}-multiLine`,
};

export interface NotificationProps extends Omit<SnackbarProps, "open"> {
  type?: string;
  autoHideDuration?: number;
  multiLine?: boolean;
}

/**
 * Provides a way to show a notification.
 * @see useNotify
 *
 * @example <caption>Basic usage</caption>
 * <Notification />
 *
 * @param props The component props
 * @param {string} props.type The notification type. Defaults to "info".
 * @param {number} props.autoHideDuration Duration in milliseconds to wait until hiding a given notification. Defaults to 4000.
 * @param {boolean} props.multiLine Set it to `true` if the notification message should be shown in more than one line.
 */
const DeviiNotification = (props: NotificationProps) => {
  const {
    className,
    type = "info",
    autoHideDuration = 4000,
    multiLine = false,
    anchorOrigin = defaultAnchorOrigin,
    ...rest
  } = props;
  const { notifications, takeNotification } = useNotificationContext();
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<any>(undefined);
  const translate = useTranslate();

  useEffect(() => {
    if (notifications.length && !messageInfo) {
      // Set a new snack when we don"t have an active one
      setMessageInfo(takeNotification());
      setOpen(true);
    } else if (notifications.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [notifications, messageInfo, open, takeNotification]);

  const handleRequestClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleExited = useCallback(() => {
    if (messageInfo && messageInfo.notificationOptions.undoable) {
      undoableEventEmitter.emit("end", { isUndo: false });
    }
    setMessageInfo(undefined);
  }, [messageInfo]);

  const handleUndo = useCallback(() => {
    undoableEventEmitter.emit("end", { isUndo: true });
    setOpen(false);
  }, []);

  if (!messageInfo) return null;

  return (
    <Snackbar
      className={className}
      open={open}
      autoHideDuration={
        messageInfo.notificationOptions.autoHideDuration || autoHideDuration
      }
      disableWindowBlurListener={messageInfo.notificationOptions.undoable}
      TransitionProps={{ onExited: handleExited }}
      onClose={handleRequestClose}
      ContentProps={{
        className: clsx(NotificationClasses[messageInfo.type || type], {
          [NotificationClasses.multiLine]:
            messageInfo.notificationOptions.multiLine || multiLine,
        }),
      }}
      action={
        messageInfo.notificationOptions.undoable ? (
          <Button
            color="primary"
            className={NotificationClasses.undo}
            size="small"
            onClick={handleUndo}
          >
            <>{translate("ra.action.undo")}</>
          </Button>
        ) : null
      }
      anchorOrigin={anchorOrigin}
      {...rest}
      sx={styles}
    >
      <Alert severity={messageInfo.type} onClose={handleRequestClose}>
        <Box component="div">
          <Typography variant="body1">
            {`${messageInfo.type[0].toUpperCase()}${messageInfo.type.substring(1)}`}:
          </Typography>
        </Box>
        <Typography variant="body2" component="p">
          {messageInfo.message &&
            translate(
              messageInfo.message,
              messageInfo.notificationOptions.messageArgs
            )}
        </Typography>
      </Alert>
    </Snackbar>
  );
};

DeviiNotification.propTypes = {
  type: PropTypes.string,
  autoHideDuration: PropTypes.number,
  multiLine: PropTypes.bool,
};

export default DeviiNotification;
