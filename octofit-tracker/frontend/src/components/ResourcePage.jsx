function formatCell(value) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }

  if (Array.isArray(value)) {
    return value.map(formatCell).join(', ')
  }

  if (typeof value === 'object') {
    return value.displayName || value.username || value.name || value.title || '—'
  }

  return String(value)
}

export default function ResourcePage({ columns, error, loading, records, title }) {
  return (
    <section>
      <h2 className="h4 mb-3">{title}</h2>

      {loading && (
        <p aria-live="polite" className="text-secondary">
          Loading {title.toLowerCase()}…
        </p>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          Could not load {title.toLowerCase()}: {error}
        </div>
      )}

      {!loading && !error && records.length === 0 && (
        <p className="text-secondary">No {title.toLowerCase()} found yet.</p>
      )}

      {!loading && !error && records.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                {columns.map(({ label }) => (
                  <th key={label} scope="col">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id || record.id || index}>
                  {columns.map(({ getValue, label }) => (
                    <td key={label}>{formatCell(getValue(record))}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
