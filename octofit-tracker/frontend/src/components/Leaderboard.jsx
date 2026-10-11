import ResourcePage from './ResourcePage.jsx'
import useResourceData from '../hooks/useResourceData.js'

const columns = [
  {
    label: 'Athlete',
    getValue: (entry) => entry.user,
  },
  {
    label: 'Team',
    getValue: (entry) => entry.team,
  },
  {
    label: 'Points',
    getValue: (entry) => entry.points,
  },
  {
    label: 'Period',
    getValue: (entry) => entry.period,
  },
]

export default function Leaderboard() {
  const { records, loading, error } = useResourceData('/api/leaderboard/', fetch)

  return (
    <ResourcePage
      columns={columns}
      error={error}
      loading={loading}
      records={records}
      title="Leaderboard"
    />
  )
}
