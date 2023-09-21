type getDragPropFn=(data:any)=>{
    draggable:boolean,
    key:string,
    onDragStart:(e:React.DragEvent)=>void,
    onDragEnd:(e:React.DragEvent)=>void,
}

type IConfig = {
    onDragStart?:(data:any,e:React.DragEvent)=>void,
    onDragEnd?:(data:any,e:React.DragEvent)=>void,
}

export function useDrop(config:IConfig):getDragPropFn{
	return (data)=>{
		return {
			//将这些属性给对应的React节点即可
			draggable:true as const,
			key:JSON.stringify(data),
			onDragStart:(e: React.DragEvent) => {
				if (config && config.onDragStart) {
					config.onDragStart(data, e);
				}
			},
			onDragEnd:(e: React.DragEvent) => {
				if (config && config.onDragStart) {
					config.onDragEnd(data, e);
				}
			},
		};
	};
}