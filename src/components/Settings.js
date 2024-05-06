import React, { useEffect, useState } from "react";

export default function Settings(props) {
  const { toggleInclude, wordArrays, toggleShowCategory, showCategory } = props;
  const [atLeastOneInclude, setAtLeastOneInclude] = useState(false);

  useEffect(() => {
    // Check if at least one include key is true
    const anyIncludeTrue = Object.values(wordArrays).some((arraySettings) => arraySettings.include);
    setAtLeastOneInclude(anyIncludeTrue);
  }, [wordArrays]); // Re-run effect when wordArrays change

  return (
    <div className="settings-page page">
      <div className="top">
        <h2 className="fw-700 heading white-text">Settings</h2>
      </div>
      <div className="all-settings">


        <h3 className="fw-700 white-text">Category on Card</h3>
        <div className="white-text show-category">
          <div className="setting category-setting mb-4">
            <span>Show Category Title:</span>
            {/* Replace the checkbox with the styled toggle switch */}
            <label className="toggle-switch">
              <input type="checkbox" checked={showCategory} onChange={() => toggleShowCategory()} />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="white-text settings-pairs">
          <h3 className="fw-700">Select Categories: </h3>
          {Object.entries(wordArrays).map(([arrayName, arraySettings]) => (
            <div key={arrayName} className="setting">
              <span>{arraySettings.name}</span>
              {/* Replace the checkbox with the styled toggle switch */}
              <label className="toggle-switch">
                <input type="checkbox" checked={arraySettings.include} onChange={() => toggleInclude(arrayName)} />
                <span className="slider"></span>
              </label>
            </div>
          ))}
        </div>
     
  

      </div>
      <div className="bottom">
        <button className="button" onClick={props.changeSettings} disabled={!atLeastOneInclude}>
          Submit
        </button>
      </div>
    </div>
  );
}
