import Image from "next/image.js";
import React, { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  padding: 24px;
`;

export default function Form() {
  const [images, setImage] = useState([]);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const response = await fetch("/api/upload-multiple", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("data", data);
    if (data.images) {
      setImage(data.images);
    } else {
      setError(data);
    }
  }

  return (
    <div>
      {images &&
        images.map((image) => (
          <div key={image.asset_id}>
            <Image
              src={image.url}
              alt="new image on cloudinary"
              height="100"
              width="100"
            />
          </div>
        ))}
      {error && <div>{error.message}</div>}
      <StyledForm onSubmit={handleSubmit}>
        <input name="file" type="file" accept="image/*" multiple />
        <button>Submit</button>
      </StyledForm>
    </div>
  );
}
