import styled from 'styled-components';
import Main from './Main';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import Chart from './Chart';

const Container = styled.div`
  margin : 0 auto;
  width: 60%;
  text-align: center;
  color: black;
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
`;

const Img = styled.img`
  display : flex;
  margin : 0 auto;
  width: 20%;
  text-align: center;
  opacity : 9;
  `;

function App() {
  return (
    <Router>
      <Switch>
        <Container>
         <Img src={'Logo.png'} alt="Logo"/>
         <Route path ="/"  exact component={Main}/>
         <Route path ="/:cityId" exact component={Chart}/> 
       </Container>
     </Switch>
    </Router>
  );
}

export default App;
