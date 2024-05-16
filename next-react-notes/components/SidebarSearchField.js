'use client'
import { usePathname, useRouter } from "next/navigation"
import { useTransition } from "react"
function Spinner({active=true}){
    return (
        <div className={['spinner', active && 'spinner--active'].join(' ')}/>
    )
}
export default function SidebarSearchField() {
    const [isPending,startTransition] = useTransition()
    const pathname = usePathname()
    const { replace } = useRouter()
    function handleSearch(term) {
        const params = new URLSearchParams()
        if(term){
            console.log('term')
            params.set('q',term)
        }
        console.log(params,'term')
        console.log(params.get('q'),'term')
        console.log(params.toString())
        startTransition(()=>{
            replace(`${pathname}?${params.toString()}`)
        })
    }
    // useTransition 可以将一个更新转为低优先级更新，使其可以被打断，
    // 不阻塞 UI 对用户操作的响应，能够提高用户的使用体验。它常用于优化视图切换时的用户体验。 
    return (
        <div className="search">
            <label className="offscreen" htmlFor="sidebar-search-input">
                Search for a note by title
            </label>
            <input id="sidebar-search-input" type="text" placeholder="Search" onChange={(e) => handleSearch(e.target.value)} />
            <Spinner active={isPending}></Spinner>
        </div>
    )
}