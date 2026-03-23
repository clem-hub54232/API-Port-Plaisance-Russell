import "../css/ElementPage.css";

export default function ElementPage({ title, columns, data }) {
  return (
    <div className="element-page">
      <div className="element-header">
        <h1>{title}</h1>
        <button className="add-btn">Ajouter</button>
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
                <button className="action-btn edit">Modifier</button>
                <button className="action-btn delete">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}