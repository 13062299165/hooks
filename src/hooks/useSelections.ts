import { useMemo, useState } from "react";

export function useSelections<T>(items:T[],defaultItems:T[] = []){
	const [selected,setSelected] = useState<T[]>(defaultItems);
	//用set方便操作
	const selectedSet = useMemo(()=>{
		return new Set(selected);
	},[selected]);
	const selectSingle = ()=>{
		const selectSingle = (item)=>{
			selectedSet.add(item);
			setSelected(Array.from(selectedSet));
		};
		const unSelectSingle = (item)=>{
			selectedSet.delete(item);
			setSelected(Array.from(selectedSet));
		};
		const isSelected = (item)=>{
			return selectedSet.has(item);
		};
		const toggleSelect = (item)=>{
			if(isSelected(item))unSelectSingle(item);
			else selectSingle(item);
		};
		return {
			selectSingle,
			unSelectSingle,
			isSelected,
			toggleSelect
		};
	};
	const selectAll = ()=>{
		const selectAll = ()=>{
			items.forEach((o) => {
				selectedSet.add(o);
			});
			setSelected(Array.from(selectedSet));
		};
		const unSelectAll = ()=>{
			items.forEach((o) => {
				selectedSet.delete(o);
			});
			setSelected(Array.from(selectedSet));
		};
		const noneSelected = items.every(o=>{return !selectedSet.has(o);});
		const allSelected = items.every(o=>{return selectedSet.has(o);});
		const partSelected = !noneSelected && !allSelected;
		return {
			selectAll,
			unSelectAll,
			noneSelected,
			allSelected,
			partSelected
		};
	};
	return {
		selected,
		setSelected,
		...selectAll(),
		...selectSingle()
	};
}