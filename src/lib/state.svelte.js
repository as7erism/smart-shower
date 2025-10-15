let state = $state(undefined);

export function getState() {
  if (state === undefined) {
    state = JSON.parse(localStorage.getItem('state'));
    if (state === null) {
      saveState({
        profiles: {
          Aster: {
            presets: {
              default: {
                temperature: 100,
                pressure: 60
              },
              cold: {
                temperature: 80,
                pressure: 60
              }
            }
          },
          Kaleb: {
            presets: {
              default: {
                temperature: 100,
                pressure: 60
              }
            }
          },
          Divyesh: {
            presets: {
              default: {
                temperature: 100,
                pressure: 60
              }
            }
          },
          Logan: {
            presets: {
              default: {
                temperature: 100,
                pressure: 60
              }
            }
          }
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

let account = $state(null);

export function getAccount() {
  return account;
}

export function setAccount(accountName) {
  account = accountName;
}
