import { CTooltip } from "@coreui/react";
import React from "react";

function CowItem({ item, index }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{item.cow.cowNumber}</td>
      <td>{item.cow.cowType}</td>
      <td>{item.cow.registrationStatus}</td>
      <td>{item.cow.registrationKg}</td>
      <td>{item.cow.supplierName}</td>
      <td>{item.district}</td>
      <td>{item.sector}</td>
      <td>
        {item.isGiven ? (
          <CTooltip
            placement="left"
            content={
              <div>
                <p className="border-bottom text-center">Candidate Details</p>
                <div>
                  <b>Names: </b> {item.candidate.names}
                </div>
                <div>
                  <b>ID No: </b> {item.candidate.idNo}
                </div>
                <div>
                  <b>Phone: </b> {item.candidate.phone}
                </div>
                <div>
                  <b>District: </b> {item.candidate.district}
                </div>
                <div>
                  <b>Sector: </b> {item.candidate.sector}
                </div>
                <div>
                  <b>Cell: </b> {item.candidate.cell}
                </div>
                <div>
                  <b>Village: </b> {item.candidate.village}
                </div>
              </div>
            }
          >
            <span>Given</span>
          </CTooltip>
        ) : (
          "Not yet given"
        )}
      </td>
      <td>{item.isReceived ? "Yes" : "No"}</td>
    </tr>
  );
}

export default CowItem;
