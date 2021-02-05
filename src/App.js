import { useState } from "react";

const App = () => {
  const MIN_LENGTH = 3;
  const MAX_LENGTH = 6;
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleImageChange = (e) => {
    if (e.target.files) {
      if (
        Array.from(e.target.files).length > MAX_LENGTH ||
        selectedFiles.length + Array.from(e.target.files).length > MAX_LENGTH
      ) {
        e.preventDefault();
        alert(`Cannot upload files more than ${MAX_LENGTH}`);
        return;
      } else {
        const filesArray = Array.from(e.target.files).map((file) => {
          const image = new Image();
          debugger;
          image.src = window.URL.createObjectURL(file);
          image.onload = function () {
            const width = this.width;
            const height = this.height;
            if (width < 1980) {
              alert("error! width is: " + width);
            } else {
              alert("okie! width is: " + width);
            }
          };
          return URL.createObjectURL(file);
        });
        setSelectedFiles((prevImages) => prevImages.concat(filesArray));
        Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
      }
    }
  };
  const handleRemoveClick = (index) => {
    const list = [...selectedFiles];
    list.splice(index, 1);
    setSelectedFiles(list);
  };

  const renderPhotos = (source) => {
    return source.map((photo, i) => {
      return (
        <div key={i}>
          <img src={photo} alt="" key={i} />
          <button onClick={() => handleRemoveClick(i)}>Remove</button>
        </div>
      );
    });
  };

  return (
    <>
      <div>
        {renderPhotos(selectedFiles)}
        {selectedFiles.length < MAX_LENGTH && (
          <div>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        )}
      </div>
      {selectedFiles.length < MIN_LENGTH && (
        <div>Slide photo must more than 3</div>
      )}
    </>
  );
};
export default App;
