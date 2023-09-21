import { useEffect } from "react";

import usePersistFn from "../usePersistFn";

export default function useUnMounted(fn:()=>void){
	const persistFn = usePersistFn(fn);
	useEffect(()=>{
		return ()=>{
			if(typeof fn === "function"){
				persistFn();
			}
		};
	},[]);
}