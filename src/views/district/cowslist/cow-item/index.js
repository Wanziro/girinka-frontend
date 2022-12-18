import { cilDelete, cilPen } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";

function CowItem({ item, index }) {
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
        <button className="btn btn-primary">
          <CIcon icon={cilPen} />
        </button>
        &nbsp;
        <button className="btn btn-danger">
          <CIcon icon={cilDelete} />
        </button>
      </td>
    </tr>
  );
}

export default CowItem;
