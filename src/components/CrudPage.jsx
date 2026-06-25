import { useMemo, useState } from "react";

export default function CrudPage({
  title,
  description,
  items,
  setItems,
  fields,
  columns,
  emptyForm,
}) {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const orderedItems = useMemo(() => [...items].sort((a, b) => a.nome?.localeCompare(b.nome) || 0), [items]);

  function updateField(key, value) {
    setMessage("");
    setForm((currentForm) => ({ ...currentForm, [key]: value }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const missingField = fields.find((field) => {
      const value = form[field.key];
      return field.required && !String(value ?? "").trim();
    });

    if (missingField) {
      setMessage(`Preencha o campo ${missingField.label}.`);
      return;
    }

    const cleanedForm = normalizeForm(form, fields);

    if (editingId) {
      setItems((currentItems) =>
        currentItems.map((item) => (item.id === editingId ? { ...cleanedForm, id: editingId } : item))
      );
      setMessage("Registro atualizado.");
    } else {
      setItems((currentItems) => [...currentItems, { ...cleanedForm, id: createId() }]);
      setMessage("Registro cadastrado.");
    }

    setForm(emptyForm);
    setEditingId(null);
  }

  function handleEdit(item) {
    setForm(item);
    setEditingId(item.id);
    setMessage("");
  }

  function handleDelete(id) {
    const confirmed = window.confirm("Deseja excluir este registro?");
    if (!confirmed) return;

    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    if (editingId === id) resetForm();
  }

  return (
    <main className="page">
      <section className="admin-section">
        <div className="section-heading">
          <span>Area administrativa</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

        <form className="crud-form" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <FormField key={field.key} field={field} value={form[field.key] ?? ""} onChange={updateField} />
          ))}

          <div className="form-actions">
            <button type="submit" className="primary-button">
              {editingId ? "Salvar alteracao" : "Cadastrar"}
            </button>
            {editingId && (
              <button type="button" className="outline-button dark" onClick={resetForm}>
                Cancelar
              </button>
            )}
          </div>

          {message && <p className="form-message success">{message}</p>}
        </form>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
                <th>Acoes</th>
              </tr>
            </thead>
            <tbody>
              {orderedItems.map((item) => (
                <tr key={item.id}>
                  {columns.map((column) => (
                    <td key={column.key}>{column.render ? column.render(item) : item[column.key]}</td>
                  ))}
                  <td className="table-actions">
                    <button type="button" onClick={() => handleEdit(item)}>
                      Editar
                    </button>
                    <button type="button" onClick={() => handleDelete(item.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function FormField({ field, value, onChange }) {
  function handleChange(event) {
    onChange(field.key, event.target.value);
  }

  if (field.type === "textarea") {
    return (
      <label>
        {field.label}
        <textarea
          value={value}
          rows="3"
          placeholder={field.placeholder}
          onChange={handleChange}
          onInput={handleChange}
        />
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <label>
        {field.label}
        <select value={value} onChange={handleChange}>
          <option value="">Selecione</option>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label>
      {field.label}
      <input
        type={field.type || "text"}
        value={value}
        min={field.min}
        step={field.step}
        placeholder={field.placeholder}
        onChange={handleChange}
        onInput={handleChange}
      />
    </label>
  );
}

function normalizeForm(form, fields) {
  return fields.reduce((newForm, field) => {
    const value = form[field.key];
    newForm[field.key] = field.type === "number" ? Number(value) : value;
    return newForm;
  }, {});
}

function createId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return String(Date.now());
}
