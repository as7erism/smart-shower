let state = $state(undefined);

export function getState() {
  if (state === undefined) {
    state = JSON.parse(localStorage.getItem('state'));
    if (state === null) {
      saveState({
        profiles: {
          'Profile 1': {
            temperature: 100,
            pressure: 60
          }
        },
        settings: {
          'temperatureUnit': 'F',
          'pressureUnit': 'PSI'
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
