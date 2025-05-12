import React, { useState } from "react";

function App() {
  const demoValue = ["demo1", "demo2", "demo3", "demo4", "demo5"];
  const [value, setValue] = useState("");
  const core_concepts = [
    { title: "Concept 0", description: "Description 1", image: "image1.jpg" },
    { title: "Concept 1", description: "Description 2", image: "image2.jpg" },
    { title: "Concept 2", description: "Description 3", image: "image3.jpg" },
  ];

  function randomeValue() {
    const random = Math.floor(Math.random() * demoValue.length);
    console.log("🚀 ~ randomeValue ~ demoValue[random]:", demoValue[random]);
    setValue(demoValue[random]); // cập nhật state → React re-render
  }

  return (
    <div>
      <CoreConcept {...core_concepts[0]} />
      <CoreConcept {...core_concepts[1]} />
      <CoreConcept {...core_concepts[2]} />
    </div>
  );
}

export default App;
function CoreConcept(title, description, image) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <img src={image} alt={title} />
    </div>
  );
}
