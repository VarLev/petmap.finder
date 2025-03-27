import { useState } from 'react';
import Layout from './components/layout/layout';
import Form from './components/form/form';
import Map from './components/map';
import './App.css';

const App = () => {
  const [ pageType, setPageType ] = useState<'form' | 'map'>('form')

  return (
    <Layout pageType={pageType} setPageType={setPageType}>
      {pageType === 'form' ? (
        <Form />
      ) : (
        <Map />
      )}
    </Layout>
  )
}

export default App;