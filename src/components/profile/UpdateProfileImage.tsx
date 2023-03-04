import React, { FunctionComponent, useRef, useState } from "react";
import { DeviiActionButtonGroup } from "components/base";
import { Avatar } from "@mui/material";
import { useNotify } from "react-admin";
import { messageHandler } from "utils";

const fileTypes = [".svg", ".png", ".jpg", ".gif", ".jpeg"];

type UpdateProfileImageProps = {
  onCancel: Function;
};

export const UpdateProfileImage: FunctionComponent<UpdateProfileImageProps> = ({
  onCancel,
}) => {
  const [file, setFile] = useState(null);
  const notify = useNotify();
  const handleSubmit = () => {
    if (file) {
      console.log("upload profile iamge");
    } else {
      messageHandler(notify, "Please load your profile image", "info");
    }
  };

  const handleFile = (file: any) => {
    const { size, name } = file[0];
    const isValidFileType = fileTypes.some((type: string) => {
      const fileExtension = /[.]/.exec(name) ? /[^.]+$/.exec(name) : undefined;
      return fileExtension?.[0].toLowerCase() === type.split(".").pop();
    });
    const isValidSize = size / 1024 / 1024 <= 1;
    if (!isValidFileType) {
      messageHandler(
        notify,
        "You have tried using a file type that will not work for your profile image",
        "error"
      );
      setFile(null);
    } else if (!isValidSize) {
      messageHandler(notify, "File exceeds the 1MB size limit", "error");
      setFile(null);
    } else {
      messageHandler(notify, "Success to load your profile image", "success");
      setFile(file);
    }
  };

  // drag state
  const [dragActive, setDragActive] = useState(false);
  // ref
  const inputRef = useRef(null);

  // handle drag events
  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef && inputRef.current.click();
  };

  return (
    <form
      id="form-file-upload"
      onDragEnter={handleDrag}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input
        ref={inputRef}
        accept={fileTypes.join(",")}
        type="file"
        id="input-file-upload"
        onChange={handleChange}
      />
      <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        className={dragActive ? "drag-active" : ""}
      >
        <Avatar src="upload.svg" alt="upload" />
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            className="upload-button"
            onClick={onButtonClick}
            type="button"
          >
            Click to upload
          </button>
          <p style={{ margin: 0 }}>or drag and drop</p>
        </div>
        <div>
          <p style={{ fontSize: "0.875rem", margin: 0 }}>
            SVG, PNG, JPG or GIF (max. 1MB)
          </p>
        </div>
      </label>
      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
      <DeviiActionButtonGroup onCancel={onCancel} />
    </form>
  );
};
