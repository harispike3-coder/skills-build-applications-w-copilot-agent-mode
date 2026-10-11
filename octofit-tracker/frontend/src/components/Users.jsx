import ResourcePage from './ResourcePage.jsx'
import useResourceData from '../hooks/useResourceData.js'

const columns = [
  {
    label: 'Name',
    getValue: (user) => user.displayName || user.username,
  },
  {
    label: 'Username',
    getValue: (user) => user.username,
  },
  {
    label: 'Email',
    getValue: (user) => user.email,
  },
]

export default function Users() {
  const { records, loading, error } = useResourceData('/api/users/', fetch)

  return (
    <ResourcePage
      columns={columns}
      error={error}
      loading={loading}
      records={records}
      title="Users"
    />
  )
}
