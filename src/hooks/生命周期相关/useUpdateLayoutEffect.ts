import { useLayoutEffect , useRef,DependencyList} from "react";
type noop = ()=>void
export default function useUpdateEffect(effect:noop,deps:DependencyList){
	const isMounted = useRef(false);
	useLayoutEffect(()=>{
		if(!isMounted.current){
			isMounted.current = true;
		}else{
			effect();
		}
	},[deps]);
}