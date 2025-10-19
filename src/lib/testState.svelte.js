let state = $state({
  profiles: {
    'Profile 1': { temperature: 100, pressure: 60, color: 'red' },
    'Profile 2': { temperature: 93, pressure: 56, color: 'green' },
    'Profile 3': { temperature: 85, pressure: 54, color: 'blue' },
    'Profile 4': { temperature: 102, pressure: 61, color: 'orange' }
  },
  settings: { temperatureUnit: 'F', pressureUnit: 'PSI' }
});

export function getState() {
  return state;
}
