import { useRef , useEffect} from "react";
type Subscription<T> = (val:T)=>void
class EventEmitter<T>{
	private subscriptions = new Set<Subscription<T>>();
	emit(val){
		for(const subscription of this.subscriptions){
			subscription(val);
		}
	}

	useSubscription(callback:Subscription<any>){
		const callbackRef = useRef<Subscription<T>>();
		callbackRef.current = callback;
		useEffect(()=>{
			function subscription(val:T){
				if(callbackRef.current){
					callback(val);
				}
			}
			this.subscriptions.add(subscription);
			return ()=>{
				//防止内存泄露
				this.subscriptions.delete(callback);
			};
		});
	}
}

export function useEventEmit(){
	const ref = useRef(null);
	if(!ref.current){
		ref.current = new EventEmitter();
	}
	return ref.current;
}