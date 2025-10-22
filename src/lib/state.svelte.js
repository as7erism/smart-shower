let state = $state(undefined);

export function getState() {
  if (state === undefined) {
    state = JSON.parse(localStorage.getItem('state'));
    if (state === null) {
      saveState({
        currentProfile: '',
        profiles: {
          'Profile 1': {
            temperature: 100,
            pressure: 60,
            color: 'oklch(72.3% 0.219 149.579)'
          },
          'Profile 2': {
            temperature: 93,
            pressure: 56,
            color: 'oklch(63.7% 0.237 25.331)'
          },
          'Profile 3': {
            temperature: 97,
            pressure: 58,
            color: 'oklch(62.3% 0.214 259.815)'
          },
          'Profile 4': {
            temperature: 84,
            pressure: 49,
            color: 'oklch(70.5% 0.213 47.604)'
          }
        },
        settings: {
          temperatureUnit: 'F',
          pressureUnit: 'PSI'
        }
      });
    }
  }

  return state;
}

export function saveState(data) {
  state = data;
  localStorage.setItem('state', JSON.stringify(state));
}
