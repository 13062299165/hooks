import { useEffect , useRef,DependencyList} from "react";
type noop = ()=>void
export default function useUpdateEffect(effect:noop,deps:DependencyList){
	const isMounted = useRef(false);
	useEffect(()=>{
		if(!isMounted.current){
			isMounted.current = true;
		}else{
			effect();
		}
	},[deps]);
}