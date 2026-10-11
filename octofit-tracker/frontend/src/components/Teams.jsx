import ResourcePage from './ResourcePage.jsx'
import useResourceData from '../hooks/useResourceData.js'

const columns = [
  {
    label: 'Team',
    getValue: (team) => team.name,
  },
  {
    label: 'Description',
    getValue: (team) => team.description,
  },
  {
    label: 'Members',
    getValue: (team) => team.members,
  },
]

export default function Teams() {
  const { records, loading, error } = useResourceData('/api/teams/', fetch)

  return (
    <ResourcePage
      columns={columns}
      error={error}
      loading={loading}
      records={records}
      title="Teams"
    />
  )
}
