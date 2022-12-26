import { cilPen, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";

function CowItem({ item, index, setEditItem, setShowEditModal }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{item.cowNumber}</td>
      <td>{item.cowType}</td>
      <td>{item.registrationStatus}</td>
      <td>{item.registrationKg}</td>
      <td>{item.supplierName}</td>
      <td>{item.district.toUpperCase()}</td>
      <td>
        <button
          onClick={() => {
            setEditItem(item);
            setShowEditModal(true);
          }}
          className="btn btn-primary"
        >
          <CIcon icon={cilPen} />
        </button>
        &nbsp;
        <button className="btn btn-danger">
          <CIcon icon={cilTrash} />
        </button>
      </td>
    </tr>
  );
}

export default CowItem;
