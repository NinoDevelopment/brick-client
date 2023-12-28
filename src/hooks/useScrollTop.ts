
import {useEffect} from "react";
import {usePathname} from "next/navigation";

//для того чтобы страница поднималась к верху после перехода по ссылке
export default function useScrollTop() {
    const path = usePathname()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [path]);
}
