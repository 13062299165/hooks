import { useRef } from "react";

export type noop = (...args: any[]) => any;
export default function usePersistFn(fn:noop):noop{
	const fnRef = useRef(null);
	//保证函数使用最新，这个hook只是保证最后函数的地址不变
	fnRef.current = fn;
	const persistFnRef = useRef(null);
	if(!persistFnRef.current){
		//只生成一次，保证了地址不变
		persistFnRef.current = (...args)=>{
			// 要保证this指向正确
			return fnRef.current!.apply(this,args);
		};
	}
	return persistFnRef.current;
}