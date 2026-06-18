import { useMemo, useState } from "react";

// CRUD generico usado nas telas de cervejas, clientes e pedidos.
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

  // Copia a lista e ordena, sem mexer na lista original.
  const orderedItems = useMemo(() => [...items].sort((a, b) => a.nome?.localeCompare(b.nome) || 0), [items]);

  function updateField(key, value) {
    setMessage("");
    // Atualiza apenas o campo que foi digitado.
    setForm((currentForm) => ({ ...currentForm, [key]: value }));
  }

  function resetForm() {
    // Volta o formulario para o estado inicial.
    setForm(emptyForm);
    setEditingId(null);
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Procura o primeiro campo obrigatorio que ficou vazio.
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
      // Quando esta editando, troca apenas o item com o mesmo id.
      setItems((currentItems) =>
        currentItems.map((item) => (item.id === editingId ? { ...cleanedForm, id: editingId } : item))
      );
      setMessage("Registro atualizado.");
    } else {
      // Quando e cadastro novo, adiciona um id e coloca no final da lista.
      setItems((currentItems) => [...currentItems, { ...cleanedForm, id: createId() }]);
      setMessage("Registro cadastrado.");
    }

    setForm(emptyForm);
    setEditingId(null);
  }

  function handleEdit(item) {
    // Joga os dados do item no formulario para editar.
    setForm(item);
    setEditingId(item.id);
    setMessage("");
  }

  function handleDelete(id) {
    const confirmed = window.confirm("Deseja excluir este registro?");
    if (!confirmed) return;

    // Remove da lista o item que tem o id escolhido.
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
          {/* Monta os inputs de acordo com os campos recebidos por props. */}
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
              {/* O map cria uma linha da tabela para cada registro. */}
              {orderedItems.map((item) => (
                <tr key={item.id}>
                  {/* As colunas tambem vem por props, por isso o CRUD e reaproveitado. */}
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
    // Todo input chama o mesmo onChange, mudando apenas a chave do campo.
    onChange(field.key, event.target.value);
  }

  if (field.type === "textarea") {
    // Campo maior para descricao.
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
    // Select usado para imagem, cliente, cerveja e status.
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
  // Converte campos numericos antes de salvar.
  return fields.reduce((newForm, field) => {
    const value = form[field.key];
    newForm[field.key] = field.type === "number" ? Number(value) : value;
    return newForm;
  }, {});
}

function createId() {
  // Cria um id simples para identificar cada registro.
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return String(Date.now());
}
