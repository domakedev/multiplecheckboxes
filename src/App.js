import { useState } from "react";

import "./App.css";
import PodcastCover from "./images/podcast-cover.png";
import Episodes from "./epidosdes";

function App() {
  const [checkeds, setCheckeds] = useState(Episodes);

  const onChecked = (e) => {
    const elementos = [...checkeds].map((el) => {
      if (el.id === Number(e.target.id) - 1) {
        el.checked = !el.checked;
        return el;
      }
      return el;
    });

    setCheckeds([...elementos]);
  };

  const onShiftPressed = (e) => {
    if (e.key !== "Shift") {
      return;
    }

    const primerChecked = checkeds.filter((el) => el.checked === true);

    const ultimoChecked = e.target.id;

    const enMedio = [...checkeds].filter(
      (el) => el.id > primerChecked[0].id && el.id < ultimoChecked
    );

    const checkMediosIDs = enMedio.map((el) => el.id - 1);

    const cambiados = checkeds.map((el) => {
      if (checkMediosIDs.includes(el.id)) {
        el.checked = true;
        return el;
      }
      return el;
    });

    setCheckeds(cambiados);
  };

  return (
    <div className="wrapper">
      <div className="cover">
        <img src={PodcastCover} alt="Compressed.fm" />
      </div>
      <div className="content">
        <h1>Listen to all the Compressed.fm Episodes</h1>

        <ul>
          {checkeds.map((e, i) => (
            <li key={i}>
              <label htmlFor={`episode-${i + 1}`}>
                <input
                  type="checkbox"
                  name={e.name}
                  id={i + 1}
                  checked={e.checked || false}
                  onChange={(e) => onChecked(e)}
                  onKeyDown={(e) => onShiftPressed(e)}
                />
                <span>
                  {i} || {e.name}
                </span>
              </label>
            </li>
          ))}
        </ul>

        <button>Mark as Played</button>
      </div>
    </div>
  );
}

export default App;
