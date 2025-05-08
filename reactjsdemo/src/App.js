function App() {
  function transformToObjects(numberArray) {
    let newValue = numberArray.map((item) => {
      return { val: item };
    });

    console.log(newValue);
    return newValue;
  }
  const array = [1, 2, 3];
  transformToObjects(array);

  return <div className="App">xin chào</div>;
}

export default App;
