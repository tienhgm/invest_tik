import { useRef } from "react";

type ConstructorCallback = () => any;

function useConstructor(callback: any): any {
    const isRun = useRef(false);

    if (isRun.current === false) {
        callback();
        isRun.current = true;
    }
}

export default useConstructor;