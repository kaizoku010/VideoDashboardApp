import React, { useState } from 'react';
import { Storage } from 'aws-amplify';
import AWS from "aws-sdk";

const PopUp = () => {
  const [fileName, setFileName] = useState('');
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState('');
  const [uploadError, setUploadError] = useState(null);
  const [title, setTite] = useState()
  const [thumbnail, setThumbnail] = useState(null);

  

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
    setFileName(file.name); // Update file name for display
  }

  const uploadFile = async () => {
    if (!selectedFile) return;

    const params = {
      // ACL: 'public-read',
      Body: selectedFile,
      Bucket: S3_BUCKET,
      Key: selectedFile.name,
      Metadata: {
        'title': title,
        'description': description
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
      await myBucket.upload(thumbnailParams).promise();
      alert("File uploaded successfully!");
      setDescription("")
      setTite("")
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    }
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTitle =(e)=>{
    setTite(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission if needed
  };

  const handleThumbnailInput = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  return (
    <div className="main-wrapper .main-wrapper " aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
      <div className="form-wrapper ">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-6 pt-4">
            <label className="form-label form-label-2">
              Please Select A Video
            </label>
            <div className="mb-5 file-input">
              <input type="file" accept='video/*' onChange={handleFileInput} name="file" id="file" />
              <label htmlFor="file">
                <div>
                  <span className="drop-file"> Drop files here </span>
                  <span className="or"> Or </span>
                  <span className="browse"> Browse </span>
                </div>
              </label>
            </div>
            <div className="mb-5 file-input">
  <input type="file" accept="image/*" onChange={handleThumbnailInput} name="thumbnail" id="thumbnail" />
  <label htmlFor="thumbnail">
    <div>
      <span className="drop-file">Drop thumbnail here</span>
      <span className="or">Or</span>
      <span className="browse">Browse</span>
    </div>
  </label>
</div>
            <div className="file-list mb-5">
              <textarea value={description} onChange={handleDescriptionChange} />
              <textarea value={title} onChange={handleTitle} />

              <div className="file-item">
                <span className="file-name"> {fileName} </span>
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
            <button type="button" onClick={uploadFile} className="upload-btn">Upload Video</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopUp;