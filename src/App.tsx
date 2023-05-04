import Buttons from './components/common/buttons/buttons';
import MyNavbar from './components/common/nav-bar/nav';

function App() {
  return (
    <div className="App">
      <MyNavbar/>
      <Buttons text='Click me '/>
      <Buttons text='Click me 1'/>
      <Buttons text='Click me 3'/>
    </div>
  );
}

export default App;
