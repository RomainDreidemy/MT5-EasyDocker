import React from "react";
import { Link } from "react-router-dom";
import Button from "../atoms/forms/Button.atom";
import { BiTrash, BiEdit, BiCopy } from "react-icons/bi";
import { IStack } from "../../interfaces/Stack.interface";

const CardOrganism = ({ id, name, description, linkUrl, isEditable, onDelete, onEdit, onDuplicate } : {
  id: string
  name: string
  description: string
  linkUrl: string
  isEditable: boolean
  onDelete: (id: string) => void
  onEdit: () => void
  onDuplicate: (id: string) => void
}) => {
  return (
    <div className="card shadow-md mb-2 rounded border border-blue-100 hover:border-blue-200">
      <Link to={`${linkUrl}/${id}`} key={id}>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p className="truncate">{description}</p>
        </div>
      </Link>

      { isEditable && (
        <div className="card-actions justify-end">
          <Button className="btn-ghost" icon={<BiTrash/>} onClick={() => { onDelete(id) }} />
          <Button className="btn-ghost" icon={<BiEdit/>} onClick={onEdit} />
          <Button className="btn-ghost" icon={<BiCopy/>} onClick={() => { onDuplicate(id) }} />
        </div>
      )}
    </div>
  );
}

export default CardOrganism;
