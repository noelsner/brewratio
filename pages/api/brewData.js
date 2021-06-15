// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const brewData = (req, res) => {
  res.status(200).json([
    {
      name: "pour-over",
      imageSrc: "/assets/images/pour-over",
      ratio: 15,
      maxCoffee: null,
      waterTemp: 205,
      grindSize: "fine",
      instructions: [
        "dampen the filter with hot water",
        "put the calculated amount of coffee in the filter, tare the scale, and start the timer",
        "slowly pour in enough hot water to saturate the grounds and leave for 30 seconds",
        "start slowly pouring more water, moving in a circular pattern. when the water level gets close to the top, stop pouring and wait until it is about halfway down the filter. repeat the circular pour until the full calculated amount of water has been added.",
      ],
      notes: ["additional notes"],
    },
    {
      name: "chemex",
      imageSrc: "/assets/images/chemex",
      ratio: 15,
      maxCoffee: 60,
      waterTemp: 205,
      grindSize: "fine",
      instructions: [
        "unfold the filter into a cone with 3 sheets on one side and 1 sheet on the other. put the filter into the chemex with the 3-sheet side against the spout.",
        "wet the entire filter (or as much as you can if using square filters) and pour the water back out of the chemex",
        "put the calculated amount of coffee in the filter, tare the scale, and start the timer",
        "slowly pour in enough hot water to saturate the grounds and leave for 45 seconds",
        "start slowly pouring more water, moving in a curcular pattern. try to keep the water level steady, about half-way down the filter. stop pouring when the calculated amount of water has been added",
      ],
      notes: [""],
    },
    {
      name: "aeropress",
      imageSrc: "/assets/images/aeropress",
      ratio: 14,
      maxCoffee: 21.428,
      waterTemp: 205,
      grindSize: "fine to meduim",
      instructions: [
        "put a paper filter in the black cap and wet with water",
        "screw the cap onto the large cylider and place it on top of you cup (cap at the bottom), then place the whole cup on the scale and tare it",
        "add the calculated amount of coffee into the top of the cylinder",
        "pour in the calculated amount of water",
        "stir and let it sit for 30 seconds",
        "insert the smaller cylinder and plunge down firmly and evenly until you hear the hiss of air escaping",
      ],
      notes: [
        "the aeropress is very flexible brewer, you can experiment with different grind sizes, ratios, and steep times and get great results",
      ],
    },
    {
      name: "french press",
      imageSrc: "/assets/images/french-press",
      ratio: 15,
      maxCoffee: null,
      waterTemp: 205,
      grindSize: "coarse",
      instructions: [
        "add the calculated amount of coffee into the bottom of the french press",
        "place the french press on the scale and tare it",
        "slowly pour in the calculated amount of water over the grounds, making sure to saturate them",
        "let it sit for 30 seconds, then gently stir the layer of grounds on top",
        "cover with the lid and filter but do not plunge down yet",
        "let it sit for 4 minutes",
        "firmly press the filter all the way down",
        "if left sitting in the french press the coffee will continue to brew, so immediately pour the coffee into cups, a thermos, or a carafe",
      ],
      notes: [""],
    },
    {
      name: "moka pot",
      imageSrc: "/assets/images/moka-pot",
      ratio: 15,
      maxCoffee: 60,
      waterTemp: 205,
      grindSize: "fine",
      instructions: [
        "pre-boil water in a kettle",
        "fill the filter basket with the calculated amount of coffee (do not push or tamp the coffee down, water needs to be able to push through the grounds during brewing",
        "once the water has boiled, fill the lower chamber of the pot, up to the valve",
        "put the filter basket onto the lower chamber and screw the upper chamber onto the bottom",
        "put the pot on the stove over medium heat",
        "the coffee will bubble up into the upper chamber, when you hear it sputter and the water dries up remove from heat",
        "serve immidiately",
      ],
      notes: [
        "pre-boiling the water is not technically necessary, but is faster and reduces the risk of burning the coffee",
      ],
    },
    {
      name: "cold brew",
      imageSrc: "/assets/images/cold-brew",
      ratio: 15,
      maxCoffee: null,
      waterTemp: 60,
      grindSize: "coarse",
      instructions: [
        "add the calculated amount of coffee to a container (such as a large mason jar)",
        "add the calculated amount of cold water to the container",
        "let it steep for 12 hours",
      ],
      notes: [""],
    },
  ]);
};

export default brewData;