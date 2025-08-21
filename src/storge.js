import {create} from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'


const setStorge = create(
        persist(
            (set) => ({
            second: 0,
            setSecond: (update)=> set(state => ({
                second:
                typeof update === "function" ? update(state.second):update
            }))
        }),
        {
            name: "second",
            storage: createJSONStorage(() => sessionStorage),
        }
        )

)
export default setStorge