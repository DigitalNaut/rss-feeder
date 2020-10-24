import * as React from "react";
import parse from 'html-react-parser';

function Interpreter(props) {
  const parser = new window.DOMParser();
  let [content, setContent] = React.useState("");
  
  React.useEffect(
    (state) => {
      if(!props.inputData) return;
      
      let parserOutput;
      try {
        parserOutput = parse(
          `${props.inputData}`
        );
      } catch (error) {
        throw "Interpreter could not parse string: '" + props.inputData + "' \nEnds in error" + error.message;
      }

      if (parserOutput)
        setContent(parserOutput);
    },
    [props.inputData]
  );

  return <>{content || ""}</>;
}

export default Interpreter;
