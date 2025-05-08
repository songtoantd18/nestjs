function App() {
  const hobbies = ["eating", "sleeping", "coding"];
  const index = hobbies.findIndex((item) => {
    console.log("🚀 ~ hobbies.findIndex ~ item:", item);
    return item === "sleeping";
  });
  console.log("🚀 ~ index ~ index:", index);

  return <div className="App">xin chào</div>;
}

export default App;
