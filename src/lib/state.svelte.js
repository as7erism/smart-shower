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
            color: 'green'
          },
          'Profile 2': {
            temperature: 93,
            pressure: 56,
            color: 'red'
          },
          'Profile 3': {
            temperature: 97,
            pressure: 58,
            color: 'blue'
          },
          'Profile 4': {
            temperature: 84,
            pressure: 49,
            color: 'orange'
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
