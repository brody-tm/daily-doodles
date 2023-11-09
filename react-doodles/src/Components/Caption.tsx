import React from "react";
import styled from "styled-components";

interface Props {
  text: string;
}

const Caption = ({ text }: Props) => {
  return (
    <>
      <div className="form-outline">
        <textarea
          className="form-control"
          id="textAreaExample"
          rows={4}
          cols={20}
        ></textarea>
        <label className="form-label" htmlFor="textAreaExample">
          {text}
        </label>
      </div>
    </>
  );
};

export default Caption;
