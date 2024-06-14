import React, { useState } from 'react';
import AWS from "aws-sdk";
import "./Popup.css"

const PopUp = () => {
  const [fileName, setFileName] = useState('');
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState('');
  const [uploadError, setUploadError] = useState(null);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [type, setType] = useState('');

  const S3_BUCKET = 'moxiescreen';
  const REGION = 'us-east-1';

  AWS.config.update({
    region: REGION,
    credentials: {
      accessKeyId: "AKIAQ3EGP2YOTF7EHSMS",
      secretAccessKey: "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"
    }
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
  };

  const uploadFile = async () => {
    if (!selectedFile || !type) return;

    const params = {
      Body: selectedFile,
      Bucket: S3_BUCKET,
      Key: selectedFile.name,
      Metadata: {
        'title': title,
        'description': description,
        'type': type
      }
    };

    const thumbnailParams = {
      Body: thumbnail,
      Bucket: S3_BUCKET,
      Key: `thumbnails/${selectedFile.name}.jpg`,
      ContentType: 'image/jpeg',
      Metadata: {
        'associated_video': selectedFile.name 
      }
    };

    try {
      await myBucket.upload(params)
      .on('httpUploadProgress', (progressEvent) => {
        const uploadedBytes = progressEvent.loaded;
        const totalBytes = progressEvent.total;
        const uploadProgress = Math.round((uploadedBytes / totalBytes) * 100);
        setProgress(uploadProgress);
      })
      .promise();

      if (thumbnail) {
        await myBucket.upload(thumbnailParams).promise();
      }
      alert("File uploaded successfully!");
      setDescription("");
      setTitle("");
      setType("");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleThumbnailInput = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  return (
    <div className="main-wrapper">
      <div className="form-wrapper">
        <form onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
          <div className="mb-6 pt-4">
            <label className="form-label">
              Please Select A Video or Image
            </label>
            <div className="mb-5 file-input">
              <input type="file" accept="video/*,image/*" onChange={handleFileInput} name="file" id="file" />
              <label htmlFor="file">
                <div>
                  <span className="drop-file">Drop Video Or Image Here</span>
                  <span className="or">Or</span>
                  <span className="browse">Browse</span>
                </div>
              </label>
            </div>
            <div className="file-input">
              <input type="file" accept="image/*" onChange={handleThumbnailInput} name="thumbnail" id="thumbnail" />
              <label htmlFor="thumbnail">
                <div>
                  <span className="drop-file">Drop Thumbnail Here</span>
                  <span className="or">Or</span>
                  <span className="browse">Browse</span>
                </div>
              </label>
            </div>
            <div className="file-list mb-5">
              <label htmlFor="ad-title">Ad Title</label>
              <input id='ad-title' value={title} onChange={handleTitleChange} />
              <label htmlFor="ad-desc">Ad Description</label>
              <input id='ad-desc' value={description} onChange={handleDescriptionChange} />
              <label htmlFor="ad-type">Ad Type</label>
              <select id='ad-type' value={type} onChange={handleTypeChange}>
                <option value="">Select Type</option>
                <option value="video">Video</option>
                <option value="image">Image</option>
              </select>
              <div className="file-item">
                <span className="file-name">{fileName}</span>
              </div>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${progress}%` }}
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {progress}%
                </div>
              </div>
            </div>
          </div>
          <div>
            <button type="button" onClick={uploadFile} className="upload-btn">Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopUp;
