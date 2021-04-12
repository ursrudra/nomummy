import React, { useState } from "react";
import { storage } from "../../firebase/firebase";
import { useAuth } from "../../hooks/useAuth";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    overflow: "hidden",
  },
  progressRoot: {
    position: "absolute",
    zIndex: -1,
  },
  input: {
    display: "none",
    borderRadius: "50%",
  },
  container: {
    height: "160px",
    width: "160px",
    border: "1px dashed black",
    borderRadius: "50%",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));
function UploadImage({ url }) {
  const classes = useStyles();
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const [progress, setProgress] = useState(0);
  const { updateProfile, user, setUser } = useAuth();
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const uploadToFirebase = (image) => {
    const uploadTask = storage.ref(`profiles/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () =>
        storage
          .ref("profiles")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            updateProfile({ photoURL: url });
            setUser({ ...user, photoURL: url });
          })
    );
  };
  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    console.log(file);

    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      uploadToFirebase(file);
    }
  };

  return (
    <div className={classes.root}>
      {/*<CircularProgress
        variant="determinate"
        value={progress}
        size={200}
        className={classes.progressRoot}
      />*/}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={imageUploader}
        className={classes.input}
      />
      <div
        className={classes.container}
        onClick={() => imageUploader.current.click()}
      >
        <img
          ref={uploadedImage}
          alt="profile pic"
          src={url}
          className={classes.image}
        />
      </div>
    </div>
  );
}
export default UploadImage;
