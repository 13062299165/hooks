import { DependencyList, useEffect, useRef } from "react";
export default function useTrackedEffect(effectFn,deps:DependencyList){
	const previousDeps = useRef<DependencyList>();
	const diffDeps = (previous:DependencyList,current:DependencyList)=>{
		//注意previous第一次为空
		return previous ? previous
			.map((item,index)=>{return item === current[index] ? index : -1;})
			.filter((idx)=>{return idx !== -1;})
			: current ? current.map((_,idx)=>{return idx;}) : [];
	};
	useEffect(()=>{
		const previous = previousDeps.current;
		previousDeps.current = deps;
		const change = diffDeps(previous,deps);
		//effectFn可以返回一个函数，作为销毁函数
		return effectFn(change,previous,deps);
	},deps);
}