import React from 'react';
import useEditor from "../../hooks/useEditor";
import {TDrawer} from "../../types/Drawer";

const EditorOrganism = ({ drawer }: {drawer: TDrawer }) => {
  const { fields } = useEditor(drawer)

  console.log(fields)
  return (
    <div className="w-full h-full border-l-2 ">
      <div className="">
        <h2>Editor</h2>
      </div>

      <div className="">

      </div>
    </div>
  );
};

export default EditorOrganism;