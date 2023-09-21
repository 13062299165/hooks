import { useRef } from "react";
// useRef的current属性不会引起组件的重新渲染，但是每次都会重新创建一次初始值，也就是说它不是惰性的
export default function useCreation<T>(factory:()=>T,deps:any[]){
	const {current} = useRef({
		deps,
		data:undefined as undefined|T,
		hasInit:false
	});
	//首次创建或者依赖项变化
	if(!current.hasInit || differentDeps(current.deps,deps)){
		current.data = factory();
		current.deps = deps;
		current.hasInit = true;
	}
	function differentDeps(oldDeps,deps){
		if(oldDeps.length !== deps.length){
			return true;
		}
		for(let i = 0;i < deps.length;i++){
			if(oldDeps[i] !== deps[i])return false;
		}
		return true;
	}
	return current.data;
}