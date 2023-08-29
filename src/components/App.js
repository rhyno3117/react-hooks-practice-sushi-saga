import React, { useEffect, useState } from "react";
import SushiContainer from "./SushiContainer";
import Table from "./Table";

const API = "http://localhost:3001/sushis";

function App() {
  const [budget, setBudget] = useState(100);
  const [sushis, setSushis] = useState([]);

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then(setSushis);
  }, []);

  function eatSushi(sushiToEat) {
    if (budget >= sushiToEat.price && !sushiToEat.eaten) {
      setBudget(budget - sushiToEat.price);

      const newSushis = sushis.map((sushi) =>
        sushi.id === sushiToEat.id ? { ...sushi, eaten: true } : sushi
      );

      setSushis(newSushis);
    }
  }

  return (
    <div className="app">
      <SushiContainer sushis={sushis} eatSushi={eatSushi} />
      <Table plates={sushis.filter(sushi=>sushi.eaten)} budget={budget} />
    </div>
  );
}

export default App;
