import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { brewData, coffeeUnitOptions, waterUnitOptions } from "../data/brewMethodData";
import Link from "next/link";
import styles from "../styles/Recipe.module.scss";

const Recipe = () => {
  const router = useRouter();
  const { method } = router.query;
  const currentMethod = brewData.filter((m) => m.name === method)[0] || {};
  const { name, ratio, maxCoffee, waterTemp, grindSize, instructions } = currentMethod;

  const [amountOfCoffee, setAmountOfCoffee] = useState(0);
  const [coffeeUnits, setCoffeeUnits] = useState("g");
  const [amountOfWater, setAmountOfWater] = useState(0);
  const [waterUnits, setWaterUnits] = useState("g");

  useEffect(() => {
    setAmountOfCoffee(currentMethod.startingCoffee);
    setAmountOfWater(currentMethod.startingWater);
  }, [currentMethod]);

  // allows user to scroll horizontally through the methods with the mouse wheel
  const hzMouseScroll = useRef();
  const scrollHorizontal = (event) => {
    hzMouseScroll.current.scrollLeft += event.deltaY;
  };

  const round = (value, precision) => {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  };

  // indecies match up with unit options [g, oz, Tbsp, tsp]
  const coffeeUnitFactor = [1, 0.035274, 0.2, 0.066667];
  const convertCoffeeUnits = (sourceUnit, targetUnit, sourceValue) => {
    const sourceIdx = coffeeUnitOptions.indexOf(sourceUnit);
    const sourceFactor = coffeeUnitFactor[sourceIdx];

    const targetIdx = coffeeUnitOptions.indexOf(targetUnit);
    const targetFactor = coffeeUnitFactor[targetIdx];

    const sourceGrams = sourceValue / sourceFactor;
    const convertedValue = sourceGrams * targetFactor;
    return [convertedValue, sourceGrams];
  };

  // indecies match up with unit options [g, fl oz, mL, C]
  const waterUnitFactor = [1, 0.0338, 1, 0.00423];
  const convertWaterUnits = (sourceUnit, targetUnit, sourceValue) => {
    const sourceIdx = waterUnitOptions.indexOf(sourceUnit);
    const sourceFactor = waterUnitFactor[sourceIdx];

    const targetIdx = waterUnitOptions.indexOf(targetUnit);
    const targetFactor = waterUnitFactor[targetIdx];

    const sourceGrams = sourceValue / sourceFactor;
    const convertedValue = sourceGrams * targetFactor;
    return [convertedValue, sourceGrams];
  };

  const handleCoffeeChange = (event) => {
    const updatedCoffee = event.target.value * 1;

    // function gives the amount of coffee in grams as index 1 -> [..., grams of coffee]
    const convertedCoffee = convertCoffeeUnits(coffeeUnits, "g", updatedCoffee);

    // multiply amount of coffee in grams by ratio, then convert to current units of water
    const convertedWater = convertWaterUnits("g", waterUnits, convertedCoffee[1] * ratio);

    // update coffee, coffee units, and water
    setAmountOfCoffee(updatedCoffee);
    setAmountOfWater(round(convertedWater[0], 2));
  };

  const handleWaterChange = (event) => {
    const updatedWater = event.target.value * 1;

    // function gives the amount of water in grams as index 1 -> [..., grams of water]
    const convertedWater = convertWaterUnits(waterUnits, "g", updatedWater);

    // divide amount of water in grams by ratio, then convert to current units of coffee
    const convertedCoffee = convertCoffeeUnits("g", coffeeUnits, convertedWater[1] / ratio);

    // update coffee and water
    setAmountOfWater(updatedWater);
    setAmountOfCoffee(round(convertedCoffee[0], 2));
  };

  const handleCoffeeUnitsChange = (unit) => {
    // function returns the converted amount of coffee (index 0) and the amount in grams (index 1)
    const convertedCoffee = convertCoffeeUnits(coffeeUnits, unit, amountOfCoffee);

    // multiply amount of coffee in grams by ratio, then convert to current units of water
    const convertedWater = convertWaterUnits("g", waterUnits, convertedCoffee[1] * ratio);

    // update coffee, coffee units, and water
    setAmountOfCoffee(round(convertedCoffee[0], 2));
    setCoffeeUnits(unit);
    setAmountOfWater(round(convertedWater[0], 2));
  };

  const handleWaterUnitsChange = (unit) => {
    console.log("here");
    // function returns the converted amount of water (index 0) and the amount in grams (index 1)
    const convertedWater = convertWaterUnits(waterUnits, unit, amountOfWater);

    // divide amount of water in grams by ratio, then convert to current units of coffee
    const convertedCoffee = convertCoffeeUnits("g", coffeeUnits, convertedWater[1] / ratio);

    // update water, water units, and coffee
    setAmountOfWater(round(convertedWater[0], 2));
    setWaterUnits(unit);
    setAmountOfCoffee(round(convertedCoffee[0], 2));
  };

  if (!method) {
    return <div>loading...</div>;
  } else {
    return (
      <main className={styles.container}>
        <section className={styles.methods} onWheel={scrollHorizontal} ref={hzMouseScroll}>
          {brewData.map((brewMethod, idx) => {
            const selected = name === brewMethod.name ? styles.selected : "";
            return (
              <Link href={`/${brewMethod.name}`} key={idx}>
                <a className={`${styles.button} ${selected}`}>{brewMethod.name}</a>
              </Link>
            );
          })}
        </section>
        <section className={styles.recipe}>
          <form>
            <label className={styles.heading} htmlFor="coffee">
              coffee
            </label>
            <div className={styles.amountContainer}>
              <input type="number" name="coffee" id="coffee" value={amountOfCoffee} onChange={handleCoffeeChange} />
              <span>{coffeeUnits}</span>
            </div>
            <div className={styles.unitsContainer}>
              {coffeeUnitOptions.map((unit) => (
                <label key={unit} className={coffeeUnits === unit ? styles.selected : ""}>
                  <input
                    type="radio"
                    name="coffeeUnits"
                    id={unit}
                    value={unit}
                    onChange={() => handleCoffeeUnitsChange(unit)}
                    checked={coffeeUnits === unit}
                  />
                  {unit}
                </label>
              ))}
            </div>
          </form>
          <form>
            <label className={styles.heading} htmlFor="water">
              water
            </label>
            <div className={styles.amountContainer}>
              <input type="number" name="water" id="water" value={amountOfWater} onChange={handleWaterChange} />
              <span>{waterUnits}</span>
            </div>
            <div className={styles.unitsContainer}>
              {waterUnitOptions.map((unit) => (
                <label key={unit} className={waterUnits === unit ? styles.selected : ""}>
                  <input
                    type="radio"
                    name="waterUnits"
                    id={unit}
                    value={unit}
                    onChange={() => handleWaterUnitsChange(unit)}
                    checked={waterUnits === unit}
                  />
                  {unit}
                </label>
              ))}
            </div>
          </form>
          <div>
            <h1>recipe details</h1>
            <div className={styles.detailsItem}>
              <span>ratio</span>
              <span className={styles.fontRegular}>{ratio}</span>
            </div>
            <div className={styles.detailsItem}>
              <span>water temperature</span>
              <span className={styles.fontRegular}>{waterTemp}ºF</span>
            </div>
            <div className={styles.detailsItem}>
              <span>grind size</span>
              <span className={styles.fontRegular}>{grindSize}</span>
            </div>
            <div className={styles.detailsInstructions}>
              <div>instructions</div>
              <ol>
                {instructions.map((step, idx) => (
                  <li key={idx} className={styles.fontRegular}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </main>
    );
  }
};

export default Recipe;
