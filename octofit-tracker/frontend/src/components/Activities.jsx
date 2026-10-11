import ResourcePage from './ResourcePage.jsx'
import useResourceData from '../hooks/useResourceData.js'

const columns = [
  {
    label: 'Athlete',
    getValue: (activity) => activity.user,
  },
  {
    label: 'Activity',
    getValue: (activity) => activity.activityType,
  },
  {
    label: 'Duration (min)',
    getValue: (activity) => activity.durationMinutes,
  },
  {
    label: 'Distance (km)',
    getValue: (activity) => activity.distanceKm,
  },
  {
    label: 'Points',
    getValue: (activity) => activity.points,
  },
  {
    label: 'Date',
    getValue: (activity) => activity.date,
  },
]

export default function Activities() {
  const { records, loading, error } = useResourceData('/api/activities/', fetch)

  return (
    <ResourcePage
      columns={columns}
      error={error}
      loading={loading}
      records={records}
      title="Activities"
    />
  )
}
