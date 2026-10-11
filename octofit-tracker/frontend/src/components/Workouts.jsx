import ResourcePage from './ResourcePage.jsx'
import useResourceData from '../hooks/useResourceData.js'

const columns = [
  {
    label: 'Workout',
    getValue: (workout) => workout.title,
  },
  {
    label: 'Activity',
    getValue: (workout) => workout.activityType,
  },
  {
    label: 'Duration (min)',
    getValue: (workout) => workout.durationMinutes,
  },
  {
    label: 'Difficulty',
    getValue: (workout) => workout.difficulty,
  },
  {
    label: 'Description',
    getValue: (workout) => workout.description,
  },
]

export default function Workouts() {
  const { records, loading, error } = useResourceData('/api/workouts/', fetch)

  return (
    <ResourcePage
      columns={columns}
      error={error}
      loading={loading}
      records={records}
      title="Workouts"
    />
  )
}
