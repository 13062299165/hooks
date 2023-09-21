import { useState } from "react";

import useCreation from "./useCreation";
 
//映射：原始对象=》代理对象
const proxyMap = new WeakMap();
//映射：代理对象=》原始对象
const rawMap = new WeakMap();

function isObject(data){
	return typeof data == "object" && data !== null;
}

function observer<T extends object>(initValue:T,cb:()=>void){
	const proxyObject = proxyMap.get(initValue);
	if(proxyObject){
		return proxyObject;
	}
	//防止代理代理对象
	if(rawMap.has(initValue)){
		return initValue;
	}
	const proxy = new Proxy(initValue,{
		get(target, key, receiver){
			const res = Reflect.get(target, key, receiver);
			return isObject(res) ? observer((res as object), cb) : Reflect.get(target, key);

		},
		set(target,key,receiver){
			const ret = Reflect.set(target,key,receiver);
			cb();
			return ret;
		},
		deleteProperty(target,key){
			const ret = Reflect.deleteProperty(target,key);
			cb();
			return ret;
		}
	});
	return proxy;
}

export default function useReactive<S extends object>(initState:S){
	const [,setState] = useState({});
	const state = useCreation(()=>{
		return observer(initState,()=>{
			setState({});
		});
	},[]);
	return state;
}
