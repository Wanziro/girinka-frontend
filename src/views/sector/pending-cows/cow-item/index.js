import React from "react";

function CowItem({ item, index, handleSelect, cowsToSend }) {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          className="form-check"
          disabled={item.isTransfered}
          onChange={(e) => handleSelect(e, item)}
          checked={cowsToSend.find((i) => i._id == item._id) ? true : false}
        />
      </td>
      <td>{index + 1}</td>
      <td>{item.cow.cowNumber}</td>
      <td>{item.cow.cowType}</td>
      <td>{item.cow.registrationStatus}</td>
      <td>{item.cow.registrationKg}</td>
      <td>{item.cow.supplierName}</td>
      <td>{item.district}</td>
      <td>{item.sector}</td>
      <td>{item.isReceived ? "Yes" : "Not yet"}</td>
    </tr>
  );
}

export default CowItem;
