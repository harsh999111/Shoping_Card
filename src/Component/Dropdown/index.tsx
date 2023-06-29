import React, { useState } from 'react';

function Dropdown(props) {
  const { selectedValue, setSelectedValue, errorMessage, setErrorMessage } = props;

  return (
    <div>
      <select
        value={selectedValue}
        onChange={(e) => {
          setSelectedValue(e.target.value);
          setErrorMessage('');
        }}
      >
        <option value="">Select an option</option>
        <option value="option1">HTML5</option>
        <option value="option2">CSS</option>
        <option value="option3">JavaScript</option>
      </select>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default Dropdown;
