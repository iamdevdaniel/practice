import React from 'react'

type TaskCategory = 'work' | 'personal' | 'study'

type Task = {
	id: number
	title: string
	category: TaskCategory
	priority: 1 | 2 | 3
	completed: boolean
	estimateMinutes: number
}

type CategoryUppercase = 'Work' | 'Personal' | 'Study' | 'Not found'

type TaskItemProps = Omit<Task, 'category'> & {
	category: CategoryUppercase,
	onSelectToggle: (id: number) => void
	onDelete: (id: number) => void
}

type Stats = { taskCount: number, completedCount: number, totalTime: number, remainingTime: number }

// -----------------------------------------------------

export function TaskItem({
	onDelete,
	category,
	title,
	id,
	priority,
	completed, estimateMinutes, onSelectToggle }: TaskItemProps) {

	const labelId = `done-toggle-${id}`

	return <li className='task-item'>
		<label className='task-title' htmlFor={labelId}>{title}</label>
		<div className='task-category'>{category}</div>
		<div className='task-priority'>{priority}</div>
		<div className='task-completeness'>{completed ? '✅' : '❌'}</div>
		<div className='task-eta'>{`${estimateMinutes} min`}</div>
		<input
			id={labelId}
			aria-label={`${completed ? 'Uncheck' : 'Check'} ${title}`}
			onChange={() => onSelectToggle(id)}
			type='checkbox'
			checked={completed}
		>
		</input>
		<button
			aria-label={`Delete ${title}`}
			onClick={() => onDelete(id)}
		>
			Delete
		</button>
	</li>
}

function GetCategoryUppercase(category: TaskCategory): CategoryUppercase {
	switch (category) {
		case 'work':
			return 'Work'
		case 'personal':
			return 'Personal'
		case 'study':
			return 'Study'
		default:
			return 'Not found'
	}
}

const initialTasks: Task[] = [
	{
		id: 1,
		title: 'Review array methods',
		category: 'study',
		priority: 3,
		completed: false,
		estimateMinutes: 30,
	},
	{
		id: 2,
		title: 'Reply to emails',
		category: 'work',
		priority: 2,
		completed: true,
		estimateMinutes: 20,
	},
	{
		id: 3,
		title: 'Buy groceries',
		category: 'personal',
		priority: 2,
		completed: false,
		estimateMinutes: 45,
	},
	{
		id: 4,
		title: 'Practice React state',
		category: 'study',
		priority: 3,
		completed: false,
		estimateMinutes: 60,
	},
	{
		id: 5,
		title: 'Update project notes',
		category: 'work',
		priority: 1,
		completed: true,
		estimateMinutes: 15,
	},
	{
		id: 6,
		title: 'Go for a walk',
		category: 'personal',
		priority: 1,
		completed: false,
		estimateMinutes: 30,
	},
]

const filterStatusOptions = [
	{ label: 'All', id: 'all' },
	{ label: 'Active', id: 'active' },
	{ label: 'Completed', id: 'completed' },
	{ label: 'Study', id: 'study' }
]

export default function TaskManagerPage() {

	const [checked, setChecked] = React.useState<Task[]>(initialTasks)
	const [searchTerm, setSearchTerm] = React.useState('')
	const [filter, setFilter] = React.useState<string>('all')
	const [sortCriteria, setSortCriteria] = React.useState<string>('alphabet')

	const visibleTasks = checked.filter(task => {
		const matchesSearch = task.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
		let isCtaMatch = false

		switch (filter) {
			case 'all':
				isCtaMatch = true
				break
			case 'completed':
				isCtaMatch = task.completed === true
				break
			case 'active':
				isCtaMatch = task.completed === false
				break
			case 'study':
				isCtaMatch = task.category === 'study'
				break
		}
		return matchesSearch && isCtaMatch
	})

	const sortedTasks = [...visibleTasks].sort((a, b) => {
		switch (sortCriteria) {
			case 'alphabet':
				return a.title.localeCompare(b.title)
			case 'high-priority':
				if (a.priority < b.priority) return -1
				if (a.priority > b.priority) return 1
				return 0
			case 'short-eta':
				if (a.estimateMinutes < b.estimateMinutes) return -1
				if (a.estimateMinutes > b.estimateMinutes) return 1
				return 0
			case 'long-eta':
				if (a.estimateMinutes > b.estimateMinutes) return -1
				if (a.estimateMinutes < b.estimateMinutes) return 1
				return 0
			default:
				return 0
		}

	})

	const stats = checked.reduce<Stats>((acc, current) => {
		const newAcc = {
			taskCount: acc.taskCount + 1,
			completedCount: acc.completedCount + (current.completed ? 1 : 0),
			totalTime: acc.totalTime + current.estimateMinutes,
			remainingTime: acc.remainingTime + (current.completed ? 0 : current.estimateMinutes)
		}
		return newAcc
	}, { taskCount: 0, completedCount: 0, totalTime: 0, remainingTime: 0 })

	const onSelectToggle = (id: number) => {
		setChecked(prevChecked => {
			return prevChecked.map(task => {
				if (id === task.id) return { ...task, completed: !task.completed }
				return task
			})
		})
	}

	const onDelete = (idToDelete: number) => {
		setChecked(prevChecked => prevChecked.filter(task => task.id !== idToDelete))
	}

	return (
		<main>
			<div className='content'>
			<h1>Task manager</h1>
			<div>
				<section className='controls'>
					<div>
						<label htmlFor='search'>Search 🔎</label>
						<input
							id='search'
							type='text'
							placeholder='What are you looking for...'
							onChange={event => setSearchTerm(event.target.value)}
							value={searchTerm}
						/>
					</div>
					<fieldset id='status-filter'>
						{
							filterStatusOptions.map(option =>
								<div key={`status-filter-${option.id}`}>
									<input
										id={`status-filter-id-${option.id}`}
										type='radio'
										checked={filter === option.id}
										onChange={() => setFilter(option.id)}
									/>
									<label htmlFor={`status-filter-id-${option.id}`}>
										{option.label}
									</label>
								</div>
							)

						}
					</fieldset>
					<div>
						<label htmlFor='sorting'>List by</label>

						<select id='sorting'
							onChange={e => setSortCriteria(e.target.value)}
						>
							<option value="alphabet">A-Z</option>
							<option value="high-priority">Higest priority</option>
							<option value="short-eta">Shortest estimate</option>
							<option value="long-eta">Longest estimate</option>
						</select>
					</div>
				</section>
				<section className='stats'>
					<div>{`Found ${sortedTasks.length}`}</div>
					<div>{`Total tasks ${stats.taskCount}`}</div>
					<div>{`Completed tasks ${stats.completedCount}`}</div>
					<div>{`Total time ${stats.totalTime} min`}</div>
					<div>{`Remaining time ${stats.remainingTime} min`}</div>
				</section>
			</div>
			<section className='list'>
				<ul>
				{
					sortedTasks.length
						? sortedTasks.map(taskProps => <TaskItem
							key={taskProps.id}
							{...taskProps}
							onSelectToggle={onSelectToggle}
							onDelete={onDelete}
							category={GetCategoryUppercase(taskProps.category)}
						/>)
						: 'Nothing found'
				}
				</ul>
			</section>
			</div>
		</main>
	)
}
