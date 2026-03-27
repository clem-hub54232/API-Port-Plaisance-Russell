import "../css/ElementPage.css";

export default function ElementPage({ title, columns, data, onAdd, onDelete, onEdit }) {
  return (
    <div className="element-page">
      <div className="element-header">
        <h1>{title}</h1>
        <button className="add-btn" onClick={onAdd}>Ajouter</button>
      </div>

      <table className="element-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.label}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{item[col.key]}</td>
              ))}
              <td>
                <button className="action-btn edit" onClick={() => onEdit(item)}>Modifier</button>
                <button className="action-btn delete" onClick={() => onDelete(item._id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}