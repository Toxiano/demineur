import React from 'react';

const Options = (props) => {
  const handleDifficultyChange = (e) => {
    props.onDifficultyChange(e.target.value);
  };

  return (
    <div>
      <h2>Choisissez la difficulté :</h2>
      <select onChange={handleDifficultyChange}>
        <option value="beginner">Débutant</option>
        <option value="intermediate">Intermédiaire</option>
        <option value="expert">Expert</option>
        <option value="master">Maître</option>
      </select>
    </div>
  );
};

export default Options;
