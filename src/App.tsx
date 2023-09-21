import React, { useState } from "react";

import styles from "./app.module.less";
import useCreation from "./hooks/useCreation";

const App = () => {
	const [inputValue, setInputValue] = useState<string>("");
	const data = useCreation(()=>{return {a:1};},[inputValue]);
	return <div className={styles.container}>
		<h2>{data.a}</h2>
        Hey,World
		<input type="text" value={inputValue} onChange={(e) => {return setInputValue(e.target.value);}} />
		<p>{inputValue}</p>
	</div>;
};

export default App;