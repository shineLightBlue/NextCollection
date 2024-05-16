import { MDXRemote } from 'next-mdx-remote/rsc'
import ComponentA from '../components/a'
const components = {ComponentA}
export default function Home(props) {
    return (
        <MDXRemote components={components} source={`Some **mdx** text, with a component <ComponentA />`}></MDXRemote>
    )
}