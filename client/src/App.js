import { useEffect } from "react";


function App() {

  useEffect(() => {
    fetch("/movies")
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  },[])
  
  
  return (
    <div className="">
      Hello World!
    </div>
  );
}

export default App;
