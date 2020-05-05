import React from 'react';
import Dropzone from 'react-dropzone';

export const loop = (..._: any[]) => {};

const Uploader = ({ onUpload = loop, className = '' }) => {
  return (
    <Dropzone onDrop={(files: any) => {
        const reader = new FileReader();
        reader.onload = () => {
          onUpload(reader.result);
        };
        reader.readAsArrayBuffer(files[0]);
      }}>
      {({ getRootProps, getInputProps }) => (
        <div className={className} {...getRootProps()}>
          <input {...getInputProps()} />
          Drag and drop your files anywhere or <br />
          Upload a file
        </div>
      )}
    </Dropzone>
  );
};

export { Uploader };