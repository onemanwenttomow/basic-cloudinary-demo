import Image from "next/image.js";
import React, { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  padding: 24px;
`;

export default function Form() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("data", data);
    if (data.secure_url) {
      setImage(data);
    } else {
      setError(data);
    }
  }

  return (
    <div>
      {image && (
        <div>
          <Image
            src={image.url}
            alt="new image on cloudinary"
            height="100"
            width="100"
          />
        </div>
      )}
      {error && <div>{error.message}</div>}
      <StyledForm onSubmit={handleSubmit}>
        <input name="file" type="file" accept="image/*" />
        <button>Submit</button>
      </StyledForm>
    </div>
  );
}
