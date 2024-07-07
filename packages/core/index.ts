import { makeInstaller } from '@toy-element/utils';
import component from './components';
import '@toy-element/theme/index.css';

const installer = makeInstaller(component)

export * from "@toy-element/components"
export default installer