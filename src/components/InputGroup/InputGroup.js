import React from "react";

const InputGroup = props => (
  <form className="pt-2">
    <div className="input-group mb-3">
      <input
        onChange={props.change}
        type="text"
        required
        className="form-control"
        value={props.value}
        placeholder="Search for TV show"
      />
    </div>
  </form>
);

export default InputGroup;