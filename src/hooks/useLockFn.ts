import { useRef,useCallback } from "react";
export default function useLockFn<P extends any[]>(fn:(...args:P)=>Promise<any>){
	const lockRef = useRef(false);
	return useCallback(async (...params:P)=>{
		if(lockRef.current)return;
		lockRef.current = true;
		try{
			const res = await fn(...params);
			lockRef.current = false;
			return res;
		}catch(e){
			lockRef.current = false;
			throw e;
		}
	},[fn]);
}