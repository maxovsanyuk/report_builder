import React, { useState } from "react";
import { AnimatedComponent } from "../../views/AnimatedComponent";
import ImageUploader from "react-images-upload";

import styled from "styled-components";

import isEmpty from "lodash/isEmpty";

const ImageManagerComp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: calc(100% - 90px);

  .errorsContainer {
    height: 30px;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .images-box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 20px 0 0 0;
    width: calc(100% - 40px);
    height: 400px;
    overflow: auto;
    background: #fff;
    padding: 20px;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.05);
    border-radius: 10px;

    &::-webkit-scrollbar {
      display: none;
    }

    .img {
      border: none;
      &:hover {
        cursor: pointer;
      }
    }
  }

  .img-loader {
    &:hover {
      cursor: pointer;
    }
  }
`;

const SidebarImageManager = () => {
  const [imagesState, setImagesState] = useState();

  console.log(imagesState, "imagesState");

  return (
    <AnimatedComponent>
      <h2 style={{ textAlign: "center" }}>Image Manager</h2>

      <ImageManagerComp>
        <div className="images-box">
          {imagesState &&
            imagesState.map((i) => {
              return (
                <img
                  onClick={() =>
                    setImagesState(
                      imagesState.filter((img) => img.name !== i.name)
                    )
                  }
                  style={{
                    width: "200px",
                    height: "200px",
                    background: `url(${URL.createObjectURL(
                      i
                    )}) no-repeat center`,
                    backgroundSize: "contain",
                    margin: "10px",
                    boxShadow: "3px 5px 3px 0 rgba(0, 0, 0, 0.05)",
                  }}
                  className="img"
                  key={i.name}
                  alt=""
                />
              );
            })}
        </div>

        <ImageUploader
          className="img-loader"
          withIcon
          buttonText="Choose images"
          onChange={(pFile, pUrl) =>
            setImagesState(
              !isEmpty(imagesState)
                ? imagesState.filter((i) => i.name !== pFile.name)
                : pFile
            )
          }
          imgExtension={[".jpg", "jpeg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
        />
      </ImageManagerComp>
    </AnimatedComponent>
  );
};

export default SidebarImageManager;

// xsd
