import React, { useState } from "react";

function ComponentCon({ materialList, onSelectionChange }) {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleCheckboxChange = (item) => {
    let updatedSelected;

    if (selectedIds.includes(item.id)) {
      // Bỏ chọn
      updatedSelected = selectedIds.filter((id) => id !== item.id);
    } else {
      // Thêm chọn
      updatedSelected = [...selectedIds, item.id];
    }

    setSelectedIds(updatedSelected);

    // Gửi danh sách item đã chọn (dựa trên ID)
    const selectedItems = materialList.filter((m) => updatedSelected.includes(m.id));
    onSelectionChange(selectedItems);
  };

  return (
    <div>
      <h3>Con</h3>
      <ul>
        {materialList.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedIds.includes(item.id)}
                onChange={() => handleCheckboxChange(item)}
              />
              {item.material_num} - {item.material_desc} ({item.uom})
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ComponentCon;
