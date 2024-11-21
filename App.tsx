import React from 'react';
import StackNavigation from './src/navigation';
import { Provider } from 'react-redux';
import { MyStore } from './src/redux/myStore';

function App(): React.JSX.Element {
  return (
    <Provider store={MyStore}>
      <StackNavigation />
    </Provider>
  );
}

export default App;
