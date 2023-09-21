import { useState ,Dispatch,SetStateAction} from "react";

import useUnmountedRef from "./生命周期相关/useUnmountedRef";

type dispatch<T> = [T,Dispatch<SetStateAction<T>>]

export default function useSafeState<T>(initialValue):dispatch<T>{
	const [state,setState] = useState(initialValue);
	const ref = useUnmountedRef();
	const setCurrentState = (value)=>{
		if(ref.current){
			setState(value);
		}
	};
	return [state,setCurrentState];
}