import { useRef,useEffect } from "react";
export default function useUnmountedRef(){
	const unMountedRef = useRef<boolean>(false);
	useEffect(()=>{
		unMountedRef.current = true;
		return ()=>{
			unMountedRef.current = false;
		};
	},[]);
	return unMountedRef;
}
