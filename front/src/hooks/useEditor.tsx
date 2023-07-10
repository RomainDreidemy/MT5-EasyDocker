import {DrawerTypes} from "../enums/DrawerTypes";
import {TDrawer} from "../types/Drawer";


const TYPE_STRUCTURES: structure = {
  [DrawerTypes.SERVICE]: [
    {
      label: "Description",
      name: "description",
    },
  ],
  [DrawerTypes.NETWORK]: [],
  [DrawerTypes.VOLUME]: [],
}

type structure = {
  [key in DrawerTypes]: form[]
}

type form = {
  label: string,
  name: string,
}

const useEditor = (drawer: TDrawer): { fields: form[] } => {

  console.log(drawer)

  return {
    fields: TYPE_STRUCTURES[drawer.type]
  }
}

export default useEditor
