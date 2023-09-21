import debounce from "loadsh/debounce";
import { useRef } from "react";

import useCreation from "./useCreation";
import useUnMounted from "./生命周期相关/useUnMounted";
type noop=(...args:any[])=>any

export default function(fn:noop,options){
	const fnRef = useRef<noop>();
	fnRef.current = fn;
	const wait = options?.wait ? options.wait : 1000;
	const debounced = useCreation(()=>{
		return debounce((...args)=>{
			return fnRef.current(...args);
		},wait,options);
	},[]);
	useUnMounted(()=>{
		debounce.cancel();
	});
	return{
		run:debounced.run,
		cancel:debounced.cancel,
		flush:debounced.flush
	};
}