import { useEffect, useState } from "react";

import useDebounceFn from "./useDebounceFn";
export default function useDebounce<T>(value:T,options){
	const [debounced,setDebounced] = useState(value);
	const {run} = useDebounceFn(()=>{
		setDebounced(value);
	},options);
	useEffect(()=>{
		run();
	},[value]);
	return debounced;
}