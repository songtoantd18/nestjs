import React, { Children } from "react";
import data from "./data"; // Import mảng data
import "../src/index.css";

function App() {
  function handleDisabled() {
    console.log("disabled");
  }
  return (
    <div id="app">
      <section>
        <h2>Filled Button (Default)</h2>
        <p>
          <Button>Default</Button>
        </p>
        <p>
          <Button mode="filled">Filled (Default)</Button>
        </p>
      </section>
      <section>
        <h2>Button with Outline</h2>
        <p>
          <Button mode="outline">Outline</Button>
        </p>
      </section>
      <section>
        <h2>Text-only Button</h2>
        <p>
          <Button mode="text">Text</Button>
        </p>
      </section>
      <section>
        <h2>Button with Icon</h2>
        <p>
          <Button Icon={HomeIcon}>Home</Button>
        </p>
        <p>
          <Button Icon={PlusIcon} mode="text">
            Add
          </Button>
        </p>
      </section>
      <section>
        <h2>Buttons Should Support Any Props</h2>
        <p>
          <Button mode="filled" onClick={handleDisabled}>
            Disabled
          </Button>
        </p>
        <p>
          <Button demo="demo1" onClick={() => console.log("Clicked!")}>
            Click me
          </Button>
        </p>
      </section>
    </div>
  );
}

export default App;
export function Button({ children, mode, Icon, ...props }) {
  const baseClass = `${mode ?? "filled"}-button`;
  console.log("🚀 ~ Button ~ props:", props);
  console.log("🚀 ~ Button ~ Icon:", Icon);
  const className = Icon ? `${baseClass} icon-button` : baseClass;

  console.log("🚀 ~ Button ~ className:", className);
  return (
    <button className={className} {...props}>
      {Icon && <Icon className="button-icon" />}
      <span>{children}</span>
    </button>
  );
}
export function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
        clipRule="evenodd"
      />
    </svg>
  );
}
export function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
    </svg>
  );
}
