import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import ModalBasic from "../Model/ModalBasic";
import "react-image-crop/dist/ReactCrop.css";
import { APIURL, getImage } from "../../services/axios/ApiEndPoints";

// Use to crop the image

/**
 * TOOD :
 *      1. Add proper alert message to this component
 *      2. Enable the heigh and width validation
 *      3. Remove file from the file input after corp : Nigam need to look
 *      4. Change the file name as per the componenet name
 */

export default function ImageCropperWithUpload(props) {
  const fileUploadName = "my_file_";

  const generateIds = {
    cropimg: "cropimg_" + props.keyId,
  };
  const allowedFileTypes = `image/gif, image/png, image/jpeg, image/x-png`;
  /// Set Croping stuff
  const [crop, setCrop] = useState({
    aspect: 16 / 9,
    height: props.height,
    unit: "px",
    width: props.width,
    x: 0,
    y: 107,
  });

  // following use when ImageSelect is called
  const [viewImage, setViewImage] = useState(null);
  // following use when Image Use for the Crop
  const [image, setImage] = useState(null);
  // following use set Crop Image but not saved
  const [imageUrl, setImageUrl] = useState(null);
  // following use set Crop Image but not saved
  const [corpImage, setcorpImage] = useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const ref = React.useRef();

  let initImage =
    APIURL +
    getImage +
    "?type=" +
    props.imageIdentity +
    "&&fileName=" +
    props.intitImage;

  const handleFileChange = (e) => {
    let image = e.target.files[0];
    if (image) {
      validateFileSize(
        image,
        function () {
          const imageReader = new FileReader();
          imageReader.readAsDataURL(image);
          imageReader.onloadend = () => {
            setViewImage(imageReader.result);
          };
          setImageModalOpen(true);
        },
        e
      );
    } else {
      e.target.value = null;
    }
  };

  /// Validate the file Size
  const validateFileSize = (image, callBackFunction, e) => {
    if (props.isCheckValidation) {
      // set the size dymemic
      if (image.size > props.MaxFileSize) {
        // 2 MiB for bytes.
        alert("File size must under " + props.MaxFileSizeMessage + "!");
        return false;
      } else if (image) {
        var img = new Image();
        img.src = window.URL.createObjectURL(image);
        img.onload = function () {
          window.URL.revokeObjectURL(img.src);
          callBackFunction();
        };
      }
    } else {
      callBackFunction();
    }
  };

  // const onImageLoad = (image) => {
  //   if (crop) {
  //     setCrop(crop);
  //   }
  //   setImage(image);
  // };

  const onImageLoad = (image) => {
    let aspRatio = props.width / props.height;
    let cWidth = image.target.width / 2;
    let cHeight = image.target.width / 2 / aspRatio;
    let cX = (image.target.width - cWidth) / 2;
    let cY = (image.target.height - cHeight) / 2;

    let corpNew = {
      aspect: 16 / 9,
      height: cHeight,
      unit: "px",
      width: cWidth,
      x: cX,
      y: cY,
    };
    setCrop(corpNew);
    setImage(image);
    if (corpNew) {
      setCrop(corpNew);
      getCroppedImage(image.target, corpNew, "newFile.jpeg");
    }
  };

  function imageCrop(crop) {
    if (crop.height > 0 && crop.width > 0) {
      setCrop(crop);
    }
  }

  function imageCropComplete(crop) {
    userCrop(crop);
  }

  function userCrop(crop) {
    if (image && crop.width && crop.height) {
      getCroppedImage(image.target, crop, "newFile.jpeg");
    }
  }

  function getCroppedImage(image, crop, fileName) {
    const imageCanvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    imageCanvas.width = crop.width;
    imageCanvas.height = crop.height;
    const imgCx = imageCanvas.getContext("2d");
    imgCx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    const imageData64 = imageCanvas.toDataURL();
    setImageUrl(imageData64);
  }

  const onCancel = () => {
    setImageUrl(null);
    setViewImage(null);
    setImage(null);
    setImageModalOpen(false);
  };

  // Save the image in base64 and send to the parent
  const saveImage = (index) => {
    onCancel();
    setcorpImage(imageUrl);
    var file = {
      fileName: "",
      fileStr: imageUrl,
      storagePath: props.imageIdentity,
    };
    props.onSaveImage(file, props.keyId, props.imageIdentity, index);
  };

  // Empty file input to allow same image
  const emptyFileInput = () => {
    ref.current.value = "";
  };

  return (
    <div className="grid grid-cols-12 gap-1">
      <p className="mt-0 lg:text-center font-normal lg:text-base lg:w-[335px] sm:w-[335px] mx-auto  min-contanct">
        {props.dimensionText}
      </p>
      <div className="2xl:col-span-12 lg:col-span-12 col-span-12">
        <div className="img-logo-upload text-center">
          {corpImage ? (
            <img
              id={"defaultimage_" + props.keyId}
              src={corpImage}
              className="border border-slate-300 w-full mb-7"
              alt="../default-img.png"
            ></img>
          ) : initImage ? (
            <img
              id={generateIds.cropimg}
              src={
                APIURL +
                getImage +
                "?type=" +
                props.imageIdentity +
                "&&fileName=" +
                props.intitImage
              }
              className="border border-slate-300 w-full mb-7"
              alt=""
            ></img>
          ) : (
            <img
              id={generateIds.cropimg}
              src={corpImage}
              className="border border-slate-300 w-full mb-7"
              alt=""
            ></img>
          )}

          <label
            htmlFor={fileUploadName + props.keyId}
            aria-controls="add-edit-modal"
            className="btn-lightblue-border"
            onClick={emptyFileInput}
          >
            {props.uploadBtn}
          </label>
          <input
            type="file"
            id={fileUploadName + props.keyId}
            style={{ display: "none" }}
            src="../default-img.png"
            accept={allowedFileTypes}
            onChange={handleFileChange}
            ref={ref}
          />
        </div>
      </div>
      <div className="cropper-model-sec">
        <ModalBasic
          key={props.keyId}
          id={"set-image-upload" + props.keyId}
          modalOpen={imageModalOpen}
          setModalOpen={() => setImageModalOpen(false)}
          title="Set your image"
        >
          {/* Modal content */}
          <div className="selector-popup-inner">
            <div className="image-selector">
              <div className="image-cropper">
                {viewImage != null ? (
                  <ReactCrop
                    key={props.keyId}
                    crop={crop}
                    onChange={imageCrop}
                    onComplete={imageCropComplete}
                    aspect={props.aspactRatio}
                  >
                    <img
                      id={"my_fileimg" + props.keyId}
                      src={viewImage}
                      onLoad={onImageLoad}
                      alt=""
                    />
                  </ReactCrop>
                ) : null}
              </div>
              <div className="selector-btns">
                {/* <img
                    className="border mx-auto my-0 border-[#0a5096]"
                    id={"prvImg" + props.keyId}
                    src={imageUrl}
                    alt=""
                  ></img> */}
                <button
                  className="selector-save"
                  id={"btnSave" + props.keyId}
                  onClick={(e) => {
                    e.stopPropagation();
                    saveImage(props.keyId);
                  }}
                >
                  Save
                </button>
                <button
                  id={"btnCancel" + props.keyId}
                  className="selector-cancel"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCancel();
                  }}
                >
                  Cancel
                </button>

                {/* <div className="flex flex-wrap justify-around mt-7">
                    <button
                      id={"btnCancel" + props.keyId}
                      className="btn bg-[#cd0000] h-[40px] text-lg text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCancel();
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn bg-[#809eae] text-lg text-white"
                      id={"btnSave" + props.keyId}
                      onClick={(e) => {
                        e.stopPropagation();
                        saveImage(props.keyId);
                      }}
                    >
                      Save
                    </button>
                  </div> */}
              </div>
            </div>
          </div>
        </ModalBasic>
      </div>
    </div>
  );
}
