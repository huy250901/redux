import React, { useState, useEffect } from "react";
import axios from "axios";
// import { format } from "date-fns";
import "./phototable.css";

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

function PhotoTable() {
  const [initialCount, setInitialCount] = useState<number>(10);
  const [displayedPhotos, setDisplayedPhotos] = useState<Photo[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

  const [photos, setPhotos] = useState<Photo[]>([]);
  // const [isFetching, setIsFetching] =
  //   useState<boolean>(false);
  const [updatedTitles, setUpdatedTitles] = useState<{
    [key: number]: string;
  }>({});
  const [resetRequired, setResetRequired] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // setIsFetching(true);
        setIsLoading(true);
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${perPage}`
        );
        setPhotos([...photos, ...response.data]);
        setIsLoading(false);
        setPhotos(response.data);
        // setIsFetching(false);
        setDisplayedPhotos(photos.slice(0, initialCount));
      } catch (error) {
        console.log(error);
        // setIsFetching(false);
      }
    }

    fetchData();
  }, [page]);

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    photoId: number
  ) => {
    setUpdatedTitles({
      ...updatedTitles,
      [photoId]: event.target.value,
    });

    if (
      event.target.value !== photos.find((photo) => photo.id === photoId)?.title
    ) {
      setResetRequired(true);
    }
  };

  const handleReset = () => {
    setUpdatedTitles({});
    setResetRequired(false);
  };

  const handleConfirmUpdate = () => {
    const updatedPhotos = photos.map((photo) => {
      if (updatedTitles[photo.id]) {
        return { ...photo, title: updatedTitles[photo.id] };
      } else {
        return photo;
      }
    });

    setPhotos(updatedPhotos);
    setUpdatedTitles({});
    setResetRequired(false);
  };

  return (
    <div className="container">
      <>
        <div className="row header">
          <div className="col-sm-2">Thumbnail</div>
          <div className="col-sm-6">Title</div>
          <div className="col-sm-2">Date</div>
        </div>
        {photos.map((photo) => (
          <div
            key={photo.id}
            className={`row ${photo.id % 2 === 0 ? "grey" : "red"}`}
          >
            <div className="col-sm-2">
              <img src={photo.thumbnailUrl} alt={photo.title} />
            </div>
            <div className="col-sm-6">
              {updatedTitles[photo.id] ? (
                <input
                  type="text"
                  value={updatedTitles[photo.id]}
                  onChange={(event) => handleTitleChange(event, photo.id)}
                  // onBlur={() => setResetRequired(true)}
                />
              ) : (
                <label
                  onMouseOver={(event) =>
                    (event.currentTarget.style.border = "2px solid #0097ff")
                  }
                  onMouseLeave={(event) =>
                    (event.currentTarget.style.border = "none")
                  }
                  onClick={() =>
                    setUpdatedTitles({
                      ...updatedTitles,
                      [photo.id]: photo.title,
                    })
                  }
                >
                  {photo.title}
                </label>
              )}
            </div>
            <div className="col-sm-2">
              <div>{Date.now()}</div>
            </div>
          </div>
        ))}
      </>
      {/* )} */}
      {
        // (Object.keys(updatedTitles).length > 0 ||
        //   resetRequired) &&
        <div className="row button-row position">
          <button
            className="btn btn-primary"
            onClick={handleConfirmUpdate}
            disabled={Object.keys(updatedTitles).length === 0}
          >
            Confirm Update
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={!resetRequired}
          >
            Reset
          </button>
        </div>
      }
    </div>
  );
}

export default PhotoTable;
