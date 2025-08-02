import { useState, useEffect } from 'react';

export default function App() {
  // State for different sections
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState({ temp: 22, condition: 'Sunny' });
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Check emails', completed: false },
    { id: 2, text: 'Team meeting at 2 PM', completed: false },
    { id: 3, text: 'Review project proposal', completed: true }
  ]);
  const [newTask, setNewTask] = useState('');
  const [notes, setNotes] = useState('Welcome to your personal dashboard!\n\nUse this space for quick notes and reminders.');
  const [habits, setHabits] = useState([
    { id: 1, name: 'Drink 8 glasses of water', completed: false },
    { id: 2, name: 'Exercise for 30 minutes', completed: true },
    { id: 3, name: 'Read for 20 minutes', completed: false },
    { id: 4, name: 'Meditate for 10 minutes', completed: false }
  ]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Task functions
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask,
        completed: false
      }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Habit functions
  const toggleHabit = (id) => {
    setHabits(habits.map(habit =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  // Helper functions
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const completedHabits = habits.filter(habit => habit.completed).length;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        
        {/* Header/Time Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          gridColumn: '1 / -1'
        }}>
          <h1 style={{ 
            margin: '0 0 10px 0', 
            color: '#333',
            fontSize: '2.5rem'
          }}>
            {getGreeting()}! 👋
          </h1>
          <div style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#667eea',
            margin: '20px 0'
          }}>
            {formatTime(currentTime)}
          </div>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            margin: '0'
          }}>
            {formatDate(currentTime)}
          </p>
        </div>

        {/* Weather Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ 
            margin: '0 0 20px 0', 
            color: '#333',
            fontSize: '1.5rem'
          }}>
            🌤️ Weather
          </h3>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '3rem',
              margin: '10px 0'
            }}>
              {weather.temp}°C
            </div>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              margin: '0'
            }}>
              {weather.condition}
            </p>
            <button
              onClick={() => setWeather({
                temp: Math.floor(Math.random() * 30) + 10,
                condition: ['Sunny', 'Cloudy', 'Rainy', 'Windy'][Math.floor(Math.random() * 4)]
              })}
              style={{
                marginTop: '15px',
                padding: '8px 16px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Quick Stats Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ 
            margin: '0 0 20px 0', 
            color: '#333',
            fontSize: '1.5rem'
          }}>
            📊 Today's Progress
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>Tasks Complete:</span>
              <span style={{
                background: '#22c55e',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                {completedTasks}/{tasks.length}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>Habits Done:</span>
              <span style={{
                background: '#3b82f6',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                {completedHabits}/{habits.length}
              </span>
            </div>
            <div style={{
              background: '#f0f9ff',
              padding: '15px',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '5px' }}>
                {completedTasks + completedHabits === tasks.length + habits.length ? '🎉' : '💪'}
              </div>
              <p style={{ margin: '0', color: '#0369a1', fontWeight: 'bold' }}>
                {completedTasks + completedHabits === tasks.length + habits.length 
                  ? 'Perfect Day!' 
                  : 'Keep Going!'}
              </p>
            </div>
          </div>
        </div>

        {/* Tasks Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ 
            margin: '0 0 20px 0', 
            color: '#333',
            fontSize: '1.5rem'
          }}>
            ✅ Tasks
          </h3>
          
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            marginBottom: '20px' 
          }}>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              style={{
                flex: '1',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <button
              onClick={addTask}
              style={{
                padding: '12px 20px',
                background: '#22c55e',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              Add
            </button>
          </div>

          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {tasks.map(task => (
              <div key={task.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px',
                background: task.completed ? '#f0fdf4' : '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                marginBottom: '8px'
              }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  style={{ transform: 'scale(1.2)' }}
                />
                <span style={{
                  flex: '1',
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? '#6b7280' : '#111827'
                }}>
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Habits Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ 
            margin: '0 0 20px 0', 
            color: '#333',
            fontSize: '1.5rem'
          }}>
            🎯 Daily Habits
          </h3>
          
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {habits.map(habit => (
              <div key={habit.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px',
                background: habit.completed ? '#eff6ff' : '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                marginBottom: '8px',
                cursor: 'pointer'
              }}
              onClick={() => toggleHabit(habit.id)}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: habit.completed ? '#3b82f6' : '#e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {habit.completed ? '✓' : ''}
                </div>
                <span style={{
                  flex: '1',
                  color: habit.completed ? '#1e40af' : '#111827',
                  fontWeight: habit.completed ? 'bold' : 'normal'
                }}>
                  {habit.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notes Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          gridColumn: 'span 2'
        }}>
          <h3 style={{ 
            margin: '0 0 20px 0', 
            color: '#333',
            fontSize: '1.5rem'
          }}>
            📝 Quick Notes
          </h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your notes here..."
            style={{
              width: '100%',
              height: '200px',
              padding: '15px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'Arial, sans-serif',
              resize: 'vertical'
            }}
          />
        </div>
      </div>
    </div>
  );
}