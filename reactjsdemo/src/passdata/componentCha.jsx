import React, { useState } from "react";
import ComponentCon from "./componentCon";
import { materialList111 } from "./data";

function ComponentCha() {
  const [materialList] = useState(materialList111);

  const [selectedMaterials, setSelectedMaterials] = useState([]);

  // Hàm nhận dữ liệu từ con
  const handleSelectedMaterials = (listConChon) => {
    setSelectedMaterials(listConChon);
  };

  return (
    <div>
      <h2>Cha</h2>
      <ComponentCon materialList={materialList} onSelectionChange={handleSelectedMaterials} />

      <h3>Danh sách đã chọn ở cha :</h3>
      <h4>{selectedMaterials.length}</h4>
      <ul>
        {selectedMaterials.map((item) => (
          <li key={item.id}>
            {item.material_num} - {item.material_desc} ({item.uom})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ComponentCha;
